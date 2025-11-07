/**
 * Excel to SQL Generator for Student Accounts
 * 
 * This script reads an Excel file and generates SQL queries to create student accounts
 * 
 * Usage:
 * 1. Install dependencies: npm install xlsx
 * 2. Place your Excel file in the same directory
 * 3. Update the filename below
 * 4. Run: node scripts/excel-to-sql-generator.js
 * 5. Copy the generated SQL and run it in Supabase
 */

const fs = require('fs');
const path = require('path');

// Try to use xlsx library if available
let xlsx;
try {
  xlsx = require('xlsx');
} catch (e) {
  console.log('⚠️  xlsx library not found. Installing...');
  console.log('Run: npm install xlsx');
  console.log('Or upload your Excel file directly and I will process it for you.');
  process.exit(1);
}

// Configuration
const EXCEL_FILE = 'students.xlsx'; // Change this to your Excel filename
const OUTPUT_FILE = 'generated-students.sql';

// Read Excel file
function readExcelFile(filename) {
  try {
    const workbook = xlsx.readFile(filename);
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
  } catch (error) {
    console.error('Error reading Excel file:', error.message);
    console.log('Make sure the Excel file exists and is in the correct format.');
    process.exit(1);
  }
}

// Validate student data
function validateStudent(row, index) {
  const errors = [];
  
  if (!row.email || !row.email.trim()) {
    errors.push(`Row ${index + 1}: Email is required`);
  }
  
  if (!row.password || !row.password.trim()) {
    errors.push(`Row ${index + 1}: Password is required`);
  }
  
  if (!row.full_name || !row.full_name.trim()) {
    errors.push(`Row ${index + 1}: Full name is required`);
  }
  
  if (row.student_grade && !['starter', 'mid', 'higher'].includes(row.student_grade.toLowerCase())) {
    errors.push(`Row ${index + 1}: student_grade must be 'starter', 'mid', or 'higher'`);
  }
  
  return errors;
}

// Generate SQL for a single student
function generateStudentSQL(student, index) {
  const email = (student.email || '').trim();
  const password = (student.password || '').trim();
  const fullName = (student.full_name || '').trim();
  const phone = (student.phone_number || '').trim() || 'NULL';
  const grade = (student.student_grade || 'starter').toLowerCase();
  
  // Validate grade
  const validGrades = ['starter', 'mid', 'higher'];
  const finalGrade = validGrades.includes(grade) ? grade : 'starter';
  
  // Format phone number
  const phoneValue = phone !== 'NULL' ? `'${phone}'` : 'NULL';
  
  return `
-- Student ${index + 1}: ${fullName}
DO $$
DECLARE
  student_id UUID;
  student_email TEXT := '${email}';
  student_password TEXT := '${password}';
  student_name TEXT := '${fullName.replace(/'/g, "''")}';
  student_phone TEXT := ${phoneValue === 'NULL' ? 'NULL' : `'${phone}'`};
  student_grade TEXT := '${finalGrade}';
BEGIN
  -- Check if student exists
  IF EXISTS (SELECT 1 FROM public.users WHERE email = student_email) THEN
    RAISE NOTICE '⚠️  Student already exists: %', student_email;
    RETURN;
  END IF;
  
  student_id := gen_random_uuid();
  
  -- Create auth user (password encrypted with bcrypt)
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data, is_super_admin
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    student_id,
    'authenticated',
    'authenticated',
    student_email,
    crypt(student_password, gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', student_name, 'phone_number', student_phone),
    FALSE
  );
  
  -- Create user profile with grade
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    ${phoneValue === 'NULL' ? 'NULL' : phoneValue}
  );
  
  RAISE NOTICE '✅ Created: % / % / Grade: %', student_email, student_password, student_grade;
END $$;
`;
}

// Generate summary SQL
function generateSummarySQL(students) {
  const validStudents = students.filter(s => s.email && s.password && s.full_name);
  const gradeCounts = {
    starter: validStudents.filter(s => (s.student_grade || 'starter').toLowerCase() === 'starter').length,
    mid: validStudents.filter(s => (s.student_grade || 'starter').toLowerCase() === 'mid').length,
    higher: validStudents.filter(s => (s.student_grade || 'starter').toLowerCase() === 'higher').length,
  };
  
  return `
-- ============================================
-- SUMMARY: ${validStudents.length} students to be created
-- ============================================
-- Starter: ${gradeCounts.starter} students
-- Mid: ${gradeCounts.mid} students
-- Higher: ${gradeCounts.higher} students
-- ============================================

`;
}

// Main function
function main() {
  console.log('📊 Reading Excel file:', EXCEL_FILE);
  
  // Check if file exists
  if (!fs.existsSync(EXCEL_FILE)) {
    console.error(`❌ File not found: ${EXCEL_FILE}`);
    console.log('\nPlease:');
    console.log('1. Place your Excel file in the project root directory');
    console.log('2. Update EXCEL_FILE variable in this script');
    console.log('3. Or upload your Excel file directly in the conversation');
    process.exit(1);
  }
  
  // Read Excel file
  const students = readExcelFile(EXCEL_FILE);
  console.log(`✅ Read ${students.length} rows from Excel file\n`);
  
  // Validate all students
  const errors = [];
  students.forEach((student, index) => {
    const studentErrors = validateStudent(student, index);
    errors.push(...studentErrors);
  });
  
  if (errors.length > 0) {
    console.error('❌ Validation errors found:\n');
    errors.forEach(error => console.error(`  - ${error}`));
    console.log('\nPlease fix these errors and try again.');
    process.exit(1);
  }
  
  // Generate SQL
  console.log('📝 Generating SQL queries...\n');
  
  let sql = `-- ============================================
-- AUTO-GENERATED SQL FROM EXCEL FILE
-- File: ${EXCEL_FILE}
-- Generated: ${new Date().toISOString()}
-- Total Students: ${students.length}
-- ============================================
${generateSummarySQL(students)}
`;
  
  students.forEach((student, index) => {
    sql += generateStudentSQL(student, index);
  });
  
  // Add verification query
  sql += `
-- ============================================
-- VERIFY CREATED STUDENTS
-- ============================================

SELECT 
  email,
  full_name,
  student_grade,
  role,
  created_at
FROM public.users
WHERE role = 'student'
AND student_grade IS NOT NULL
ORDER BY 
  CASE student_grade
    WHEN 'starter' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'higher' THEN 3
  END,
  created_at DESC;
`;
  
  // Write to file
  fs.writeFileSync(OUTPUT_FILE, sql);
  console.log(`✅ SQL generated successfully!`);
  console.log(`📄 Output file: ${OUTPUT_FILE}`);
  console.log(`\n📋 Next steps:`);
  console.log(`1. Open ${OUTPUT_FILE}`);
  console.log(`2. Copy all the SQL queries`);
  console.log(`3. Paste into Supabase SQL Editor`);
  console.log(`4. Run the queries`);
  console.log(`5. All students will be created! 🎉\n`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main, generateStudentSQL, validateStudent };



 * Excel to SQL Generator for Student Accounts
 * 
 * This script reads an Excel file and generates SQL queries to create student accounts
 * 
 * Usage:
 * 1. Install dependencies: npm install xlsx
 * 2. Place your Excel file in the same directory
 * 3. Update the filename below
 * 4. Run: node scripts/excel-to-sql-generator.js
 * 5. Copy the generated SQL and run it in Supabase
 */

const fs = require('fs');
const path = require('path');

// Try to use xlsx library if available
let xlsx;
try {
  xlsx = require('xlsx');
} catch (e) {
  console.log('⚠️  xlsx library not found. Installing...');
  console.log('Run: npm install xlsx');
  console.log('Or upload your Excel file directly and I will process it for you.');
  process.exit(1);
}

// Configuration
const EXCEL_FILE = 'students.xlsx'; // Change this to your Excel filename
const OUTPUT_FILE = 'generated-students.sql';

// Read Excel file
function readExcelFile(filename) {
  try {
    const workbook = xlsx.readFile(filename);
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
  } catch (error) {
    console.error('Error reading Excel file:', error.message);
    console.log('Make sure the Excel file exists and is in the correct format.');
    process.exit(1);
  }
}

// Validate student data
function validateStudent(row, index) {
  const errors = [];
  
  if (!row.email || !row.email.trim()) {
    errors.push(`Row ${index + 1}: Email is required`);
  }
  
  if (!row.password || !row.password.trim()) {
    errors.push(`Row ${index + 1}: Password is required`);
  }
  
  if (!row.full_name || !row.full_name.trim()) {
    errors.push(`Row ${index + 1}: Full name is required`);
  }
  
  if (row.student_grade && !['starter', 'mid', 'higher'].includes(row.student_grade.toLowerCase())) {
    errors.push(`Row ${index + 1}: student_grade must be 'starter', 'mid', or 'higher'`);
  }
  
  return errors;
}

// Generate SQL for a single student
function generateStudentSQL(student, index) {
  const email = (student.email || '').trim();
  const password = (student.password || '').trim();
  const fullName = (student.full_name || '').trim();
  const phone = (student.phone_number || '').trim() || 'NULL';
  const grade = (student.student_grade || 'starter').toLowerCase();
  
  // Validate grade
  const validGrades = ['starter', 'mid', 'higher'];
  const finalGrade = validGrades.includes(grade) ? grade : 'starter';
  
  // Format phone number
  const phoneValue = phone !== 'NULL' ? `'${phone}'` : 'NULL';
  
  return `
-- Student ${index + 1}: ${fullName}
DO $$
DECLARE
  student_id UUID;
  student_email TEXT := '${email}';
  student_password TEXT := '${password}';
  student_name TEXT := '${fullName.replace(/'/g, "''")}';
  student_phone TEXT := ${phoneValue === 'NULL' ? 'NULL' : `'${phone}'`};
  student_grade TEXT := '${finalGrade}';
BEGIN
  -- Check if student exists
  IF EXISTS (SELECT 1 FROM public.users WHERE email = student_email) THEN
    RAISE NOTICE '⚠️  Student already exists: %', student_email;
    RETURN;
  END IF;
  
  student_id := gen_random_uuid();
  
  -- Create auth user (password encrypted with bcrypt)
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data, is_super_admin
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    student_id,
    'authenticated',
    'authenticated',
    student_email,
    crypt(student_password, gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', student_name, 'phone_number', student_phone),
    FALSE
  );
  
  -- Create user profile with grade
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    ${phoneValue === 'NULL' ? 'NULL' : phoneValue}
  );
  
  RAISE NOTICE '✅ Created: % / % / Grade: %', student_email, student_password, student_grade;
END $$;
`;
}

// Generate summary SQL
function generateSummarySQL(students) {
  const validStudents = students.filter(s => s.email && s.password && s.full_name);
  const gradeCounts = {
    starter: validStudents.filter(s => (s.student_grade || 'starter').toLowerCase() === 'starter').length,
    mid: validStudents.filter(s => (s.student_grade || 'starter').toLowerCase() === 'mid').length,
    higher: validStudents.filter(s => (s.student_grade || 'starter').toLowerCase() === 'higher').length,
  };
  
  return `
-- ============================================
-- SUMMARY: ${validStudents.length} students to be created
-- ============================================
-- Starter: ${gradeCounts.starter} students
-- Mid: ${gradeCounts.mid} students
-- Higher: ${gradeCounts.higher} students
-- ============================================

`;
}

// Main function
function main() {
  console.log('📊 Reading Excel file:', EXCEL_FILE);
  
  // Check if file exists
  if (!fs.existsSync(EXCEL_FILE)) {
    console.error(`❌ File not found: ${EXCEL_FILE}`);
    console.log('\nPlease:');
    console.log('1. Place your Excel file in the project root directory');
    console.log('2. Update EXCEL_FILE variable in this script');
    console.log('3. Or upload your Excel file directly in the conversation');
    process.exit(1);
  }
  
  // Read Excel file
  const students = readExcelFile(EXCEL_FILE);
  console.log(`✅ Read ${students.length} rows from Excel file\n`);
  
  // Validate all students
  const errors = [];
  students.forEach((student, index) => {
    const studentErrors = validateStudent(student, index);
    errors.push(...studentErrors);
  });
  
  if (errors.length > 0) {
    console.error('❌ Validation errors found:\n');
    errors.forEach(error => console.error(`  - ${error}`));
    console.log('\nPlease fix these errors and try again.');
    process.exit(1);
  }
  
  // Generate SQL
  console.log('📝 Generating SQL queries...\n');
  
  let sql = `-- ============================================
-- AUTO-GENERATED SQL FROM EXCEL FILE
-- File: ${EXCEL_FILE}
-- Generated: ${new Date().toISOString()}
-- Total Students: ${students.length}
-- ============================================
${generateSummarySQL(students)}
`;
  
  students.forEach((student, index) => {
    sql += generateStudentSQL(student, index);
  });
  
  // Add verification query
  sql += `
-- ============================================
-- VERIFY CREATED STUDENTS
-- ============================================

SELECT 
  email,
  full_name,
  student_grade,
  role,
  created_at
FROM public.users
WHERE role = 'student'
AND student_grade IS NOT NULL
ORDER BY 
  CASE student_grade
    WHEN 'starter' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'higher' THEN 3
  END,
  created_at DESC;
`;
  
  // Write to file
  fs.writeFileSync(OUTPUT_FILE, sql);
  console.log(`✅ SQL generated successfully!`);
  console.log(`📄 Output file: ${OUTPUT_FILE}`);
  console.log(`\n📋 Next steps:`);
  console.log(`1. Open ${OUTPUT_FILE}`);
  console.log(`2. Copy all the SQL queries`);
  console.log(`3. Paste into Supabase SQL Editor`);
  console.log(`4. Run the queries`);
  console.log(`5. All students will be created! 🎉\n`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main, generateStudentSQL, validateStudent };





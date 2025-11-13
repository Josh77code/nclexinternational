-- ============================================
-- STUDENT GRADE MANAGEMENT SCRIPT
-- ============================================
-- IMPORTANT: Run ONE query at a time, not the entire script!
-- Copy and paste individual queries into Supabase SQL editor
-- ============================================

-- ============================================
-- ADD NEW STUDENT TO A CATEGORY
-- ============================================

-- Method 1: Add student to Starter (Beginner) category
-- Replace 'student-email@example.com' with the actual student email
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Method 2: Add student to Mid (Intermediate) category
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Method 3: Add student to Higher (Advanced) category
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Method 4: Add student by user ID (if you know the UUID)
UPDATE users 
SET student_grade = 'starter'  -- Change to 'mid' or 'higher' as needed
WHERE id = 'student-uuid-here' 
AND role = 'student';

-- ============================================
-- PROMOTE STUDENTS TO HIGHER GRADES
-- ============================================

-- Promote student from Starter to Mid
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'student-email@example.com'
AND role = 'student';

-- Promote student from Mid to Higher
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'mid' 
AND email = 'student-email@example.com'
AND role = 'student';

-- Promote student from Starter directly to Higher (skip Mid)
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'starter' 
AND email = 'student-email@example.com'
AND role = 'student';

-- ============================================
-- BULK OPERATIONS
-- ============================================

-- Add multiple students to Starter category (by email list)
UPDATE users 
SET student_grade = 'starter' 
WHERE email IN (
  'student1@example.com',
  'student2@example.com',
  'student3@example.com'
) 
AND role = 'student';

-- Add all students without a grade to Starter category
UPDATE users 
SET student_grade = 'starter' 
WHERE student_grade IS NULL 
AND role = 'student';

-- Promote all Starter students to Mid
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND role = 'student';

-- Promote all Mid students to Higher
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'mid' 
AND role = 'student';

-- ============================================
-- VIEW STUDENTS BY CATEGORY
-- ============================================

-- View all Starter students
SELECT 
  id,
  email,
  full_name,
  student_grade,
  created_at
FROM users 
WHERE student_grade = 'starter' 
AND role = 'student'
ORDER BY created_at DESC;

-- View all Mid students
SELECT 
  id,
  email,
  full_name,
  student_grade,
  created_at
FROM users 
WHERE student_grade = 'mid' 
AND role = 'student'
ORDER BY created_at DESC;

-- View all Higher students
SELECT 
  id,
  email,
  full_name,
  student_grade,
  created_at
FROM users 
WHERE student_grade = 'higher' 
AND role = 'student'
ORDER BY created_at DESC;

-- View all students without a grade assigned
SELECT 
  id,
  email,
  full_name,
  student_grade,
  created_at
FROM users 
WHERE student_grade IS NULL 
AND role = 'student'
ORDER BY created_at DESC;

-- View all students with their grades (summary)
SELECT 
  COALESCE(student_grade, 'Not Assigned') as grade,
  COUNT(*) as student_count
FROM users 
WHERE role = 'student'
GROUP BY student_grade
ORDER BY 
  CASE student_grade
    WHEN 'starter' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'higher' THEN 3
    ELSE 4
  END;

-- ============================================
-- CHANGE STUDENT'S GRADE
-- ============================================

-- Change student's grade from any grade to Starter
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Change student's grade from any grade to Mid
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Change student's grade from any grade to Higher
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- ============================================
-- REMOVE GRADE FROM STUDENT (Reset)
-- ============================================

-- Remove grade assignment (student will see all courses/questions)
UPDATE users 
SET student_grade = NULL 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- ============================================
-- USEFUL QUERIES FOR MANAGEMENT
-- ============================================

-- Count students in each category
SELECT 
  'Starter' as category,
  COUNT(*) as count
FROM users 
WHERE student_grade = 'starter' AND role = 'student'
UNION ALL
SELECT 
  'Mid' as category,
  COUNT(*) as count
FROM users 
WHERE student_grade = 'mid' AND role = 'student'
UNION ALL
SELECT 
  'Higher' as category,
  COUNT(*) as count
FROM users 
WHERE student_grade = 'higher' AND role = 'student'
UNION ALL
SELECT 
  'Not Assigned' as category,
  COUNT(*) as count
FROM users 
WHERE student_grade IS NULL AND role = 'student';

-- View student with their grade display name
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.student_grade,
  get_student_grade_display(u.student_grade) as grade_display,
  u.created_at
FROM users u
WHERE u.role = 'student'
ORDER BY 
  CASE u.student_grade
    WHEN 'starter' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'higher' THEN 3
    ELSE 4
  END,
  u.created_at DESC;



-- STUDENT GRADE MANAGEMENT SCRIPT
-- ============================================
-- IMPORTANT: Run ONE query at a time, not the entire script!
-- Copy and paste individual queries into Supabase SQL editor
-- ============================================

-- ============================================
-- ADD NEW STUDENT TO A CATEGORY
-- ============================================

-- Method 1: Add student to Starter (Beginner) category
-- Replace 'student-email@example.com' with the actual student email
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Method 2: Add student to Mid (Intermediate) category
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Method 3: Add student to Higher (Advanced) category
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Method 4: Add student by user ID (if you know the UUID)
UPDATE users 
SET student_grade = 'starter'  -- Change to 'mid' or 'higher' as needed
WHERE id = 'student-uuid-here' 
AND role = 'student';

-- ============================================
-- PROMOTE STUDENTS TO HIGHER GRADES
-- ============================================

-- Promote student from Starter to Mid
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'student-email@example.com'
AND role = 'student';

-- Promote student from Mid to Higher
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'mid' 
AND email = 'student-email@example.com'
AND role = 'student';

-- Promote student from Starter directly to Higher (skip Mid)
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'starter' 
AND email = 'student-email@example.com'
AND role = 'student';

-- ============================================
-- BULK OPERATIONS
-- ============================================

-- Add multiple students to Starter category (by email list)
UPDATE users 
SET student_grade = 'starter' 
WHERE email IN (
  'student1@example.com',
  'student2@example.com',
  'student3@example.com'
) 
AND role = 'student';

-- Add all students without a grade to Starter category
UPDATE users 
SET student_grade = 'starter' 
WHERE student_grade IS NULL 
AND role = 'student';

-- Promote all Starter students to Mid
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND role = 'student';

-- Promote all Mid students to Higher
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'mid' 
AND role = 'student';

-- ============================================
-- VIEW STUDENTS BY CATEGORY
-- ============================================

-- View all Starter students
SELECT 
  id,
  email,
  full_name,
  student_grade,
  created_at
FROM users 
WHERE student_grade = 'starter' 
AND role = 'student'
ORDER BY created_at DESC;

-- View all Mid students
SELECT 
  id,
  email,
  full_name,
  student_grade,
  created_at
FROM users 
WHERE student_grade = 'mid' 
AND role = 'student'
ORDER BY created_at DESC;

-- View all Higher students
SELECT 
  id,
  email,
  full_name,
  student_grade,
  created_at
FROM users 
WHERE student_grade = 'higher' 
AND role = 'student'
ORDER BY created_at DESC;

-- View all students without a grade assigned
SELECT 
  id,
  email,
  full_name,
  student_grade,
  created_at
FROM users 
WHERE student_grade IS NULL 
AND role = 'student'
ORDER BY created_at DESC;

-- View all students with their grades (summary)
SELECT 
  COALESCE(student_grade, 'Not Assigned') as grade,
  COUNT(*) as student_count
FROM users 
WHERE role = 'student'
GROUP BY student_grade
ORDER BY 
  CASE student_grade
    WHEN 'starter' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'higher' THEN 3
    ELSE 4
  END;

-- ============================================
-- CHANGE STUDENT'S GRADE
-- ============================================

-- Change student's grade from any grade to Starter
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Change student's grade from any grade to Mid
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- Change student's grade from any grade to Higher
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- ============================================
-- REMOVE GRADE FROM STUDENT (Reset)
-- ============================================

-- Remove grade assignment (student will see all courses/questions)
UPDATE users 
SET student_grade = NULL 
WHERE email = 'student-email@example.com' 
AND role = 'student';

-- ============================================
-- USEFUL QUERIES FOR MANAGEMENT
-- ============================================

-- Count students in each category
SELECT 
  'Starter' as category,
  COUNT(*) as count
FROM users 
WHERE student_grade = 'starter' AND role = 'student'
UNION ALL
SELECT 
  'Mid' as category,
  COUNT(*) as count
FROM users 
WHERE student_grade = 'mid' AND role = 'student'
UNION ALL
SELECT 
  'Higher' as category,
  COUNT(*) as count
FROM users 
WHERE student_grade = 'higher' AND role = 'student'
UNION ALL
SELECT 
  'Not Assigned' as category,
  COUNT(*) as count
FROM users 
WHERE student_grade IS NULL AND role = 'student';

-- View student with their grade display name
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.student_grade,
  get_student_grade_display(u.student_grade) as grade_display,
  u.created_at
FROM users u
WHERE u.role = 'student'
ORDER BY 
  CASE u.student_grade
    WHEN 'starter' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'higher' THEN 3
    ELSE 4
  END,
  u.created_at DESC;































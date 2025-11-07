# What to Do Next - Student Grade System Setup

## ✅ Step 1: Verify Migration Was Successful

First, verify that the migration ran successfully:

```sql
-- Check if columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('users', 'courses', 'exam_questions') 
AND column_name = 'student_grade';

-- Check if policies were created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('courses', 'exam_questions');

-- Check if function was created
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name = 'get_student_grade_display';
```

**Expected Results:**
- ✅ 3 rows showing `student_grade` column in all 3 tables
- ✅ 2 policies showing (one for courses, one for questions)
- ✅ 1 function showing `get_student_grade_display`

---

## 📝 Step 2: Assign Students to Grade Categories

Now assign your existing students to grade categories:

### Option A: Assign Single Student

```sql
-- Add student to Starter category
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### Option B: Assign Multiple Students

```sql
-- Add multiple students to Starter
UPDATE users 
SET student_grade = 'starter' 
WHERE email IN (
  'student1@example.com',
  'student2@example.com',
  'student3@example.com'
) 
AND role = 'student';
```

### Option C: Assign All Students Without Grade

```sql
-- Assign all students without grade to Starter
UPDATE users 
SET student_grade = 'starter' 
WHERE student_grade IS NULL 
AND role = 'student';
```

### View Students by Category

```sql
-- View all students and their grades
SELECT 
  email,
  full_name,
  COALESCE(student_grade, 'Not Assigned') as grade,
  role
FROM users 
WHERE role = 'student'
ORDER BY 
  CASE student_grade
    WHEN 'starter' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'higher' THEN 3
    ELSE 4
  END,
  created_at DESC;
```

---

## 🎓 Step 3: Create Courses with Grade Tags

When creating courses, assign them to specific grade levels:

### Using Instructor Dashboard

1. Go to `/dashboard/instructor/create-course`
2. Fill in course details
3. **Select "Student Grade"** from dropdown (required):
   - Starter (Beginner)
   - Mid (Intermediate)
   - Higher (Advanced)
4. Add course materials
5. Publish course

### Using SQL (Manual)

```sql
-- Create course for Starter students
INSERT INTO courses (
  title,
  description,
  instructor_id,
  student_grade,  -- Set grade here
  status,
  category
) VALUES (
  'NCLEX Basics for Beginners',
  'Introduction to NCLEX fundamentals',
  'instructor-uuid-here',
  'starter',  -- Grade level
  'active',
  'NCLEX-RN'
);

-- Create course for Mid students
INSERT INTO courses (
  title,
  description,
  instructor_id,
  student_grade,
  status,
  category
) VALUES (
  'Intermediate NCLEX Practice',
  'Intermediate level practice questions',
  'instructor-uuid-here',
  'mid',  -- Grade level
  'active',
  'NCLEX-RN'
);

-- Create course for Higher students
INSERT INTO courses (
  title,
  description,
  instructor_id,
  student_grade,
  status,
  category
) VALUES (
  'Advanced NCLEX Mastery',
  'Advanced level comprehensive review',
  'instructor-uuid-here',
  'higher',  -- Grade level
  'active',
  'NCLEX-RN'
);
```

---

## ❓ Step 4: Upload Questions with Grade Tags

When uploading questions, assign them to specific grade levels:

### Using Instructor Dashboard

1. Go to `/dashboard/instructor/upload-questions`
2. **Select "Student Grade"** from dropdown (required):
   - Starter (Beginner)
   - Mid (Intermediate)
   - Higher (Advanced)
3. Select course (optional)
4. Upload CSV file
5. Click "Upload CSV"

### Using SQL (Manual)

```sql
-- Insert questions for Starter students
INSERT INTO exam_questions (
  question_text,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_answer,
  explanation,
  category,
  difficulty_level,
  student_grade,  -- Set grade here
  is_active,
  course_id
) VALUES (
  'What is the first step in patient assessment?',
  'A. Take vital signs',
  'B. Introduce yourself',
  'C. Check medical history',
  'D. Administer medication',
  'B',
  'Proper introduction establishes trust and rapport.',
  'Fundamentals',
  'easy',
  'starter',  -- Grade level
  true,
  'course-uuid-here'
);
```

---

## 🧪 Step 5: Test the System

### Test 1: Login as Student

1. Login as a student with a grade assigned
2. Go to dashboard
3. **Verify:**
   - ✅ Grade badge shows on dashboard
   - ✅ Grade shows in header dropdown
   - ✅ Only courses for their grade are visible
   - ✅ Only questions for their grade are visible

### Test 2: Check Course Filtering

```sql
-- Check what courses a Starter student can see
SELECT 
  c.title,
  c.student_grade,
  c.status
FROM courses c
WHERE c.status = 'active'
AND (
  c.student_grade IS NULL 
  OR c.student_grade = 'starter'
);

-- Check what courses a Mid student can see
SELECT 
  c.title,
  c.student_grade,
  c.status
FROM courses c
WHERE c.status = 'active'
AND (
  c.student_grade IS NULL 
  OR c.student_grade = 'mid'
);
```

### Test 3: Check Question Filtering

```sql
-- Check what questions a Starter student can see
SELECT 
  COUNT(*) as question_count,
  student_grade
FROM exam_questions
WHERE is_active = true
AND (
  student_grade IS NULL 
  OR student_grade = 'starter'
)
GROUP BY student_grade;
```

---

## 📋 Step 6: Create New Students (Optional)

If you need to create new students with grades:

### Use the Quick Script

1. Open `scripts/QUICK_CREATE_STUDENT.sql`
2. Modify the values:
   - Email
   - Password
   - Name
   - Grade ('starter', 'mid', or 'higher')
3. Run the script
4. Give credentials to student

### Example:

```sql
DO $$
DECLARE
  student_id UUID;
  existing_user_id UUID;
  student_email TEXT := 'newstudent@example.com';
  student_password TEXT := 'Password123!';
  student_name TEXT := 'New Student';
  student_phone TEXT := '+1234567890';
  student_grade TEXT := 'starter';  -- Set grade here
BEGIN
  -- Check if exists first
  SELECT id INTO existing_user_id
  FROM public.users
  WHERE email = student_email;
  
  IF existing_user_id IS NOT NULL THEN
    -- Update existing student
    UPDATE public.users
    SET student_grade = student_grade
    WHERE id = existing_user_id;
    RAISE NOTICE 'Student updated!';
    RETURN;
  END IF;
  
  -- Create new student
  student_id := gen_random_uuid();
  
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
  
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (student_id, student_email, student_name, 'student', student_grade, student_phone);
  
  RAISE NOTICE 'Student created! Email: %, Password: %, Grade: %', student_email, student_password, student_grade;
END $$;
```

---

## ✅ Checklist: System Setup Complete

- [ ] Migration script ran successfully
- [ ] Columns added to users, courses, exam_questions tables
- [ ] Policies created and working
- [ ] Students assigned to grade categories
- [ ] Courses created with grade tags
- [ ] Questions uploaded with grade tags
- [ ] Tested student login and dashboard
- [ ] Verified grade filtering works
- [ ] Grade badge shows on dashboard
- [ ] Students see only their grade's content

---

## 🎯 Quick Reference

### Assign Student to Grade
```sql
UPDATE users 
SET student_grade = 'starter'  -- or 'mid', or 'higher'
WHERE email = 'student@example.com';
```

### Create Course with Grade
- Use instructor dashboard → Select grade when creating
- Or use SQL: `INSERT INTO courses (..., student_grade, ...)`

### Upload Questions with Grade
- Use instructor dashboard → Select grade when uploading
- Or use SQL: `INSERT INTO exam_questions (..., student_grade, ...)`

### View Students by Grade
```sql
SELECT email, full_name, student_grade 
FROM users 
WHERE role = 'student' 
ORDER BY student_grade;
```

---

## 🚀 Next Steps Summary

1. ✅ **Migration Done** - System is set up
2. 📝 **Assign Students** - Give students grade categories
3. 🎓 **Create Courses** - Tag courses with grades
4. ❓ **Upload Questions** - Tag questions with grades
5. 🧪 **Test** - Login as student and verify filtering works
6. 🎉 **Done!** - System is fully operational

---

## 📚 Documentation Files

- `HOW_TO_ADD_STUDENTS_TO_CATEGORIES.md` - How to assign students
- `HOW_STUDENTS_LOGIN.md` - How students login
- `STEP_BY_STEP_DATABASE_IMPLEMENTATION.md` - Database setup guide
- `QUICK_REFERENCE_CARD.md` - Quick reference queries

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting guides
2. Verify columns and policies exist (use Step 1 queries)
3. Make sure students have grades assigned
4. Ensure courses/questions have grade tags

**The system is ready to use!** 🎉




## ✅ Step 1: Verify Migration Was Successful

First, verify that the migration ran successfully:

```sql
-- Check if columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('users', 'courses', 'exam_questions') 
AND column_name = 'student_grade';

-- Check if policies were created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('courses', 'exam_questions');

-- Check if function was created
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name = 'get_student_grade_display';
```

**Expected Results:**
- ✅ 3 rows showing `student_grade` column in all 3 tables
- ✅ 2 policies showing (one for courses, one for questions)
- ✅ 1 function showing `get_student_grade_display`

---

## 📝 Step 2: Assign Students to Grade Categories

Now assign your existing students to grade categories:

### Option A: Assign Single Student

```sql
-- Add student to Starter category
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### Option B: Assign Multiple Students

```sql
-- Add multiple students to Starter
UPDATE users 
SET student_grade = 'starter' 
WHERE email IN (
  'student1@example.com',
  'student2@example.com',
  'student3@example.com'
) 
AND role = 'student';
```

### Option C: Assign All Students Without Grade

```sql
-- Assign all students without grade to Starter
UPDATE users 
SET student_grade = 'starter' 
WHERE student_grade IS NULL 
AND role = 'student';
```

### View Students by Category

```sql
-- View all students and their grades
SELECT 
  email,
  full_name,
  COALESCE(student_grade, 'Not Assigned') as grade,
  role
FROM users 
WHERE role = 'student'
ORDER BY 
  CASE student_grade
    WHEN 'starter' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'higher' THEN 3
    ELSE 4
  END,
  created_at DESC;
```

---

## 🎓 Step 3: Create Courses with Grade Tags

When creating courses, assign them to specific grade levels:

### Using Instructor Dashboard

1. Go to `/dashboard/instructor/create-course`
2. Fill in course details
3. **Select "Student Grade"** from dropdown (required):
   - Starter (Beginner)
   - Mid (Intermediate)
   - Higher (Advanced)
4. Add course materials
5. Publish course

### Using SQL (Manual)

```sql
-- Create course for Starter students
INSERT INTO courses (
  title,
  description,
  instructor_id,
  student_grade,  -- Set grade here
  status,
  category
) VALUES (
  'NCLEX Basics for Beginners',
  'Introduction to NCLEX fundamentals',
  'instructor-uuid-here',
  'starter',  -- Grade level
  'active',
  'NCLEX-RN'
);

-- Create course for Mid students
INSERT INTO courses (
  title,
  description,
  instructor_id,
  student_grade,
  status,
  category
) VALUES (
  'Intermediate NCLEX Practice',
  'Intermediate level practice questions',
  'instructor-uuid-here',
  'mid',  -- Grade level
  'active',
  'NCLEX-RN'
);

-- Create course for Higher students
INSERT INTO courses (
  title,
  description,
  instructor_id,
  student_grade,
  status,
  category
) VALUES (
  'Advanced NCLEX Mastery',
  'Advanced level comprehensive review',
  'instructor-uuid-here',
  'higher',  -- Grade level
  'active',
  'NCLEX-RN'
);
```

---

## ❓ Step 4: Upload Questions with Grade Tags

When uploading questions, assign them to specific grade levels:

### Using Instructor Dashboard

1. Go to `/dashboard/instructor/upload-questions`
2. **Select "Student Grade"** from dropdown (required):
   - Starter (Beginner)
   - Mid (Intermediate)
   - Higher (Advanced)
3. Select course (optional)
4. Upload CSV file
5. Click "Upload CSV"

### Using SQL (Manual)

```sql
-- Insert questions for Starter students
INSERT INTO exam_questions (
  question_text,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_answer,
  explanation,
  category,
  difficulty_level,
  student_grade,  -- Set grade here
  is_active,
  course_id
) VALUES (
  'What is the first step in patient assessment?',
  'A. Take vital signs',
  'B. Introduce yourself',
  'C. Check medical history',
  'D. Administer medication',
  'B',
  'Proper introduction establishes trust and rapport.',
  'Fundamentals',
  'easy',
  'starter',  -- Grade level
  true,
  'course-uuid-here'
);
```

---

## 🧪 Step 5: Test the System

### Test 1: Login as Student

1. Login as a student with a grade assigned
2. Go to dashboard
3. **Verify:**
   - ✅ Grade badge shows on dashboard
   - ✅ Grade shows in header dropdown
   - ✅ Only courses for their grade are visible
   - ✅ Only questions for their grade are visible

### Test 2: Check Course Filtering

```sql
-- Check what courses a Starter student can see
SELECT 
  c.title,
  c.student_grade,
  c.status
FROM courses c
WHERE c.status = 'active'
AND (
  c.student_grade IS NULL 
  OR c.student_grade = 'starter'
);

-- Check what courses a Mid student can see
SELECT 
  c.title,
  c.student_grade,
  c.status
FROM courses c
WHERE c.status = 'active'
AND (
  c.student_grade IS NULL 
  OR c.student_grade = 'mid'
);
```

### Test 3: Check Question Filtering

```sql
-- Check what questions a Starter student can see
SELECT 
  COUNT(*) as question_count,
  student_grade
FROM exam_questions
WHERE is_active = true
AND (
  student_grade IS NULL 
  OR student_grade = 'starter'
)
GROUP BY student_grade;
```

---

## 📋 Step 6: Create New Students (Optional)

If you need to create new students with grades:

### Use the Quick Script

1. Open `scripts/QUICK_CREATE_STUDENT.sql`
2. Modify the values:
   - Email
   - Password
   - Name
   - Grade ('starter', 'mid', or 'higher')
3. Run the script
4. Give credentials to student

### Example:

```sql
DO $$
DECLARE
  student_id UUID;
  existing_user_id UUID;
  student_email TEXT := 'newstudent@example.com';
  student_password TEXT := 'Password123!';
  student_name TEXT := 'New Student';
  student_phone TEXT := '+1234567890';
  student_grade TEXT := 'starter';  -- Set grade here
BEGIN
  -- Check if exists first
  SELECT id INTO existing_user_id
  FROM public.users
  WHERE email = student_email;
  
  IF existing_user_id IS NOT NULL THEN
    -- Update existing student
    UPDATE public.users
    SET student_grade = student_grade
    WHERE id = existing_user_id;
    RAISE NOTICE 'Student updated!';
    RETURN;
  END IF;
  
  -- Create new student
  student_id := gen_random_uuid();
  
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
  
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (student_id, student_email, student_name, 'student', student_grade, student_phone);
  
  RAISE NOTICE 'Student created! Email: %, Password: %, Grade: %', student_email, student_password, student_grade;
END $$;
```

---

## ✅ Checklist: System Setup Complete

- [ ] Migration script ran successfully
- [ ] Columns added to users, courses, exam_questions tables
- [ ] Policies created and working
- [ ] Students assigned to grade categories
- [ ] Courses created with grade tags
- [ ] Questions uploaded with grade tags
- [ ] Tested student login and dashboard
- [ ] Verified grade filtering works
- [ ] Grade badge shows on dashboard
- [ ] Students see only their grade's content

---

## 🎯 Quick Reference

### Assign Student to Grade
```sql
UPDATE users 
SET student_grade = 'starter'  -- or 'mid', or 'higher'
WHERE email = 'student@example.com';
```

### Create Course with Grade
- Use instructor dashboard → Select grade when creating
- Or use SQL: `INSERT INTO courses (..., student_grade, ...)`

### Upload Questions with Grade
- Use instructor dashboard → Select grade when uploading
- Or use SQL: `INSERT INTO exam_questions (..., student_grade, ...)`

### View Students by Grade
```sql
SELECT email, full_name, student_grade 
FROM users 
WHERE role = 'student' 
ORDER BY student_grade;
```

---

## 🚀 Next Steps Summary

1. ✅ **Migration Done** - System is set up
2. 📝 **Assign Students** - Give students grade categories
3. 🎓 **Create Courses** - Tag courses with grades
4. ❓ **Upload Questions** - Tag questions with grades
5. 🧪 **Test** - Login as student and verify filtering works
6. 🎉 **Done!** - System is fully operational

---

## 📚 Documentation Files

- `HOW_TO_ADD_STUDENTS_TO_CATEGORIES.md` - How to assign students
- `HOW_STUDENTS_LOGIN.md` - How students login
- `STEP_BY_STEP_DATABASE_IMPLEMENTATION.md` - Database setup guide
- `QUICK_REFERENCE_CARD.md` - Quick reference queries

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting guides
2. Verify columns and policies exist (use Step 1 queries)
3. Make sure students have grades assigned
4. Ensure courses/questions have grade tags

**The system is ready to use!** 🎉





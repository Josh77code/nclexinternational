-- ============================================
-- UPDATE EXISTING STUDENT GRADE
-- ============================================
-- Use this if student already exists and you just want to update their grade
-- ============================================

-- Method 1: Update student grade by email
UPDATE public.users
SET student_grade = 'starter'  -- Change to 'starter', 'mid', or 'higher'
WHERE email = 'student@example.com'  -- Change to actual email
AND role = 'student';

-- Method 2: Update student grade and other info
UPDATE public.users
SET student_grade = 'starter',
    full_name = 'Updated Name',
    phone_number = '+1234567890',
    updated_at = NOW()
WHERE email = 'student@example.com'  -- Change to actual email
AND role = 'student';

-- Method 3: Check if student exists first, then update
DO $$
DECLARE
  student_email TEXT := 'student@example.com';  -- Change this
  student_grade TEXT := 'starter';              -- Change this
  existing_user_id UUID;
BEGIN
  -- Check if student exists
  SELECT id INTO existing_user_id
  FROM public.users
  WHERE email = student_email
  AND role = 'student';
  
  IF existing_user_id IS NULL THEN
    RAISE NOTICE '❌ Student not found with email: %', student_email;
    RAISE NOTICE 'Please create the student first using QUICK_CREATE_STUDENT.sql';
    RETURN;
  END IF;
  
  -- Update student grade
  UPDATE public.users
  SET student_grade = student_grade,
      updated_at = NOW()
  WHERE id = existing_user_id;
  
  RAISE NOTICE '✅ Student grade updated successfully!';
  RAISE NOTICE '📧 Email: %', student_email;
  RAISE NOTICE '📚 Grade: %', student_grade;
  
END $$;

-- ============================================
-- CHECK IF STUDENT EXISTS BEFORE CREATING
-- ============================================

-- Check if student exists
SELECT 
  id,
  email,
  full_name,
  student_grade,
  role,
  created_at
FROM public.users
WHERE email = 'student@example.com';  -- Change to actual email

-- If student exists, you can update their grade:
UPDATE public.users
SET student_grade = 'starter'  -- Change to desired grade
WHERE email = 'student@example.com'  -- Change to actual email
AND role = 'student';



-- UPDATE EXISTING STUDENT GRADE
-- ============================================
-- Use this if student already exists and you just want to update their grade
-- ============================================

-- Method 1: Update student grade by email
UPDATE public.users
SET student_grade = 'starter'  -- Change to 'starter', 'mid', or 'higher'
WHERE email = 'student@example.com'  -- Change to actual email
AND role = 'student';

-- Method 2: Update student grade and other info
UPDATE public.users
SET student_grade = 'starter',
    full_name = 'Updated Name',
    phone_number = '+1234567890',
    updated_at = NOW()
WHERE email = 'student@example.com'  -- Change to actual email
AND role = 'student';

-- Method 3: Check if student exists first, then update
DO $$
DECLARE
  student_email TEXT := 'student@example.com';  -- Change this
  student_grade TEXT := 'starter';              -- Change this
  existing_user_id UUID;
BEGIN
  -- Check if student exists
  SELECT id INTO existing_user_id
  FROM public.users
  WHERE email = student_email
  AND role = 'student';
  
  IF existing_user_id IS NULL THEN
    RAISE NOTICE '❌ Student not found with email: %', student_email;
    RAISE NOTICE 'Please create the student first using QUICK_CREATE_STUDENT.sql';
    RETURN;
  END IF;
  
  -- Update student grade
  UPDATE public.users
  SET student_grade = student_grade,
      updated_at = NOW()
  WHERE id = existing_user_id;
  
  RAISE NOTICE '✅ Student grade updated successfully!';
  RAISE NOTICE '📧 Email: %', student_email;
  RAISE NOTICE '📚 Grade: %', student_grade;
  
END $$;

-- ============================================
-- CHECK IF STUDENT EXISTS BEFORE CREATING
-- ============================================

-- Check if student exists
SELECT 
  id,
  email,
  full_name,
  student_grade,
  role,
  created_at
FROM public.users
WHERE email = 'student@example.com';  -- Change to actual email

-- If student exists, you can update their grade:
UPDATE public.users
SET student_grade = 'starter'  -- Change to desired grade
WHERE email = 'student@example.com'  -- Change to actual email
AND role = 'student';





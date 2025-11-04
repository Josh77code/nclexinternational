-- ============================================
-- CREATE BATCH OF STUDENTS WITH GRADES
-- ============================================
-- This script creates multiple students with different grade categories
-- Password encryption: Uses bcrypt (crypt with gen_salt('bf'))
-- ============================================

-- Example: Create 3 students - one for each grade category
-- Copy and modify for each student you want to create

-- ============================================
-- STUDENT 1: STARTER GRADE
-- ============================================

DO $$
DECLARE
  student_id UUID;
  student_email TEXT := 'starter1@example.com';      -- CHANGE THIS
  student_password TEXT := 'Starter2024!';           -- CHANGE THIS
  student_name TEXT := 'Starter Student 1';          -- CHANGE THIS
  student_phone TEXT := '+1234567890';               -- CHANGE THIS (optional)
  student_grade TEXT := 'starter';
BEGIN
  -- Check if exists
  IF EXISTS (SELECT 1 FROM public.users WHERE email = student_email) THEN
    RAISE NOTICE 'Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),  -- Password hashed with bcrypt
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', student_name, 'phone_number', student_phone),
    FALSE
  );
  
  -- Create user profile with grade
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (student_id, student_email, student_name, 'student', student_grade, student_phone);
  
  RAISE NOTICE '✅ Created Starter Student';
  RAISE NOTICE '📧 Email: %', student_email;
  RAISE NOTICE '🔑 Password: %', student_password;
  RAISE NOTICE '📚 Grade: %', student_grade;
END $$;

-- ============================================
-- STUDENT 2: MID GRADE
-- ============================================

DO $$
DECLARE
  student_id UUID;
  student_email TEXT := 'mid1@example.com';          -- CHANGE THIS
  student_password TEXT := 'Mid2024!';               -- CHANGE THIS
  student_name TEXT := 'Mid Student 1';              -- CHANGE THIS
  student_phone TEXT := '+1234567890';               -- CHANGE THIS (optional)
  student_grade TEXT := 'mid';
BEGIN
  IF EXISTS (SELECT 1 FROM public.users WHERE email = student_email) THEN
    RAISE NOTICE 'Student already exists: %', student_email;
    RETURN;
  END IF;
  
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
    crypt(student_password, gen_salt('bf')),  -- Password hashed with bcrypt
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', student_name, 'phone_number', student_phone),
    FALSE
  );
  
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (student_id, student_email, student_name, 'student', student_grade, student_phone);
  
  RAISE NOTICE '✅ Created Mid Student';
  RAISE NOTICE '📧 Email: %', student_email;
  RAISE NOTICE '🔑 Password: %', student_password;
  RAISE NOTICE '📚 Grade: %', student_grade;
END $$;

-- ============================================
-- STUDENT 3: HIGHER GRADE
-- ============================================

DO $$
DECLARE
  student_id UUID;
  student_email TEXT := 'higher1@example.com';       -- CHANGE THIS
  student_password TEXT := 'Higher2024!';            -- CHANGE THIS
  student_name TEXT := 'Higher Student 1';           -- CHANGE THIS
  student_phone TEXT := '+1234567890';               -- CHANGE THIS (optional)
  student_grade TEXT := 'higher';
BEGIN
  IF EXISTS (SELECT 1 FROM public.users WHERE email = student_email) THEN
    RAISE NOTICE 'Student already exists: %', student_email;
    RETURN;
  END IF;
  
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
    crypt(student_password, gen_salt('bf')),  -- Password hashed with bcrypt
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', student_name, 'phone_number', student_phone),
    FALSE
  );
  
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (student_id, student_email, student_name, 'student', student_grade, student_phone);
  
  RAISE NOTICE '✅ Created Higher Student';
  RAISE NOTICE '📧 Email: %', student_email;
  RAISE NOTICE '🔑 Password: %', student_password;
  RAISE NOTICE '📚 Grade: %', student_grade;
END $$;

-- ============================================
-- VERIFY CREATED STUDENTS
-- ============================================

-- Check all created students
SELECT 
  u.email,
  u.full_name,
  u.student_grade,
  u.role,
  CASE 
    WHEN au.email_confirmed_at IS NOT NULL THEN '✅ Confirmed'
    ELSE '❌ Not Confirmed'
  END as email_status
FROM public.users u
JOIN auth.users au ON u.id = au.id
WHERE u.role = 'student'
AND u.student_grade IS NOT NULL
ORDER BY 
  CASE u.student_grade
    WHEN 'starter' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'higher' THEN 3
  END,
  u.created_at DESC;


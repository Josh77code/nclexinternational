-- ============================================
-- CREATE STUDENT WITH LOGIN CREDENTIALS
-- ============================================
-- This script creates a student account with email and password
-- After creating, you can assign them to a grade category
-- ============================================

-- IMPORTANT: Run this query to create a student account
-- Replace the values below with actual student information

DO $$
DECLARE
  student_id UUID;
  existing_user_id UUID;
  student_email TEXT := 'student@example.com';  -- Change this
  student_password TEXT := 'Student123!';        -- Change this
  student_name TEXT := 'John Doe';              -- Change this
  student_phone TEXT := '+1234567890';          -- Change this (optional)
  student_grade TEXT := 'starter';              -- Change to 'starter', 'mid', or 'higher'
BEGIN
  -- Check if student already exists
  SELECT id INTO existing_user_id
  FROM public.users
  WHERE email = student_email;
  
  -- If student exists, update their grade instead of creating new
  IF existing_user_id IS NOT NULL THEN
    RAISE NOTICE 'Student already exists with email: %', student_email;
    RAISE NOTICE 'Updating student grade instead...';
    
    -- Update the existing student's grade
    UPDATE public.users
    SET student_grade = student_grade,
        full_name = student_name,
        phone_number = student_phone,
        updated_at = NOW()
    WHERE id = existing_user_id;
    
    RAISE NOTICE '✅ Student grade updated successfully!';
    RAISE NOTICE '📧 Email: %', student_email;
    RAISE NOTICE '📚 Grade: %', student_grade;
    RAISE NOTICE '';
    RAISE NOTICE 'Student can login with existing credentials.';
    RETURN;
  END IF;
  
  -- Generate a unique ID for the new student
  student_id := gen_random_uuid();
  
  -- Step 1: Create auth user (Supabase Auth)
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    confirmation_token,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    student_id,
    'authenticated',
    'authenticated',
    student_email,
    crypt(student_password, gen_salt('bf')),  -- Encrypt password
    NOW(),  -- Email confirmed immediately
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', student_phone
    ),
    FALSE,
    '',
    ''
  );
  
  -- Step 2: Create user profile in public.users table
  INSERT INTO public.users (
    id,
    email,
    full_name,
    role,
    student_grade,  -- Assign grade directly
    phone_number,
    created_at,
    updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,  -- 'starter', 'mid', or 'higher'
    student_phone,
    NOW(),
    NOW()
  );
  
  -- Display success message
  RAISE NOTICE 'Student created successfully!';
  RAISE NOTICE 'Email: %', student_email;
  RAISE NOTICE 'Password: %', student_password;
  RAISE NOTICE 'Grade: %', student_grade;
  RAISE NOTICE 'Student ID: %', student_id;
  
END $$;

-- ============================================
-- VERIFY THE CREATED STUDENT
-- ============================================

-- After running the above, verify the student was created:
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.role,
  u.student_grade,
  u.phone_number,
  u.created_at,
  au.email_confirmed_at
FROM public.users u
JOIN auth.users au ON u.id = au.id
WHERE u.email = 'student@example.com';  -- Change to the email you used

-- ============================================
-- EXAMPLE: Create Multiple Students
-- ============================================

-- Example 1: Create a Starter student
-- Copy this and modify the values:
/*
DO $$
DECLARE
  student_id UUID;
BEGIN
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
    'john.doe@example.com',
    crypt('Password123!', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', 'John Doe', 'phone_number', '+1234567890'),
    FALSE
  );
  
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (student_id, 'john.doe@example.com', 'John Doe', 'student', 'starter', '+1234567890');
  
  RAISE NOTICE 'Student created: john.doe@example.com / Password123!';
END $$;
*/


-- ============================================
-- QUICK CREATE STUDENT - Copy and Modify
-- ============================================
-- Copy this entire block, modify the values, and run it
-- 
-- PASSWORD ENCRYPTION: Uses bcrypt (crypt with gen_salt('bf'))
-- - Passwords are hashed and cannot be reversed
-- - Each password has a unique salt
-- - Secure industry-standard encryption
-- ============================================

DO $$
DECLARE
  student_id UUID;
  existing_user_id UUID;
  student_email TEXT := 'student@example.com';          -- CHANGE THIS: Student's email
  student_password TEXT := 'Student123!';              -- CHANGE THIS: Student's password
  student_name TEXT := 'Student Name';                  -- CHANGE THIS: Student's full name
  student_phone TEXT := '+1234567890';                  -- CHANGE THIS: Phone (optional)
  student_grade TEXT := 'starter';                      -- CHANGE THIS: 'starter', 'mid', or 'higher'
BEGIN
  -- Check if student already exists
  SELECT id INTO existing_user_id
  FROM public.users
  WHERE email = student_email;
  
  -- If student exists, update their grade instead
  IF existing_user_id IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists with email: %', student_email;
    RAISE NOTICE 'Updating student grade instead...';
    
    UPDATE public.users
    SET student_grade = student_grade,
        full_name = student_name,
        phone_number = student_phone,
        updated_at = NOW()
    WHERE id = existing_user_id;
    
    RAISE NOTICE '✅ Student grade updated!';
    RAISE NOTICE '📧 Email: %', student_email;
    RAISE NOTICE '📚 Grade: %', student_grade;
    RAISE NOTICE 'Student can login with existing credentials.';
    RETURN;
  END IF;
  
  -- Generate unique ID for new student
  student_id := gen_random_uuid();
  
  -- Create auth user (login credentials)
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
    NOW(),  -- Email confirmed immediately
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', student_phone
    ),
    FALSE
  );
  
  -- Create user profile with grade
  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    student_phone
  );
  
  RAISE NOTICE '✅ Student created successfully!';
  RAISE NOTICE '📧 Email: %', student_email;
  RAISE NOTICE '🔑 Password: %', student_password;
  RAISE NOTICE '📚 Grade: %', student_grade;
  RAISE NOTICE '';
  RAISE NOTICE 'Give these credentials to the student!';
  
END $$;

-- ============================================
-- VERIFY STUDENT WAS CREATED
-- ============================================

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
WHERE u.email = 'student@example.com';  -- CHANGE THIS: Use the email you created


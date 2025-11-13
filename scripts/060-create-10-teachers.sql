-- Create 10 Teacher Accounts
-- This script creates 10 teacher accounts with login credentials

-- Disable RLS temporarily to allow insertion
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Function to create teacher accounts
DO $$
DECLARE
  teacher_emails TEXT[] := ARRAY[
    'teacher1@nclexkeys.com',
    'teacher2@nclexkeys.com',
    'teacher3@nclexkeys.com',
    'teacher4@nclexkeys.com',
    'teacher5@nclexkeys.com',
    'teacher6@nclexkeys.com',
    'teacher7@nclexkeys.com',
    'teacher8@nclexkeys.com',
    'teacher9@nclexkeys.com',
    'teacher10@nclexkeys.com'
  ];
  teacher_names TEXT[] := ARRAY[
    'Teacher One',
    'Teacher Two',
    'Teacher Three',
    'Teacher Four',
    'Teacher Five',
    'Teacher Six',
    'Teacher Seven',
    'Teacher Eight',
    'Teacher Nine',
    'Teacher Ten'
  ];
  teacher_email TEXT;
  teacher_name TEXT;
  teacher_id UUID;
  teacher_index INT;
  auth_user_id UUID;
BEGIN
  -- Loop through and create each teacher
  FOR teacher_index IN 1..10 LOOP
    teacher_email := teacher_emails[teacher_index];
    teacher_name := teacher_names[teacher_index];
    
    -- Check if teacher already exists in auth.users
    SELECT id INTO auth_user_id 
    FROM auth.users 
    WHERE email = teacher_email;
    
    IF auth_user_id IS NULL THEN
      -- Generate UUID for auth user
      auth_user_id := gen_random_uuid();
      
      -- Create auth user (Note: This requires Supabase Admin API in production)
      -- For now, we'll create the public.users record and admin can create auth users via Admin API
      RAISE NOTICE 'Creating teacher: % (%), please create auth user with ID: %', teacher_name, teacher_email, auth_user_id;
    ELSE
      RAISE NOTICE 'Teacher % already exists in auth.users', teacher_email;
    END IF;
    
    -- Check if public user exists
    SELECT id INTO teacher_id 
    FROM public.users 
    WHERE email = teacher_email;
    
    IF teacher_id IS NULL THEN
      -- Insert into public.users (using auth user ID if exists, otherwise generate new)
      INSERT INTO public.users (
        id,
        email,
        full_name,
        role,
        phone_number,
        created_at,
        updated_at
      ) VALUES (
        COALESCE(auth_user_id, gen_random_uuid()),
        teacher_email,
        teacher_name,
        'instructor',
        '+234-000-0000',
        NOW(),
        NOW()
      ) ON CONFLICT (id) DO UPDATE
      SET 
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        role = 'instructor',
        updated_at = NOW();
      
      RAISE NOTICE 'Created public user for teacher: %', teacher_name;
    ELSE
      -- Update existing teacher
      UPDATE public.users
      SET 
        role = 'instructor',
        full_name = teacher_name,
        updated_at = NOW()
      WHERE email = teacher_email;
      
      RAISE NOTICE 'Updated existing teacher: %', teacher_name;
    END IF;
  END LOOP;
  
  RAISE NOTICE 'Teacher account creation completed!';
  RAISE NOTICE '';
  RAISE NOTICE 'NOTE: You need to create auth users via Supabase Admin API with these emails:';
  FOR teacher_index IN 1..10 LOOP
    RAISE NOTICE '  - % (Password: Teacher%%)', teacher_emails[teacher_index], teacher_index;
  END LOOP;
END $$;

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Verify created teachers
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users
WHERE role = 'instructor'
ORDER BY email;


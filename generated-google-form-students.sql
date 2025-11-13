-- Generated SQL to create students from Google Form responses
-- Generated at: 2025-11-12T22:30:01.410Z
DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'znthanni@gmail.com';
  student_password TEXT := 'nasir-thanni';
  student_name TEXT := 'Zainab Nasir-Thanni';
  student_phone TEXT := '08103080426';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'nwangwathelma@gmail.com';
  student_password TEXT := 'nwangwa';
  student_name TEXT := 'Thelma Nwangwa';
  student_phone TEXT := '+2348037471497';
  student_grade TEXT := 'mid';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'chibuikeeugeniaihuoma@gmail.com';
  student_password TEXT := 'ihuoma';
  student_name TEXT := 'Chibuike Eugenia Ihuoma';
  student_phone TEXT := '08064258015';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'joyousjoyceone1@gmail.com';
  student_password TEXT := 'joyce';
  student_name TEXT := 'Oti-Totty Amarachi Joyce';
  student_phone TEXT := 'joyousjoyceone1@gmail.com';
  student_grade TEXT := 'mid';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'poroyedeborah@gmail.com';
  student_password TEXT := 'oluwaseun';
  student_name TEXT := 'Poroye Deborah Oluwaseun';
  student_phone TEXT := '08165159706';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'melvisforyoung@yahoo.com';
  student_password TEXT := 'kein';
  student_name TEXT := 'Melvis kein';
  student_phone TEXT := '9787288243';
  student_grade TEXT := 'mid';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'motunrayohamed@yahoo.com';
  student_password TEXT := 'hanifat';
  student_name TEXT := 'Hamed Motunrayo Hanifat';
  student_phone TEXT := '2348138312325';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'ellapresh831@gmail.com';
  student_password TEXT := 'precious';
  student_name TEXT := 'Nnam precious';
  student_phone TEXT := '07089174121';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'chiomapromise570@gmail.com';
  student_password TEXT := 'promise';
  student_name TEXT := 'Udo-Oparaji Chioma Promise';
  student_phone TEXT := '08035450327';
  student_grade TEXT := 'mid';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'moluwasike@gmail.com';
  student_password TEXT := 'oluwasike';
  student_name TEXT := 'Soji-Adekola Mary Oluwasike';
  student_phone TEXT := '08030859822';
  student_grade TEXT := 'mid';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'misturaayinde10@gmail.com';
  student_password TEXT := 'ajoke';
  student_name TEXT := 'Ayinde Mistura Ajoke';
  student_phone TEXT := '08064320152';
  student_grade TEXT := 'higher';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'graceocheme01@gmail.com';
  student_password TEXT := 'ocheme';
  student_name TEXT := 'Grace Ocheme';
  student_phone TEXT := '08037737921';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'awoojumoke49@gmail.com';
  student_password TEXT := 'awoyale';
  student_name TEXT := 'Adejumoke Awoyale';
  student_phone TEXT := '07069468162';
  student_grade TEXT := 'higher';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'sefunmiomosebi@gmail.com';
  student_password TEXT := 'oluwasefunmi';
  student_name TEXT := 'Omosebi Oluwasefunmi';
  student_phone TEXT := '08064346113';
  student_grade TEXT := 'higher';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'ibrahimmonsurat88@yahoo.com';
  student_password TEXT := 'ibrahim';
  student_name TEXT := 'Adewunmi Monsurat Ibrahim';
  student_phone TEXT := '4346320360';
  student_grade TEXT := 'mid';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'gbemisola.olarewaju02@gmail.com';
  student_password TEXT := 'olarewaju';
  student_name TEXT := 'Gbemisola Olarewaju';
  student_phone TEXT := '2404213069';
  student_grade TEXT := 'mid';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'carobukola@gmail.com';
  student_password TEXT := 'caroline';
  student_name TEXT := 'Olalu Caroline';
  student_phone TEXT := '08054902983';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'adetayoadeoti06@yahoo.com';
  student_password TEXT := 'aguda';
  student_name TEXT := 'Adetayo Aguda';
  student_phone TEXT := '+447990281412';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'sammy.oderinde@gmail.com';
  student_password TEXT := 'oderinde';
  student_name TEXT := 'Samiat Oderinde';
  student_phone TEXT := '08147591120';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'asogbatitilayo2006@gmail.com';
  student_password TEXT := 'asogba';
  student_name TEXT := 'Titilayo Naomi Asogba';
  student_phone TEXT := '+2349131822791';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'olojedestella73@gmail.com';
  student_password TEXT := 'olojedee';
  student_name TEXT := 'Stella Olojedee';
  student_phone TEXT := '+1 4372352316';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'goodnewsblessing65@gmail.com';
  student_password TEXT := 'chikamso';
  student_name TEXT := 'Olisah Chikamso';
  student_phone TEXT := '07083246965';
  student_grade TEXT := 'starter';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

DO $$
DECLARE
  student_id UUID;
  existing_user UUID;
  student_email TEXT := 'samson1ayomikun@gmail.com';
  student_password TEXT := 'enikanoselu';
  student_name TEXT := 'Samson Enikanoselu';
  student_phone TEXT := '07746663041';
  student_grade TEXT := 'mid';
BEGIN
  SELECT id INTO existing_user
  FROM public.users
  WHERE email = student_email;

  IF existing_user IS NOT NULL THEN
    RAISE NOTICE '⚠️ Student already exists: %', student_email;
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
    crypt(student_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object(
      'full_name', student_name,
      'phone_number', NULLIF(student_phone, '')
    ),
    FALSE
  );

  INSERT INTO public.users (
    id, email, full_name, role, student_grade, phone_number, created_at, updated_at
  ) VALUES (
    student_id,
    student_email,
    student_name,
    'student',
    student_grade,
    NULLIF(student_phone, ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    student_grade = EXCLUDED.student_grade,
    phone_number = EXCLUDED.phone_number,
    updated_at = NOW();

  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;
END $$;

# How Students Login to Their Dashboard

## Overview

After you create students in the database and assign them to categories, they can login using their email and password. The system automatically:
- Authenticates them using Supabase Auth
- Redirects them to their dashboard
- Shows their grade category on the dashboard
- Filters courses and questions based on their grade

## Student Login Process

### Step 1: Students Go to Login Page
- URL: `https://your-domain.com/login`
- Students enter their **email** and **password**
- Click "Login" button

### Step 2: System Authenticates
- System checks credentials against Supabase Auth
- If valid, creates a session
- Retrieves student's grade from database

### Step 3: Redirect to Dashboard
- Student is redirected to `/dashboard`
- Dashboard automatically shows:
  - Student's name and grade category
  - Courses for their grade level
  - Questions for their grade level

## How to Create Student Accounts

### Option 1: Create Student with Script (Recommended)

Use the script `scripts/056-create-student-with-credentials.sql`:

1. **Open Supabase SQL Editor**
2. **Copy the DO block** from the script
3. **Modify the values:**
   ```sql
   student_email TEXT := 'john.doe@example.com';  -- Student's email
   student_password TEXT := 'Student123!';        -- Password for student
   student_name TEXT := 'John Doe';               -- Student's full name
   student_phone TEXT := '+1234567890';          -- Phone (optional)
   student_grade TEXT := 'starter';              -- 'starter', 'mid', or 'higher'
   ```
4. **Run the query**
5. **Give credentials to student:**
   - Email: `john.doe@example.com`
   - Password: `Student123!`

### Option 2: Create Student Manually (Advanced)

If you prefer to create students manually:

1. **Create Auth User** (in Supabase Dashboard → Authentication → Users)
   - Click "Add user"
   - Enter email and password
   - Auto-confirm email: ✅ ON
   - Click "Create user"

2. **Get the User ID**
   - After creating, note the User ID (UUID)

3. **Create User Profile** (in Supabase SQL Editor)
   ```sql
   INSERT INTO public.users (
     id,
     email,
     full_name,
     role,
     student_grade,
     phone_number
   ) VALUES (
     'user-uuid-from-step-2',  -- The UUID from auth.users
     'student@example.com',
     'Student Name',
     'student',
     'starter',  -- or 'mid', or 'higher'
     '+1234567890'
   );
   ```

4. **Assign to Grade Category** (if not done in step 3)
   ```sql
   UPDATE users 
   SET student_grade = 'starter' 
   WHERE email = 'student@example.com';
   ```

## Quick Example: Create and Assign Student

### Complete Example

**Create a student named "Sarah Johnson" in Starter category:**

```sql
DO $$
DECLARE
  student_id UUID;
BEGIN
  student_id := gen_random_uuid();
  
  -- Create auth user
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data, is_super_admin
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    student_id,
    'authenticated',
    'authenticated',
    'sarah.johnson@example.com',
    crypt('Sarah2024!', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', 'Sarah Johnson', 'phone_number', '+1234567890'),
    FALSE
  );
  
  -- Create user profile with grade
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (student_id, 'sarah.johnson@example.com', 'Sarah Johnson', 'student', 'starter', '+1234567890');
  
  RAISE NOTICE 'Student created! Email: sarah.johnson@example.com, Password: Sarah2024!';
END $$;
```

**Login credentials to give to student:**
- Email: `sarah.johnson@example.com`
- Password: `Sarah2024!`

## What Students See After Login

1. **Welcome Message** with their name
2. **Grade Badge** showing their category (Starter/Mid/Higher)
3. **Courses** filtered by their grade level
4. **Questions** filtered by their grade level
5. **Dashboard** personalized to their grade

## Student Dashboard Features

### Grade Display
- Grade category shown prominently on dashboard
- Badge in header dropdown menu
- Only content for their grade is visible

### Course Access
- Students see only courses tagged for their grade
- Courses without grade tags are visible to all (backward compatibility)

### Question Access
- Students see only questions tagged for their grade
- Questions without grade tags are visible to all

## Changing Student Password

### Option 1: Reset Password (Student Self-Service)
Students can use "Forgot Password" link on login page:
1. Click "Forgot Password"
2. Enter email
3. Receive reset link via email
4. Set new password

### Option 2: Admin Reset Password (Manual)
Use Supabase Dashboard:
1. Go to Authentication → Users
2. Find student by email
3. Click "Reset Password"
4. New password is sent to student's email

### Option 3: Set Password Directly (SQL)
```sql
-- Update password for a student
UPDATE auth.users 
SET encrypted_password = crypt('NewPassword123!', gen_salt('bf'))
WHERE email = 'student@example.com';
```

## Troubleshooting Login Issues

### "Invalid login credentials"
- Check that email is correct (case-sensitive)
- Verify password is correct
- Make sure student account exists in both `auth.users` and `public.users`

### "User not found"
- Check that student exists in `auth.users`
- Verify email address matches exactly

### "Student sees all content"
- Check that `student_grade` is set in `public.users`
- Verify the grade value is: 'starter', 'mid', or 'higher'

### "Student can't see their grade"
- Check that `student_grade` is not NULL
- Verify dashboard is loading user data correctly

## Security Best Practices

1. **Use Strong Passwords**
   - Minimum 8 characters
   - Mix of letters, numbers, and symbols
   - Example: `Student2024!`

2. **Email Confirmation**
   - Students should confirm their email (auto-confirmed in manual creation)
   - Prevents unauthorized account creation

3. **Password Storage**
   - Passwords are encrypted using bcrypt
   - Never stored in plain text

4. **Session Management**
   - Sessions expire after inactivity
   - Students can logout anytime

## Complete Workflow Example

### Step 1: Create Student Account
```sql
-- Run script 056-create-student-with-credentials.sql
-- Modify email, password, name, and grade
```

### Step 2: Verify Student Created
```sql
SELECT email, full_name, student_grade, role
FROM users 
WHERE email = 'student@example.com';
```

### Step 3: Give Credentials to Student
- Email: `student@example.com`
- Password: `Password123!`
- Login URL: `https://your-domain.com/login`

### Step 4: Student Logs In
1. Student goes to `/login`
2. Enters email and password
3. Clicks "Login"
4. Redirected to dashboard
5. Sees their grade and filtered content

## Summary

✅ **Create student account** → Use script `056-create-student-with-credentials.sql`
✅ **Assign to grade category** → Set `student_grade` in the script
✅ **Give credentials to student** → Email and password
✅ **Student logs in** → Uses `/login` page
✅ **Dashboard shows grade** → Automatically filtered content

The system handles everything automatically once the student account is created!




## Overview

After you create students in the database and assign them to categories, they can login using their email and password. The system automatically:
- Authenticates them using Supabase Auth
- Redirects them to their dashboard
- Shows their grade category on the dashboard
- Filters courses and questions based on their grade

## Student Login Process

### Step 1: Students Go to Login Page
- URL: `https://your-domain.com/login`
- Students enter their **email** and **password**
- Click "Login" button

### Step 2: System Authenticates
- System checks credentials against Supabase Auth
- If valid, creates a session
- Retrieves student's grade from database

### Step 3: Redirect to Dashboard
- Student is redirected to `/dashboard`
- Dashboard automatically shows:
  - Student's name and grade category
  - Courses for their grade level
  - Questions for their grade level

## How to Create Student Accounts

### Option 1: Create Student with Script (Recommended)

Use the script `scripts/056-create-student-with-credentials.sql`:

1. **Open Supabase SQL Editor**
2. **Copy the DO block** from the script
3. **Modify the values:**
   ```sql
   student_email TEXT := 'john.doe@example.com';  -- Student's email
   student_password TEXT := 'Student123!';        -- Password for student
   student_name TEXT := 'John Doe';               -- Student's full name
   student_phone TEXT := '+1234567890';          -- Phone (optional)
   student_grade TEXT := 'starter';              -- 'starter', 'mid', or 'higher'
   ```
4. **Run the query**
5. **Give credentials to student:**
   - Email: `john.doe@example.com`
   - Password: `Student123!`

### Option 2: Create Student Manually (Advanced)

If you prefer to create students manually:

1. **Create Auth User** (in Supabase Dashboard → Authentication → Users)
   - Click "Add user"
   - Enter email and password
   - Auto-confirm email: ✅ ON
   - Click "Create user"

2. **Get the User ID**
   - After creating, note the User ID (UUID)

3. **Create User Profile** (in Supabase SQL Editor)
   ```sql
   INSERT INTO public.users (
     id,
     email,
     full_name,
     role,
     student_grade,
     phone_number
   ) VALUES (
     'user-uuid-from-step-2',  -- The UUID from auth.users
     'student@example.com',
     'Student Name',
     'student',
     'starter',  -- or 'mid', or 'higher'
     '+1234567890'
   );
   ```

4. **Assign to Grade Category** (if not done in step 3)
   ```sql
   UPDATE users 
   SET student_grade = 'starter' 
   WHERE email = 'student@example.com';
   ```

## Quick Example: Create and Assign Student

### Complete Example

**Create a student named "Sarah Johnson" in Starter category:**

```sql
DO $$
DECLARE
  student_id UUID;
BEGIN
  student_id := gen_random_uuid();
  
  -- Create auth user
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data, is_super_admin
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    student_id,
    'authenticated',
    'authenticated',
    'sarah.johnson@example.com',
    crypt('Sarah2024!', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', 'Sarah Johnson', 'phone_number', '+1234567890'),
    FALSE
  );
  
  -- Create user profile with grade
  INSERT INTO public.users (id, email, full_name, role, student_grade, phone_number)
  VALUES (student_id, 'sarah.johnson@example.com', 'Sarah Johnson', 'student', 'starter', '+1234567890');
  
  RAISE NOTICE 'Student created! Email: sarah.johnson@example.com, Password: Sarah2024!';
END $$;
```

**Login credentials to give to student:**
- Email: `sarah.johnson@example.com`
- Password: `Sarah2024!`

## What Students See After Login

1. **Welcome Message** with their name
2. **Grade Badge** showing their category (Starter/Mid/Higher)
3. **Courses** filtered by their grade level
4. **Questions** filtered by their grade level
5. **Dashboard** personalized to their grade

## Student Dashboard Features

### Grade Display
- Grade category shown prominently on dashboard
- Badge in header dropdown menu
- Only content for their grade is visible

### Course Access
- Students see only courses tagged for their grade
- Courses without grade tags are visible to all (backward compatibility)

### Question Access
- Students see only questions tagged for their grade
- Questions without grade tags are visible to all

## Changing Student Password

### Option 1: Reset Password (Student Self-Service)
Students can use "Forgot Password" link on login page:
1. Click "Forgot Password"
2. Enter email
3. Receive reset link via email
4. Set new password

### Option 2: Admin Reset Password (Manual)
Use Supabase Dashboard:
1. Go to Authentication → Users
2. Find student by email
3. Click "Reset Password"
4. New password is sent to student's email

### Option 3: Set Password Directly (SQL)
```sql
-- Update password for a student
UPDATE auth.users 
SET encrypted_password = crypt('NewPassword123!', gen_salt('bf'))
WHERE email = 'student@example.com';
```

## Troubleshooting Login Issues

### "Invalid login credentials"
- Check that email is correct (case-sensitive)
- Verify password is correct
- Make sure student account exists in both `auth.users` and `public.users`

### "User not found"
- Check that student exists in `auth.users`
- Verify email address matches exactly

### "Student sees all content"
- Check that `student_grade` is set in `public.users`
- Verify the grade value is: 'starter', 'mid', or 'higher'

### "Student can't see their grade"
- Check that `student_grade` is not NULL
- Verify dashboard is loading user data correctly

## Security Best Practices

1. **Use Strong Passwords**
   - Minimum 8 characters
   - Mix of letters, numbers, and symbols
   - Example: `Student2024!`

2. **Email Confirmation**
   - Students should confirm their email (auto-confirmed in manual creation)
   - Prevents unauthorized account creation

3. **Password Storage**
   - Passwords are encrypted using bcrypt
   - Never stored in plain text

4. **Session Management**
   - Sessions expire after inactivity
   - Students can logout anytime

## Complete Workflow Example

### Step 1: Create Student Account
```sql
-- Run script 056-create-student-with-credentials.sql
-- Modify email, password, name, and grade
```

### Step 2: Verify Student Created
```sql
SELECT email, full_name, student_grade, role
FROM users 
WHERE email = 'student@example.com';
```

### Step 3: Give Credentials to Student
- Email: `student@example.com`
- Password: `Password123!`
- Login URL: `https://your-domain.com/login`

### Step 4: Student Logs In
1. Student goes to `/login`
2. Enters email and password
3. Clicks "Login"
4. Redirected to dashboard
5. Sees their grade and filtered content

## Summary

✅ **Create student account** → Use script `056-create-student-with-credentials.sql`
✅ **Assign to grade category** → Set `student_grade` in the script
✅ **Give credentials to student** → Email and password
✅ **Student logs in** → Uses `/login` page
✅ **Dashboard shows grade** → Automatically filtered content

The system handles everything automatically once the student account is created!































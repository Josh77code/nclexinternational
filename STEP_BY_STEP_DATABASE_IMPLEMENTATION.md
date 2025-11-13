# Step-by-Step: How to Implement Student Grade Management in Database

## Prerequisites

Before you start, make sure you've run the main migration script:
- Run `scripts/054-add-student-grade-system.sql` first (this sets up the database schema)

## Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **"SQL Editor"** in the left sidebar
4. Click **"New Query"** button (top right)

## Step 2: Choose What You Want to Do

The file `055-manage-student-grades.sql` contains different types of queries. You need to:

### Option A: Add a Student to a Category

**Example: Add "john.doe@example.com" to Starter category**

1. Copy ONLY this query (lines 14-17):
```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student-email@example.com' 
AND role = 'student';
```

2. Paste it into the SQL Editor

3. Replace `'student-email@example.com'` with the actual email:
```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'john.doe@example.com' 
AND role = 'student';
```

4. Click **"Run"** button or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

5. You should see: "Success. No rows returned" or "Success. 1 row updated"

### Option B: View Students in a Category

**Example: See all Starter students**

1. Copy ONLY this query (lines 99-108):
```sql
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
```

2. Paste it into SQL Editor

3. Click **"Run"**

4. You'll see a table with all students in the Starter category

### Option C: Promote a Student

**Example: Promote "john.doe@example.com" from Starter to Mid**

1. Copy ONLY this query (lines 42-46):
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'student-email@example.com'
AND role = 'student';
```

2. Replace the email:
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'john.doe@example.com'
AND role = 'student';
```

3. Click **"Run"**

## Step 3: Common Operations

### A. Add a New Student to Starter Category

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'actual-student-email@example.com' 
AND role = 'student';
```

### B. Add a New Student to Mid Category

```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'actual-student-email@example.com' 
AND role = 'student';
```

### C. Add a New Student to Higher Category

```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'actual-student-email@example.com' 
AND role = 'student';
```

### D. View All Students Without a Grade

```sql
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
```

### E. Count Students in Each Category

```sql
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
```

## Step 4: Complete Workflow Example

Here's a complete example of adding a student:

### 1. First, check if student exists and what grade they have:

```sql
SELECT email, full_name, student_grade, role
FROM users 
WHERE email = 'john.doe@example.com';
```

### 2. If student exists and has no grade, add them to Starter:

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'john.doe@example.com' 
AND role = 'student';
```

### 3. Verify the change:

```sql
SELECT email, full_name, student_grade
FROM users 
WHERE email = 'john.doe@example.com';
```

You should now see `student_grade = 'starter'`

## Step 5: Using by Student UUID (if you know the ID)

If you know the student's UUID instead of email:

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE id = 'actual-uuid-here' 
AND role = 'student';
```

To find a student's UUID:

```sql
SELECT id, email, full_name
FROM users 
WHERE email = 'student@example.com';
```

## Important Notes

1. **Always run ONE query at a time** - Don't copy the entire file
2. **Replace example values** - Always replace `'student-email@example.com'` with real emails
3. **Check results** - After UPDATE, run a SELECT query to verify
4. **Use transactions** - For critical updates, wrap in BEGIN/COMMIT:

```sql
BEGIN;

UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'john.doe@example.com' 
AND role = 'student';

-- Verify the change
SELECT email, student_grade 
FROM users 
WHERE email = 'john.doe@example.com';

COMMIT;
```

## Troubleshooting

### "No rows updated"
- Check that the email is correct
- Verify the student exists: `SELECT * FROM users WHERE email = 'student@example.com';`
- Make sure the student's role is 'student'

### "Column does not exist"
- You need to run `054-add-student-grade-system.sql` first
- Check that the migration completed successfully

### "Syntax error"
- Make sure you copied the query correctly
- Check that all quotes are properly closed
- Don't run multiple queries at once

## Quick Reference

| What You Want | Query to Use | Lines in File |
|--------------|-------------|---------------|
| Add to Starter | Lines 14-17 | Update with `'starter'` |
| Add to Mid | Lines 20-23 | Update with `'mid'` |
| Add to Higher | Lines 26-29 | Update with `'higher'` |
| View Starter students | Lines 99-108 | SELECT query |
| View Mid students | Lines 111-120 | SELECT query |
| View Higher students | Lines 123-132 | SELECT query |
| View students without grade | Lines 135-144 | SELECT query |
| Count by category | Lines 197-220 | SELECT query |

## Video Guide (Text Version)

1. Open Supabase → SQL Editor
2. Click "New Query"
3. Open `055-manage-student-grades.sql` in your text editor
4. Find the query you need (e.g., lines 14-17 for adding to Starter)
5. Copy ONLY that query
6. Paste into Supabase SQL Editor
7. Replace `'student-email@example.com'` with actual email
8. Click "Run"
9. Done! ✅




## Prerequisites

Before you start, make sure you've run the main migration script:
- Run `scripts/054-add-student-grade-system.sql` first (this sets up the database schema)

## Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **"SQL Editor"** in the left sidebar
4. Click **"New Query"** button (top right)

## Step 2: Choose What You Want to Do

The file `055-manage-student-grades.sql` contains different types of queries. You need to:

### Option A: Add a Student to a Category

**Example: Add "john.doe@example.com" to Starter category**

1. Copy ONLY this query (lines 14-17):
```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student-email@example.com' 
AND role = 'student';
```

2. Paste it into the SQL Editor

3. Replace `'student-email@example.com'` with the actual email:
```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'john.doe@example.com' 
AND role = 'student';
```

4. Click **"Run"** button or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

5. You should see: "Success. No rows returned" or "Success. 1 row updated"

### Option B: View Students in a Category

**Example: See all Starter students**

1. Copy ONLY this query (lines 99-108):
```sql
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
```

2. Paste it into SQL Editor

3. Click **"Run"**

4. You'll see a table with all students in the Starter category

### Option C: Promote a Student

**Example: Promote "john.doe@example.com" from Starter to Mid**

1. Copy ONLY this query (lines 42-46):
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'student-email@example.com'
AND role = 'student';
```

2. Replace the email:
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'john.doe@example.com'
AND role = 'student';
```

3. Click **"Run"**

## Step 3: Common Operations

### A. Add a New Student to Starter Category

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'actual-student-email@example.com' 
AND role = 'student';
```

### B. Add a New Student to Mid Category

```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'actual-student-email@example.com' 
AND role = 'student';
```

### C. Add a New Student to Higher Category

```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'actual-student-email@example.com' 
AND role = 'student';
```

### D. View All Students Without a Grade

```sql
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
```

### E. Count Students in Each Category

```sql
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
```

## Step 4: Complete Workflow Example

Here's a complete example of adding a student:

### 1. First, check if student exists and what grade they have:

```sql
SELECT email, full_name, student_grade, role
FROM users 
WHERE email = 'john.doe@example.com';
```

### 2. If student exists and has no grade, add them to Starter:

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'john.doe@example.com' 
AND role = 'student';
```

### 3. Verify the change:

```sql
SELECT email, full_name, student_grade
FROM users 
WHERE email = 'john.doe@example.com';
```

You should now see `student_grade = 'starter'`

## Step 5: Using by Student UUID (if you know the ID)

If you know the student's UUID instead of email:

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE id = 'actual-uuid-here' 
AND role = 'student';
```

To find a student's UUID:

```sql
SELECT id, email, full_name
FROM users 
WHERE email = 'student@example.com';
```

## Important Notes

1. **Always run ONE query at a time** - Don't copy the entire file
2. **Replace example values** - Always replace `'student-email@example.com'` with real emails
3. **Check results** - After UPDATE, run a SELECT query to verify
4. **Use transactions** - For critical updates, wrap in BEGIN/COMMIT:

```sql
BEGIN;

UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'john.doe@example.com' 
AND role = 'student';

-- Verify the change
SELECT email, student_grade 
FROM users 
WHERE email = 'john.doe@example.com';

COMMIT;
```

## Troubleshooting

### "No rows updated"
- Check that the email is correct
- Verify the student exists: `SELECT * FROM users WHERE email = 'student@example.com';`
- Make sure the student's role is 'student'

### "Column does not exist"
- You need to run `054-add-student-grade-system.sql` first
- Check that the migration completed successfully

### "Syntax error"
- Make sure you copied the query correctly
- Check that all quotes are properly closed
- Don't run multiple queries at once

## Quick Reference

| What You Want | Query to Use | Lines in File |
|--------------|-------------|---------------|
| Add to Starter | Lines 14-17 | Update with `'starter'` |
| Add to Mid | Lines 20-23 | Update with `'mid'` |
| Add to Higher | Lines 26-29 | Update with `'higher'` |
| View Starter students | Lines 99-108 | SELECT query |
| View Mid students | Lines 111-120 | SELECT query |
| View Higher students | Lines 123-132 | SELECT query |
| View students without grade | Lines 135-144 | SELECT query |
| Count by category | Lines 197-220 | SELECT query |

## Video Guide (Text Version)

1. Open Supabase → SQL Editor
2. Click "New Query"
3. Open `055-manage-student-grades.sql` in your text editor
4. Find the query you need (e.g., lines 14-17 for adding to Starter)
5. Copy ONLY that query
6. Paste into Supabase SQL Editor
7. Replace `'student-email@example.com'` with actual email
8. Click "Run"
9. Done! ✅































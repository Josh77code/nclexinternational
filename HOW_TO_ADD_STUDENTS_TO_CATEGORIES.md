# How to Add Students to Categories

This guide shows you how to add students to grade categories (Starter, Mid, Higher) in the database at any time.

## Quick Start

### Add a Single Student to a Category

Run this SQL query in your Supabase SQL editor:

```sql
-- Add student to Starter (Beginner) category
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student-email@example.com' 
AND role = 'student';
```

Replace `'student-email@example.com'` with the actual student's email address.

### Available Grade Categories

- `'starter'` - Starter (Beginner)
- `'mid'` - Mid (Intermediate)  
- `'higher'` - Higher (Advanced)

## Common Operations

### 1. Add Student to Starter Category

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### 2. Add Student to Mid Category

```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### 3. Add Student to Higher Category

```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### 4. Promote Student from Starter to Mid

```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'student@example.com'
AND role = 'student';
```

### 5. Promote Student from Mid to Higher

```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'mid' 
AND email = 'student@example.com'
AND role = 'student';
```

### 6. Add Multiple Students at Once

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email IN (
  'student1@example.com',
  'student2@example.com',
  'student3@example.com'
) 
AND role = 'student';
```

### 7. Add All Students Without Grade to Starter

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE student_grade IS NULL 
AND role = 'student';
```

### 8. Change Student's Grade

```sql
-- Change to any grade (starter, mid, or higher)
UPDATE users 
SET student_grade = 'mid'  -- Change this to desired grade
WHERE email = 'student@example.com' 
AND role = 'student';
```

### 9. Remove Grade Assignment (Student sees all content)

```sql
UPDATE users 
SET student_grade = NULL 
WHERE email = 'student@example.com' 
AND role = 'student';
```

## View Students by Category

### View All Starter Students

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

### View All Mid Students

```sql
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
```

### View All Higher Students

```sql
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
```

### View Students Without Grade

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

### View Summary of All Students by Category

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

## Important Notes

1. **You can add students at any time** - The system is dynamic and updates immediately
2. **Dashboard updates automatically** - When you change a student's grade, their dashboard will show the new grade immediately
3. **Students without grade** - Students without a `student_grade` will see all courses and questions (backward compatibility)
4. **Use email or UUID** - You can find students by email (easier) or by UUID if you know it
5. **Changes are immediate** - No need to restart the application, changes take effect right away

## Using Student ID Instead of Email

If you know the student's UUID, you can use:

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE id = 'student-uuid-here' 
AND role = 'student';
```

## Complete Management Script

For a complete set of SQL queries for managing students, see:
- `scripts/055-manage-student-grades.sql`

This script contains all the queries you need for managing student grades.

## Example Workflow

1. **New student registers** → Student account created without grade
2. **Admin assigns grade** → Run SQL to set `student_grade = 'starter'`
3. **Student sees Starter content** → Dashboard shows only Starter courses/questions
4. **Student progresses** → Admin updates grade to `'mid'` or `'higher'`
5. **Dashboard updates** → Student immediately sees content for their new grade

The system is designed to be flexible - you can change grades at any time!




This guide shows you how to add students to grade categories (Starter, Mid, Higher) in the database at any time.

## Quick Start

### Add a Single Student to a Category

Run this SQL query in your Supabase SQL editor:

```sql
-- Add student to Starter (Beginner) category
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student-email@example.com' 
AND role = 'student';
```

Replace `'student-email@example.com'` with the actual student's email address.

### Available Grade Categories

- `'starter'` - Starter (Beginner)
- `'mid'` - Mid (Intermediate)  
- `'higher'` - Higher (Advanced)

## Common Operations

### 1. Add Student to Starter Category

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### 2. Add Student to Mid Category

```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### 3. Add Student to Higher Category

```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### 4. Promote Student from Starter to Mid

```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'student@example.com'
AND role = 'student';
```

### 5. Promote Student from Mid to Higher

```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'mid' 
AND email = 'student@example.com'
AND role = 'student';
```

### 6. Add Multiple Students at Once

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email IN (
  'student1@example.com',
  'student2@example.com',
  'student3@example.com'
) 
AND role = 'student';
```

### 7. Add All Students Without Grade to Starter

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE student_grade IS NULL 
AND role = 'student';
```

### 8. Change Student's Grade

```sql
-- Change to any grade (starter, mid, or higher)
UPDATE users 
SET student_grade = 'mid'  -- Change this to desired grade
WHERE email = 'student@example.com' 
AND role = 'student';
```

### 9. Remove Grade Assignment (Student sees all content)

```sql
UPDATE users 
SET student_grade = NULL 
WHERE email = 'student@example.com' 
AND role = 'student';
```

## View Students by Category

### View All Starter Students

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

### View All Mid Students

```sql
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
```

### View All Higher Students

```sql
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
```

### View Students Without Grade

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

### View Summary of All Students by Category

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

## Important Notes

1. **You can add students at any time** - The system is dynamic and updates immediately
2. **Dashboard updates automatically** - When you change a student's grade, their dashboard will show the new grade immediately
3. **Students without grade** - Students without a `student_grade` will see all courses and questions (backward compatibility)
4. **Use email or UUID** - You can find students by email (easier) or by UUID if you know it
5. **Changes are immediate** - No need to restart the application, changes take effect right away

## Using Student ID Instead of Email

If you know the student's UUID, you can use:

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE id = 'student-uuid-here' 
AND role = 'student';
```

## Complete Management Script

For a complete set of SQL queries for managing students, see:
- `scripts/055-manage-student-grades.sql`

This script contains all the queries you need for managing student grades.

## Example Workflow

1. **New student registers** → Student account created without grade
2. **Admin assigns grade** → Run SQL to set `student_grade = 'starter'`
3. **Student sees Starter content** → Dashboard shows only Starter courses/questions
4. **Student progresses** → Admin updates grade to `'mid'` or `'higher'`
5. **Dashboard updates** → Student immediately sees content for their new grade

The system is designed to be flexible - you can change grades at any time!





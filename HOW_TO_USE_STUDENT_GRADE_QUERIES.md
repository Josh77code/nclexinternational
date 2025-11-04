# How to Use Student Grade Management Queries

## ⚠️ IMPORTANT: Run ONE Query at a Time!

The SQL script file contains many example queries. **Do NOT run the entire file at once!** Instead, copy and paste individual queries one at a time.

## Quick Start

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Copy ONE Query
Copy one of these queries:

**Add student to Starter category:**
```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student-email@example.com' 
AND role = 'student';
```

**Add student to Mid category:**
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'student-email@example.com' 
AND role = 'student';
```

**Add student to Higher category:**
```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'student-email@example.com' 
AND role = 'student';
```

### Step 3: Replace the Email
Replace `'student-email@example.com'` with the actual student's email address.

### Step 4: Run the Query
Click "Run" or press Ctrl+Enter (Cmd+Enter on Mac).

## Example: Add a Real Student

```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'john.doe@example.com' 
AND role = 'student';
```

## Common Operations

### 1. Add Single Student to Category
```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### 2. View All Students in a Category
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

### 3. Promote a Student
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'student@example.com'
AND role = 'student';
```

### 4. View All Students Without Grade
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

### 5. Count Students by Category
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

## Troubleshooting

### Error: "relation does not exist"
- Make sure you've run the migration script `054-add-student-grade-system.sql` first
- Check that the `student_grade` column exists in the `users` table

### Error: "syntax error"
- Make sure you're running ONE query at a time
- Check that you've replaced the example email with a real email
- Ensure all quotes are properly closed

### No rows updated
- Check that the email address is correct (case-sensitive in some databases)
- Verify the student exists in the `users` table
- Make sure the student's role is 'student'

### Query works but student doesn't see changes
- Changes take effect immediately
- Student may need to refresh their browser
- Check that the student is logged in

## Files Reference

- **Quick queries**: `scripts/QUICK_START_ADD_STUDENT.sql` - Simple queries to copy
- **Full reference**: `scripts/055-manage-student-grades.sql` - All available queries
- **Migration**: `scripts/054-add-student-grade-system.sql` - Run this first to set up the system

## Best Practices

1. **Always run one query at a time** - Don't run the entire script file
2. **Test with SELECT first** - Use SELECT queries to verify before UPDATE
3. **Backup first** - Always have a backup before bulk operations
4. **Use transactions** - For critical updates, wrap in BEGIN/COMMIT
5. **Verify results** - Always run a SELECT query after UPDATE to confirm

## Example Workflow

1. **Find student email:**
   ```sql
   SELECT email, full_name, student_grade 
   FROM users 
   WHERE role = 'student' 
   ORDER BY created_at DESC;
   ```

2. **Add student to category:**
   ```sql
   UPDATE users 
   SET student_grade = 'starter' 
   WHERE email = 'found-email@example.com' 
   AND role = 'student';
   ```

3. **Verify the change:**
   ```sql
   SELECT email, full_name, student_grade 
   FROM users 
   WHERE email = 'found-email@example.com';
   ```


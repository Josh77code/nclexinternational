# Quick Reference Card - Student Grade Management

## 🚀 Quick Start (3 Steps)

1. **Open Supabase SQL Editor**
2. **Copy ONE query below**
3. **Replace email and Run**

---

## 📝 Most Common Operations

### Add Student to Starter Category
```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### Add Student to Mid Category
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### Add Student to Higher Category
```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

---

## 👀 View Operations

### View All Starter Students
```sql
SELECT email, full_name, student_grade
FROM users 
WHERE student_grade = 'starter' 
AND role = 'student'
ORDER BY created_at DESC;
```

### View All Students Without Grade
```sql
SELECT email, full_name, student_grade
FROM users 
WHERE student_grade IS NULL 
AND role = 'student'
ORDER BY created_at DESC;
```

### Count Students by Category
```sql
SELECT 
  COALESCE(student_grade, 'Not Assigned') as grade,
  COUNT(*) as count
FROM users 
WHERE role = 'student'
GROUP BY student_grade;
```

---

## 🔄 Promote Operations

### Promote Starter → Mid
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'student@example.com'
AND role = 'student';
```

### Promote Mid → Higher
```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'mid' 
AND email = 'student@example.com'
AND role = 'student';
```

---

## ⚠️ Important Reminders

- ✅ Run ONE query at a time
- ✅ Replace `'student@example.com'` with actual email
- ✅ Always verify with SELECT after UPDATE
- ❌ Don't run the entire script file at once

---

## 📍 Find Student Email or ID

```sql
-- Find by email
SELECT id, email, full_name, student_grade
FROM users 
WHERE email = 'student@example.com';

-- List all students
SELECT id, email, full_name, student_grade, role
FROM users 
WHERE role = 'student'
ORDER BY created_at DESC;
```




## 🚀 Quick Start (3 Steps)

1. **Open Supabase SQL Editor**
2. **Copy ONE query below**
3. **Replace email and Run**

---

## 📝 Most Common Operations

### Add Student to Starter Category
```sql
UPDATE users 
SET student_grade = 'starter' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### Add Student to Mid Category
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

### Add Student to Higher Category
```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE email = 'student@example.com' 
AND role = 'student';
```

---

## 👀 View Operations

### View All Starter Students
```sql
SELECT email, full_name, student_grade
FROM users 
WHERE student_grade = 'starter' 
AND role = 'student'
ORDER BY created_at DESC;
```

### View All Students Without Grade
```sql
SELECT email, full_name, student_grade
FROM users 
WHERE student_grade IS NULL 
AND role = 'student'
ORDER BY created_at DESC;
```

### Count Students by Category
```sql
SELECT 
  COALESCE(student_grade, 'Not Assigned') as grade,
  COUNT(*) as count
FROM users 
WHERE role = 'student'
GROUP BY student_grade;
```

---

## 🔄 Promote Operations

### Promote Starter → Mid
```sql
UPDATE users 
SET student_grade = 'mid' 
WHERE student_grade = 'starter' 
AND email = 'student@example.com'
AND role = 'student';
```

### Promote Mid → Higher
```sql
UPDATE users 
SET student_grade = 'higher' 
WHERE student_grade = 'mid' 
AND email = 'student@example.com'
AND role = 'student';
```

---

## ⚠️ Important Reminders

- ✅ Run ONE query at a time
- ✅ Replace `'student@example.com'` with actual email
- ✅ Always verify with SELECT after UPDATE
- ❌ Don't run the entire script file at once

---

## 📍 Find Student Email or ID

```sql
-- Find by email
SELECT id, email, full_name, student_grade
FROM users 
WHERE email = 'student@example.com';

-- List all students
SELECT id, email, full_name, student_grade, role
FROM users 
WHERE role = 'student'
ORDER BY created_at DESC;
```





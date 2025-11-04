# Quick Start Checklist - Student Grade System

## ✅ Setup Complete!

Your migration script has run successfully. Here's what to do next:

---

## 📋 Immediate Next Steps

### 1. Assign Students to Categories (5 minutes)

```sql
-- View all students without grade
SELECT email, full_name, student_grade
FROM users 
WHERE student_grade IS NULL 
AND role = 'student';

-- Assign them to Starter category
UPDATE users 
SET student_grade = 'starter' 
WHERE student_grade IS NULL 
AND role = 'student';
```

**Or assign individually:**
```sql
UPDATE users 
SET student_grade = 'starter'  -- or 'mid', or 'higher'
WHERE email = 'student@example.com';
```

---

### 2. Create Your First Course with Grade (5 minutes)

**Using Dashboard:**
1. Go to `/dashboard/instructor/create-course`
2. Fill in course details
3. **Select "Student Grade"** dropdown:
   - Choose: Starter, Mid, or Higher
4. Add materials
5. Publish

**Or using SQL:**
```sql
UPDATE courses 
SET student_grade = 'starter' 
WHERE id = 'your-course-id';
```

---

### 3. Upload Questions with Grade (5 minutes)

**Using Dashboard:**
1. Go to `/dashboard/instructor/upload-questions`
2. **Select "Student Grade"** dropdown (required)
3. Select course (optional)
4. Upload CSV file
5. Click "Upload CSV"

---

### 4. Test the System (2 minutes)

1. Login as a student with a grade assigned
2. Check dashboard:
   - ✅ Grade badge shows
   - ✅ Only their grade's courses visible
   - ✅ Only their grade's questions visible

---

## 🎯 Priority Actions

- [ ] **Assign at least one student** to a grade category
- [ ] **Create at least one course** with a grade tag
- [ ] **Upload at least one question set** with a grade tag
- [ ] **Test login** as a student and verify dashboard

---

## 📝 Common Tasks

### Assign Student to Grade
```sql
UPDATE users SET student_grade = 'starter' WHERE email = 'student@example.com';
```

### View All Students
```sql
SELECT email, full_name, student_grade FROM users WHERE role = 'student';
```

### View Students by Grade
```sql
SELECT email, full_name FROM users WHERE student_grade = 'starter' AND role = 'student';
```

### Update Course Grade
```sql
UPDATE courses SET student_grade = 'starter' WHERE id = 'course-id';
```

---

## 🚀 You're Ready!

The system is set up and working. Just:
1. Assign students to grades
2. Tag courses with grades
3. Tag questions with grades
4. Test and verify!

**Everything is automated - students will see their grade on the dashboard and only their grade's content!** 🎉


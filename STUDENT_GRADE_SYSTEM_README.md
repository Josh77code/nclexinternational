# Student Grade System Implementation

## Overview

This document describes the student grade system that has been implemented to support three categories of students:
1. **Starter (Beginner)** - Entry-level students
2. **Mid (Intermediate)** - Intermediate-level students  
3. **Higher (Advanced)** - Advanced-level students

## Database Schema

A new SQL migration script has been created: `scripts/054-add-student-grade-system.sql`

### Changes Made:

1. **users table**: Added `student_grade` column (VARCHAR(20)) with CHECK constraint for values: 'starter', 'mid', 'higher'
2. **courses table**: Added `student_grade` column to tag courses for specific grade levels
3. **exam_questions table**: Added `student_grade` column to tag questions for specific grade levels

### Features:

- Students can be assigned to a grade category (starter, mid, or higher)
- Courses can be tagged with a grade level - students only see courses for their grade
- Questions can be tagged with a grade level - students only see questions for their grade
- Instructors and admins can see all courses and questions regardless of grade
- Backward compatible: Courses/questions without a grade are visible to all students

## Dashboard Updates

### Student Dashboard
- Displays the student's current grade category prominently
- Shows grade badge in the header dropdown menu
- Only displays courses and questions relevant to the student's grade

### Instructor Dashboard
- Course creation form now includes a required "Student Grade" dropdown
- Question upload form now includes a required "Student Grade" dropdown
- Instructors can specify which grade level each course/question is for

## How It Works

### For Students:
1. Students are assigned a grade when created in the database (manually by admin)
2. The dashboard automatically displays their grade
3. Students only see:
   - Courses tagged with their grade level
   - Courses with no grade specified (backward compatibility)
   - Questions tagged with their grade level
   - Questions with no grade specified (backward compatibility)

### For Instructors:
1. When creating a course, instructors must select a grade level:
   - Starter (Beginner)
   - Mid (Intermediate)
   - Higher (Advanced)
2. When uploading questions, instructors must select a grade level
3. Instructors can create different courses and questions for each grade level

### For Admins:
1. Admins can manually assign students to grade categories in the database
2. Admins can promote students from one grade to another by updating the `student_grade` field
3. Admins can see all courses and questions regardless of grade

## Database Migration

To apply the database changes, run the SQL migration script:

```sql
-- Run this script in your Supabase SQL editor
-- File: scripts/054-add-student-grade-system.sql
```

## Manual Student Assignment

To assign a student to a grade category, update the `users` table:

```sql
-- Example: Assign a student to "starter" grade
UPDATE users 
SET student_grade = 'starter' 
WHERE id = 'student-user-id-here';

-- Example: Promote a student from starter to mid
UPDATE users 
SET student_grade = 'mid' 
WHERE id = 'student-user-id-here' 
AND student_grade = 'starter';

-- Example: Promote a student to higher grade
UPDATE users 
SET student_grade = 'higher' 
WHERE id = 'student-user-id-here';
```

## Grade Values

The system uses these grade values:
- `'starter'` - Starter (Beginner)
- `'mid'` - Mid (Intermediate)
- `'higher'` - Higher (Advanced)

These values are enforced by database CHECK constraints.

## Row Level Security (RLS)

The RLS policies have been updated to:
- Filter courses by student grade automatically
- Filter questions by student grade automatically
- Allow instructors and admins to see all content
- Maintain backward compatibility for content without grade tags

## Next Steps

1. **Run the database migration** in your Supabase SQL editor
2. **Assign grades to existing students** using SQL UPDATE statements
3. **Create courses with grade tags** using the instructor dashboard
4. **Upload questions with grade tags** using the instructor question upload page

## Testing

To test the system:
1. Create test students with different grades
2. Create courses tagged with different grades
3. Upload questions tagged with different grades
4. Log in as each student and verify they only see their grade's content
5. Log in as an instructor and verify they can see all content

## Notes

- The system is designed to be dynamic - you can add new students to any grade category at any time
- Students can be promoted from one grade to another by updating their `student_grade` field
- The dashboard will automatically update to reflect the student's current grade
- All queries have been updated to filter by student grade where applicable




## Overview

This document describes the student grade system that has been implemented to support three categories of students:
1. **Starter (Beginner)** - Entry-level students
2. **Mid (Intermediate)** - Intermediate-level students  
3. **Higher (Advanced)** - Advanced-level students

## Database Schema

A new SQL migration script has been created: `scripts/054-add-student-grade-system.sql`

### Changes Made:

1. **users table**: Added `student_grade` column (VARCHAR(20)) with CHECK constraint for values: 'starter', 'mid', 'higher'
2. **courses table**: Added `student_grade` column to tag courses for specific grade levels
3. **exam_questions table**: Added `student_grade` column to tag questions for specific grade levels

### Features:

- Students can be assigned to a grade category (starter, mid, or higher)
- Courses can be tagged with a grade level - students only see courses for their grade
- Questions can be tagged with a grade level - students only see questions for their grade
- Instructors and admins can see all courses and questions regardless of grade
- Backward compatible: Courses/questions without a grade are visible to all students

## Dashboard Updates

### Student Dashboard
- Displays the student's current grade category prominently
- Shows grade badge in the header dropdown menu
- Only displays courses and questions relevant to the student's grade

### Instructor Dashboard
- Course creation form now includes a required "Student Grade" dropdown
- Question upload form now includes a required "Student Grade" dropdown
- Instructors can specify which grade level each course/question is for

## How It Works

### For Students:
1. Students are assigned a grade when created in the database (manually by admin)
2. The dashboard automatically displays their grade
3. Students only see:
   - Courses tagged with their grade level
   - Courses with no grade specified (backward compatibility)
   - Questions tagged with their grade level
   - Questions with no grade specified (backward compatibility)

### For Instructors:
1. When creating a course, instructors must select a grade level:
   - Starter (Beginner)
   - Mid (Intermediate)
   - Higher (Advanced)
2. When uploading questions, instructors must select a grade level
3. Instructors can create different courses and questions for each grade level

### For Admins:
1. Admins can manually assign students to grade categories in the database
2. Admins can promote students from one grade to another by updating the `student_grade` field
3. Admins can see all courses and questions regardless of grade

## Database Migration

To apply the database changes, run the SQL migration script:

```sql
-- Run this script in your Supabase SQL editor
-- File: scripts/054-add-student-grade-system.sql
```

## Manual Student Assignment

To assign a student to a grade category, update the `users` table:

```sql
-- Example: Assign a student to "starter" grade
UPDATE users 
SET student_grade = 'starter' 
WHERE id = 'student-user-id-here';

-- Example: Promote a student from starter to mid
UPDATE users 
SET student_grade = 'mid' 
WHERE id = 'student-user-id-here' 
AND student_grade = 'starter';

-- Example: Promote a student to higher grade
UPDATE users 
SET student_grade = 'higher' 
WHERE id = 'student-user-id-here';
```

## Grade Values

The system uses these grade values:
- `'starter'` - Starter (Beginner)
- `'mid'` - Mid (Intermediate)
- `'higher'` - Higher (Advanced)

These values are enforced by database CHECK constraints.

## Row Level Security (RLS)

The RLS policies have been updated to:
- Filter courses by student grade automatically
- Filter questions by student grade automatically
- Allow instructors and admins to see all content
- Maintain backward compatibility for content without grade tags

## Next Steps

1. **Run the database migration** in your Supabase SQL editor
2. **Assign grades to existing students** using SQL UPDATE statements
3. **Create courses with grade tags** using the instructor dashboard
4. **Upload questions with grade tags** using the instructor question upload page

## Testing

To test the system:
1. Create test students with different grades
2. Create courses tagged with different grades
3. Upload questions tagged with different grades
4. Log in as each student and verify they only see their grade's content
5. Log in as an instructor and verify they can see all content

## Notes

- The system is designed to be dynamic - you can add new students to any grade category at any time
- Students can be promoted from one grade to another by updating their `student_grade` field
- The dashboard will automatically update to reflect the student's current grade
- All queries have been updated to filter by student grade where applicable





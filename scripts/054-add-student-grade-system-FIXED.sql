-- Student Grade System Database Schema (FIXED VERSION)
-- This script adds student grade categories (Starter/Beginner, Mid/Intermediate, Higher/Advanced)
-- to support grade-based course and question filtering
-- FIXED: Handles existing policies gracefully

-- Step 1: Add student_grade column to users table (allows NULL for flexibility)
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS student_grade VARCHAR(20) CHECK (student_grade IN ('starter', 'mid', 'higher'));

-- Note: student_grade can be NULL to allow students without a grade assignment
-- This provides flexibility for adding students to categories at any time

-- Add comment to explain the column
COMMENT ON COLUMN users.student_grade IS 'Student grade category: starter (beginner), mid (intermediate), higher (advanced)';

-- Step 2: Add student_grade column to courses table
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS student_grade VARCHAR(20) CHECK (student_grade IN ('starter', 'mid', 'higher'));

-- Add comment to explain the column
COMMENT ON COLUMN courses.student_grade IS 'Course grade level: starter (beginner), mid (intermediate), higher (advanced). Students can only see courses for their grade.';

-- Step 3: Add student_grade column to exam_questions table
ALTER TABLE exam_questions 
ADD COLUMN IF NOT EXISTS student_grade VARCHAR(20) CHECK (student_grade IN ('starter', 'mid', 'higher'));

-- Add comment to explain the column
COMMENT ON COLUMN exam_questions.student_grade IS 'Question grade level: starter (beginner), mid (intermediate), higher (advanced). Students can only see questions for their grade.';

-- Step 4: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_student_grade ON users(student_grade);
CREATE INDEX IF NOT EXISTS idx_courses_student_grade ON courses(student_grade);
CREATE INDEX IF NOT EXISTS idx_exam_questions_student_grade ON exam_questions(student_grade);

-- Step 5: Update RLS policies to filter by student grade
-- Drop existing policies if they exist (we'll recreate them with grade filtering)
DROP POLICY IF EXISTS "Enrolled users can view courses" ON courses;
DROP POLICY IF EXISTS "Students can view courses for their grade" ON courses;
DROP POLICY IF EXISTS "Authenticated users can view questions" ON exam_questions;
DROP POLICY IF EXISTS "Students can view questions for their grade" ON exam_questions;

-- Create new policy for courses: Students can only view courses for their grade
CREATE POLICY "Students can view courses for their grade" ON courses
  FOR SELECT USING (
    -- If course has no grade specified, show to all (for backward compatibility)
    student_grade IS NULL 
    OR 
    -- If course has a grade, only show to students with matching grade
    (
      student_grade IS NOT NULL 
      AND EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.student_grade = courses.student_grade
      )
    )
    OR
    -- Instructors and admins can see all courses
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

-- Create new policy for questions: Students can only view questions for their grade
CREATE POLICY "Students can view questions for their grade" ON exam_questions
  FOR SELECT USING (
    -- If question has no grade specified, show to all (for backward compatibility)
    student_grade IS NULL 
    OR 
    -- If question has a grade, only show to students with matching grade
    (
      student_grade IS NOT NULL 
      AND EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.student_grade = exam_questions.student_grade
      )
    )
    OR
    -- Instructors and admins can see all questions
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

-- Step 6: Create a function to get student grade display name
CREATE OR REPLACE FUNCTION get_student_grade_display(grade VARCHAR(20))
RETURNS TEXT AS $$
BEGIN
  CASE grade
    WHEN 'starter' THEN RETURN 'Starter (Beginner)';
    WHEN 'mid' THEN RETURN 'Mid (Intermediate)';
    WHEN 'higher' THEN RETURN 'Higher (Advanced)';
    ELSE RETURN 'Not Assigned';
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Add helpful comments
COMMENT ON FUNCTION get_student_grade_display IS 'Returns the display name for a student grade category';

-- Verification queries (commented out - uncomment to run)
-- SELECT 'Student Grade System Schema Created Successfully!' as status;
-- SELECT COUNT(*) as users_with_grade FROM users WHERE student_grade IS NOT NULL;
-- SELECT COUNT(*) as courses_with_grade FROM courses WHERE student_grade IS NOT NULL;
-- SELECT COUNT(*) as questions_with_grade FROM exam_questions WHERE student_grade IS NOT NULL;


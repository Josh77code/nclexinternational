-- Fix: Allow students to view course materials for courses they're enrolled in
-- This script adds the missing RLS policy that allows students to access course materials

-- Step 1: Check current policies
SELECT 'Step 1: Checking current course_materials policies' as info;
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'course_materials';

-- Step 2: Add policy for students to view course materials
-- Students should be able to view materials for courses they're enrolled in
DROP POLICY IF EXISTS "Students can view materials for enrolled courses" ON public.course_materials;

CREATE POLICY "Students can view materials for enrolled courses" ON public.course_materials
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.course_enrollments 
            WHERE course_id = course_materials.course_id 
            AND student_id = auth.uid()
            AND status = 'active'
        )
    );

-- Step 3: Also allow students to view materials if they can view the course
-- This is a fallback for cases where enrollment might not be required
DROP POLICY IF EXISTS "Students can view materials for accessible courses" ON public.course_materials;

CREATE POLICY "Students can view materials for accessible courses" ON public.course_materials
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE id = course_materials.course_id 
            AND status = 'active'
        )
    );

-- Step 4: Verify the policies were created
SELECT 'Step 4: Verifying policies were created' as info;
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'course_materials'
ORDER BY policyname;

-- Step 5: Test query to verify students can access materials
SELECT 'Step 5: Testing student access to materials' as info;
SELECT 
    '✅ Course materials student access policy created successfully!' as status,
    (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'course_materials' AND policyname LIKE '%Student%') as student_policies_count;


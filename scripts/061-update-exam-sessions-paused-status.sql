-- Update exam_sessions table to allow 'paused' status
-- This script adds 'paused' as a valid status option for exam sessions

-- First, check current status values
SELECT DISTINCT status FROM exam_sessions;

-- Update the check constraint to include 'paused' status
ALTER TABLE exam_sessions 
DROP CONSTRAINT IF EXISTS exam_sessions_status_check;

ALTER TABLE exam_sessions 
ADD CONSTRAINT exam_sessions_status_check 
CHECK (status IN ('in_progress', 'completed', 'abandoned', 'paused'));

-- Verify the change
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'exam_sessions' 
  AND column_name = 'status';

-- Update any existing 'in_progress' sessions that might need to be marked as paused
-- (Optional - only run if you have specific sessions to update)
-- UPDATE exam_sessions SET status = 'paused' WHERE status = 'in_progress' AND ...;

SELECT 'Schema updated successfully! Exam sessions can now be paused.' as message;


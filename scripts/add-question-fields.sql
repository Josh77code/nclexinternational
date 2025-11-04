-- Add is_active and week_label columns to exam_questions table
-- This enables weekly question management

-- Add is_active column (default to true for existing questions)
ALTER TABLE exam_questions 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add week_label column for tracking weekly questions
ALTER TABLE exam_questions 
ADD COLUMN IF NOT EXISTS week_label VARCHAR(100);

-- Create index for better query performance on active questions
CREATE INDEX IF NOT EXISTS idx_exam_questions_is_active ON exam_questions(is_active);

-- Create index for week_label queries
CREATE INDEX IF NOT EXISTS idx_exam_questions_week_label ON exam_questions(week_label);

-- Ensure all existing questions are marked as active
UPDATE exam_questions 
SET is_active = true 
WHERE is_active IS NULL;


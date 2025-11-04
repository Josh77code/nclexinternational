-- Add course_id support and per-question time limit to exam system

-- Add course_id to exam_questions table
ALTER TABLE exam_questions 
ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES courses(id) ON DELETE SET NULL;

-- Add question_time_limit to exam_questions (time in seconds for each question)
ALTER TABLE exam_questions 
ADD COLUMN IF NOT EXISTS question_time_limit INTEGER DEFAULT 60 CHECK (question_time_limit > 0);

-- Add course_id to exam_sessions
ALTER TABLE exam_sessions 
ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES courses(id) ON DELETE SET NULL;

-- Add per-question timing fields to exam_answers
ALTER TABLE exam_answers 
ADD COLUMN IF NOT EXISTS question_started_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS question_time_remaining INTEGER DEFAULT NULL;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_exam_questions_course_id ON exam_questions(course_id);
CREATE INDEX IF NOT EXISTS idx_exam_questions_course_active ON exam_questions(course_id, is_active);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_course_id ON exam_sessions(course_id);
CREATE INDEX IF NOT EXISTS idx_exam_answers_started_at ON exam_answers(question_started_at);

-- Update existing questions to have default time limit of 60 seconds if NULL
UPDATE exam_questions 
SET question_time_limit = 60 
WHERE question_time_limit IS NULL;



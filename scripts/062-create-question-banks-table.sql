-- Create Question Banks/Collections Table
-- This script creates a table for organizing questions into collections/banks

-- Create question_banks table
CREATE TABLE IF NOT EXISTS question_banks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add bank_id column to exam_questions if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'exam_questions' AND column_name = 'bank_id'
    ) THEN
        ALTER TABLE exam_questions 
        ADD COLUMN bank_id UUID REFERENCES question_banks(id) ON DELETE SET NULL;
        
        -- Create index for better query performance
        CREATE INDEX IF NOT EXISTS idx_exam_questions_bank_id ON exam_questions(bank_id);
    END IF;
END $$;

-- Insert default question bank (if needed)
INSERT INTO question_banks (name, description, is_active)
VALUES ('Default Question Bank', 'Main collection of exam questions', TRUE)
ON CONFLICT DO NOTHING;

-- Enable RLS on question_banks
ALTER TABLE question_banks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for question_banks
-- Instructors can view all banks
CREATE POLICY "Instructors can view all question banks" ON question_banks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('instructor', 'admin')
        )
    );

-- Instructors can insert banks
CREATE POLICY "Instructors can insert question banks" ON question_banks
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('instructor', 'admin')
        )
    );

-- Instructors can update their own banks
CREATE POLICY "Instructors can update question banks" ON question_banks
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('instructor', 'admin')
        )
    );

-- Instructors can delete banks
CREATE POLICY "Instructors can delete question banks" ON question_banks
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('instructor', 'admin')
        )
    );

SELECT 'Question banks table created successfully!' as message;


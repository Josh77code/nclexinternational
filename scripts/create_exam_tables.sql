-- Exam System Database Schema
-- This script creates the necessary tables for the NCLEX exam system

-- Create exam_questions table
CREATE TABLE IF NOT EXISTS exam_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    explanation TEXT,
    category VARCHAR(100),
    difficulty_level VARCHAR(20) DEFAULT 'medium' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exam_sessions table
CREATE TABLE IF NOT EXISTS exam_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email VARCHAR(255) NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    time_taken INTEGER, -- in minutes
    total_questions INTEGER DEFAULT 100,
    correct_answers INTEGER DEFAULT 0,
    score_percentage DECIMAL(5,2),
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exam_answers table
CREATE TABLE IF NOT EXISTS exam_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
    question_id UUID REFERENCES exam_questions(id) ON DELETE CASCADE,
    user_answer CHAR(1) CHECK (user_answer IN ('A', 'B', 'C', 'D')),
    is_correct BOOLEAN,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id, question_id)
);

-- Create exam_results table for storing detailed results
CREATE TABLE IF NOT EXISTS exam_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email VARCHAR(255) NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    incorrect_answers INTEGER NOT NULL,
    score_percentage DECIMAL(5,2) NOT NULL,
    time_taken INTEGER NOT NULL, -- in minutes
    passed BOOLEAN NOT NULL, -- true if score >= 75%
    category_breakdown JSONB, -- detailed breakdown by category
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_exam_sessions_user_id ON exam_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_user_email ON exam_sessions(user_email);
CREATE INDEX IF NOT EXISTS idx_exam_answers_session_id ON exam_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_exam_answers_question_id ON exam_answers(question_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_user_id ON exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_user_email ON exam_results(user_email);

-- Enable Row Level Security (RLS)
ALTER TABLE exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own exam sessions and results
CREATE POLICY "Users can view their own exam sessions" ON exam_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exam sessions" ON exam_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exam sessions" ON exam_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own exam answers" ON exam_answers
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM exam_sessions WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own exam answers" ON exam_answers
    FOR INSERT WITH CHECK (
        session_id IN (
            SELECT id FROM exam_sessions WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view their own exam results" ON exam_results
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exam results" ON exam_results
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Questions are readable by all authenticated users
CREATE POLICY "Authenticated users can view questions" ON exam_questions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Insert sample NCLEX questions
INSERT INTO exam_questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, category, difficulty_level) VALUES
('A client is admitted to the hospital with a diagnosis of acute myocardial infarction (MI). The nurse should monitor the client for which of the following complications?', 'A. Pulmonary edema', 'B. Hyperglycemia', 'C. Hypothermia', 'D. Bradycardia', 'A', 'Pulmonary edema is a common complication of MI due to left ventricular dysfunction and increased pulmonary pressure.', 'Cardiovascular', 'medium'),
('The nurse is caring for a client with chronic obstructive pulmonary disease (COPD). Which position should the nurse encourage the client to assume to improve breathing?', 'A. Supine position', 'B. High Fowler''s position', 'C. Prone position', 'D. Side-lying position', 'B', 'High Fowler''s position (sitting upright at 90 degrees) helps improve lung expansion and reduces the work of breathing in clients with COPD.', 'Respiratory', 'easy'),
('A client with diabetes mellitus is experiencing hypoglycemia. The nurse should administer which of the following first?', 'A. Regular insulin', 'B. Glucagon', 'C. Oral glucose', 'D. Metformin', 'C', 'For conscious clients with hypoglycemia, oral glucose (15-20g) should be administered first. Glucagon is used for unconscious clients.', 'Endocrine', 'medium'),
('The nurse is preparing to administer a blood transfusion. Which action should the nurse take first?', 'A. Check the client''s vital signs', 'B. Verify the blood type and crossmatch', 'C. Start an IV with normal saline', 'D. Obtain informed consent', 'B', 'Verifying the blood type and crossmatch is the first priority to ensure compatibility and prevent transfusion reactions.', 'Hematology', 'hard'),
('A client with a fractured femur is at risk for which of the following complications?', 'A. Deep vein thrombosis', 'B. Hyperglycemia', 'C. Hypothermia', 'D. Bradycardia', 'A', 'Clients with fractures, especially of the lower extremities, are at high risk for DVT due to immobility and potential vessel damage.', 'Musculoskeletal', 'medium'),
('The nurse is caring for a client with a nasogastric tube. Which assessment finding indicates the tube is functioning correctly?', 'A. Absent bowel sounds', 'B. Gastric contents aspirated', 'C. Client reports nausea', 'D. Abdominal distension', 'B', 'The ability to aspirate gastric contents confirms the NG tube is in the stomach and functioning correctly.', 'Gastrointestinal', 'easy'),
('A client is receiving chemotherapy. The nurse should monitor for which of the following side effects?', 'A. Hypertension', 'B. Neutropenia', 'C. Hyperglycemia', 'D. Bradycardia', 'B', 'Neutropenia (low white blood cell count) is a common side effect of chemotherapy, increasing infection risk.', 'Oncology', 'medium'),
('The nurse is caring for a client with a urinary catheter. Which action is most important to prevent infection?', 'A. Empty the drainage bag daily', 'B. Keep the drainage bag below bladder level', 'C. Change the catheter weekly', 'D. Use sterile technique for insertion', 'D', 'Using sterile technique during insertion is the most important factor in preventing catheter-associated urinary tract infections.', 'Genitourinary', 'easy'),
('A client with heart failure is prescribed furosemide (Lasix). The nurse should monitor for which electrolyte imbalance?', 'A. Hypernatremia', 'B. Hypokalemia', 'C. Hypercalcemia', 'D. Hypermagnesemia', 'B', 'Furosemide is a loop diuretic that causes potassium loss, leading to hypokalemia. Potassium levels should be monitored.', 'Cardiovascular', 'medium'),
('The nurse is preparing a client for surgery. Which action should be taken to prevent surgical site infection?', 'A. Administer prophylactic antibiotics', 'B. Shave the surgical site', 'C. Apply topical antiseptic', 'D. All of the above', 'D', 'All actions are important: prophylactic antibiotics, proper skin preparation, and antiseptic application help prevent surgical site infections.', 'Perioperative', 'hard');

-- Add more sample questions to reach 100 (this is just a start)
-- In a real implementation, you would add 90 more questions covering various NCLEX topics

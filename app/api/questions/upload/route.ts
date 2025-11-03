import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Papa from 'papaparse'

type CsvRow = {
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation?: string
  category?: string
  difficulty_level?: string
  published_at?: string
  week_label?: string
  is_active?: string | boolean
  course_id?: string
  question_time_limit?: string
}

export const runtime = 'nodejs'

export async function POST(req: Request) {
  // Optional simple auth: require header X-Upload-Token to match env UPLOAD_TOKEN
  const token = req.headers.get('x-upload-token')
  const expected = process.env.UPLOAD_TOKEN
  if (expected && token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const deactivatePrevious = formData.get('deactivate_previous') === 'true'
  const weekLabel = formData.get('week_label') as string | null
  const courseId = formData.get('course_id') as string | null
  const questionTimeLimit = formData.get('question_time_limit') as string | null
  
  if (!file) {
    return NextResponse.json({ error: 'Missing CSV file' }, { status: 400 })
  }

  const text = await file.text()
  const parsed = Papa.parse<CsvRow>(text, { 
    header: true, 
    skipEmptyLines: 'greedy',
    transformHeader: (header: string) => header.trim(),
    transform: (value: string) => value.trim(),
    // Handle field mismatches gracefully - ignore extra fields
    dynamicTyping: false,
    worker: false
  })
  
  // Filter out non-critical errors (warnings about extra fields are okay)
  const criticalErrors = parsed.errors.filter(error => 
    error.type !== 'FieldMismatch' && error.code !== 'TooManyFields'
  )
  
  if (criticalErrors.length > 0) {
    return NextResponse.json({ error: 'CSV parse error', details: criticalErrors }, { status: 400 })
  }

  const rows = parsed.data
  const errors: Array<{ index: number; message: string }> = []
  const toInsert: any[] = []

  const validAnswer = (v: string) => ['A','B','C','D'].includes((v || '').trim().toUpperCase())

  rows.forEach((row, i) => {
    const q = (row.question_text || '').trim()
    const a = (row.option_a || '').trim()
    const b = (row.option_b || '').trim()
    const c = (row.option_c || '').trim()
    const d = (row.option_d || '').trim()
    const ca = (row.correct_answer || '').trim().toUpperCase()
    if (!q || !a || !b || !c || !d || !validAnswer(ca)) {
      errors.push({ index: i, message: 'Missing fields or invalid correct_answer' })
      return
    }
    const difficulty = (row.difficulty_level || 'medium').toLowerCase()
    if (!['easy','medium','hard'].includes(difficulty)) {
      errors.push({ index: i, message: 'Invalid difficulty_level' })
      return
    }
    // Handle week_label and is_active - use form data week_label or row week_label
    const questionWeekLabel = weekLabel || row.week_label?.trim() || null
    const isActive = row.is_active !== undefined 
      ? (typeof row.is_active === 'string' 
          ? row.is_active.toLowerCase() === 'true' || row.is_active === '1'
          : Boolean(row.is_active))
      : true // Default to active if not specified
    
    // Handle course_id and question_time_limit
    const rowCourseId = courseId || row.course_id?.trim() || null
    const timeLimit = questionTimeLimit || row.question_time_limit?.trim() || '60'
    const parsedTimeLimit = parseInt(timeLimit, 10)
    const finalTimeLimit = isNaN(parsedTimeLimit) ? 60 : parsedTimeLimit
    
    toInsert.push({
      question_text: q,
      option_a: a,
      option_b: b,
      option_c: c,
      option_d: d,
      correct_answer: ca,
      explanation: row.explanation?.trim() || null,
      category: row.category?.trim() || null,
      difficulty_level: difficulty,
      week_label: questionWeekLabel,
      is_active: isActive,
      course_id: rowCourseId,
      question_time_limit: finalTimeLimit,
    })
  })

  if (!toInsert.length) {
    return NextResponse.json({ error: 'No valid rows to insert', errors }, { status: 400 })
  }

  // Inform if less than 100 questions for a course exam
  if (courseId && toInsert.length < 100) {
    console.warn(`Warning: Only ${toInsert.length} questions uploaded for course. Recommended: 100+ questions for a complete exam.`)
  }

  try {
    const admin = createAdminClient()
    
    // If deactivate_previous is true, deactivate all currently active questions for this course
    if (deactivatePrevious && courseId) {
      const { error: deactivateError } = await admin
        .from('exam_questions')
        .update({ is_active: false })
        .eq('is_active', true)
        .eq('course_id', courseId)
      
      if (deactivateError) {
        console.error('Error deactivating previous questions:', deactivateError)
        // Continue anyway - this is not critical
      }
    }
    
    // Batch insert in chunks of 500
    const chunkSize = 500
    for (let i = 0; i < toInsert.length; i += chunkSize) {
      const chunk = toInsert.slice(i, i + chunkSize)
      const { error } = await admin.from('exam_questions').insert(chunk)
      if (error) {
        return NextResponse.json({ error: error.message, at: i }, { status: 500 })
      }
    }
    
    const response: any = { 
      inserted: toInsert.length, 
      invalid: errors,
      deactivated_previous: deactivatePrevious
    }
    
    if (weekLabel) {
      response.week_label = weekLabel
    }
    
    return NextResponse.json(response)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}



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
  if (!file) {
    return NextResponse.json({ error: 'Missing CSV file' }, { status: 400 })
  }

  const text = await file.text()
  const parsed = Papa.parse<CsvRow>(text, { header: true, skipEmptyLines: true })
  if (parsed.errors.length) {
    return NextResponse.json({ error: 'CSV parse error', details: parsed.errors }, { status: 400 })
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
    })
  })

  if (!toInsert.length) {
    return NextResponse.json({ error: 'No valid rows to insert', errors }, { status: 400 })
  }

  try {
    const admin = createAdminClient()
    // Batch insert in chunks of 500
    const chunkSize = 500
    for (let i = 0; i < toInsert.length; i += chunkSize) {
      const chunk = toInsert.slice(i, i + chunkSize)
      const { error } = await admin.from('exam_questions').insert(chunk)
      if (error) {
        return NextResponse.json({ error: error.message, at: i }, { status: 500 })
      }
    }
    return NextResponse.json({ inserted: toInsert.length, invalid: errors })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}



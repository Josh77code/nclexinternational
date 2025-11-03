'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function UploadQuestionsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [deactivatePrevious, setDeactivatePrevious] = useState(true)
  const [weekLabel, setWeekLabel] = useState('')
  const [courses, setCourses] = useState<any[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState<string>('')
  const [questionTimeLimit, setQuestionTimeLimit] = useState<string>('60')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .eq('status', 'active')
        .order('title')
      
      if (error) {
        console.error('Error loading courses:', error)
      } else {
        setCourses(data || [])
      }
    } catch (error) {
      console.error('Error loading courses:', error)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f)
  }

  const onSubmit = async () => {
    if (!file) return
    setIsUploading(true)
    setResult(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('deactivate_previous', deactivatePrevious.toString())
      if (weekLabel.trim()) {
        fd.append('week_label', weekLabel.trim())
      }
      if (selectedCourseId) {
        fd.append('course_id', selectedCourseId)
      }
      if (questionTimeLimit) {
        fd.append('question_time_limit', questionTimeLimit)
      }
      
      // Get upload token if configured (optional security)
      const uploadToken = process.env.NEXT_PUBLIC_UPLOAD_TOKEN
      const headers: HeadersInit = {}
      if (uploadToken) {
        headers['x-upload-token'] = uploadToken
      }
      
      const res = await fetch('/api/questions/upload', {
        method: 'POST',
        headers,
        body: fd,
      })
      const data = await res.json()
      setResult({ ok: res.ok, data })
    } catch (error: any) {
      setResult({ ok: false, data: { error: error?.message || 'Upload failed' } })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="border-2 border-[#3895D3]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#072F5F]">Upload Weekly Questions (CSV)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-blue-900">How Weekly Uploads Work:</p>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li><strong>Recommended: 100+ questions</strong> per course exam for best results</li>
                  <li>Upload your CSV file with questions for the week</li>
                  <li>New questions are automatically marked as <strong>active</strong> (visible to students)</li>
                  <li>Check "Deactivate Previous Questions" to hide last week's questions when uploading new ones</li>
                  <li>Only <strong>active</strong> questions appear in student exams</li>
                  <li>Old questions are kept in the database (not deleted) for history</li>
                  <li><strong>Weekly Workflow:</strong> This week upload → Next week deactivate previous → Upload new</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>Required CSV columns:</strong> question_text, option_a, option_b, option_c, option_d, correct_answer (A/B/C/D)
                  <br />
                  <strong>Optional columns:</strong> explanation, category, difficulty_level (easy/medium/hard), week_label, is_active, course_id, question_time_limit
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course-select" className="text-sm font-medium text-gray-700">
                  Course (Optional):
                </Label>
                <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                  <SelectTrigger id="course-select" className="w-full">
                    <SelectValue placeholder="Select a course (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No specific course</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Associate these questions with a specific course</p>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="time-limit" className="text-sm font-medium text-gray-700">
                  Question Time Limit (seconds):
                </Label>
                <Input
                  id="time-limit"
                  type="number"
                  placeholder="60"
                  value={questionTimeLimit}
                  onChange={(e) => setQuestionTimeLimit(e.target.value)}
                  className="max-w-xs"
                  min="30"
                  max="300"
                />
                <p className="text-xs text-gray-500">Time allowed per question (default: 60 seconds, range: 30-300)</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Input type="file" accept=".csv" onChange={onChange} className="flex-1" />
                <Button onClick={() => window.open('/questions-template.csv', '_blank')} variant="outline" className="border-2 border-[#3895D3] text-[#3895D3]">
                  Download Template
                </Button>
              </div>
              
              <div className="space-y-3 border-t pt-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="deactivate"
                    checked={deactivatePrevious}
                    onChange={(e) => setDeactivatePrevious(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="deactivate" className="text-sm text-gray-700 cursor-pointer">
                    <strong>Deactivate Previous Questions</strong> - Hide all existing questions and show only these new ones
                  </label>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="week" className="text-sm font-medium text-gray-700">
                    Week Label (Optional):
                  </label>
                  <Input
                    id="week"
                    type="text"
                    placeholder="e.g., Week 1, Week of Jan 15, etc."
                    value={weekLabel}
                    onChange={(e) => setWeekLabel(e.target.value)}
                    className="max-w-xs"
                  />
                  <p className="text-xs text-gray-500">Label these questions for tracking (e.g., "Week 1", "January 2024")</p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button disabled={!file || isUploading} onClick={onSubmit} className="bg-[#3895D3] hover:bg-[#1261A0]">
                  {isUploading ? 'Uploading...' : 'Upload CSV'}
                </Button>
              </div>
              {result && (
                <div className={`mt-4 p-3 rounded border ${result.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result.data, null, 2)}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}



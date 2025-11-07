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
  const [selectedCourseId, setSelectedCourseId] = useState<string>('none')
  const [questionTimeLimit, setQuestionTimeLimit] = useState<string>('60')
  const [selectedGrade, setSelectedGrade] = useState<string>('')
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
      if (selectedCourseId && selectedCourseId !== 'none') {
        fd.append('course_id', selectedCourseId)
      }
      if (questionTimeLimit) {
        fd.append('question_time_limit', questionTimeLimit)
      }
      if (selectedGrade && ['starter', 'mid', 'higher'].includes(selectedGrade)) {
        fd.append('student_grade', selectedGrade)
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
                <p className="font-semibold text-blue-900">How Course-Based Question Uploads Work:</p>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li><strong>Each course can have its own questions:</strong> Select the course before uploading</li>
                  <li><strong>Recommended: 100+ questions</strong> per course exam for best results</li>
                  <li>Upload different question sets for each of the 5 courses separately</li>
                  <li>New questions are automatically marked as <strong>active</strong> (visible to students)</li>
                  <li>Check "Deactivate Previous Questions" to hide last week's questions for that specific course</li>
                  <li>Only <strong>active</strong> questions appear in student exams</li>
                  <li>Each course maintains its own question history</li>
                  <li><strong>Weekly Workflow:</strong> Upload for Course 1 → Deactivate previous → Upload new for Course 1, then repeat for Course 2, etc.</li>
                  <li><strong>Multi-Course Support:</strong> Students can see and select from all 5 courses with their respective questions</li>
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
                  Course: <span className="text-red-600">*Required for course-specific questions</span>
                </Label>
                <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                  <SelectTrigger id="course-select" className="w-full border-2 border-[#3895D3]">
                    <SelectValue placeholder="Select a course (required for 5 courses setup)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">General Questions (No specific course)</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800 font-semibold">
                    <strong>⚠️ IMPORTANT for 5 Courses Setup:</strong>
                  </p>
                  <ul className="text-xs text-yellow-700 mt-1 space-y-1 list-disc list-inside">
                    <li>Select the course BEFORE uploading questions</li>
                    <li>Upload different question sets for each of the 5 courses separately</li>
                    <li>Students will see and select exams by course name</li>
                    <li>Each course maintains its own question history</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="student-grade" className="text-sm font-medium text-gray-700">
                  Student Grade (Required):
                </Label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger id="student-grade" className="w-full border-2 border-[#3895D3]">
                    <SelectValue placeholder="Select grade level for these questions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter (Beginner)</SelectItem>
                    <SelectItem value="mid">Mid (Intermediate)</SelectItem>
                    <SelectItem value="higher">Higher (Advanced)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Students will only see questions for their grade level. This is required.</p>
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
                <Button disabled={!file || isUploading || !selectedGrade} onClick={onSubmit} className="bg-[#3895D3] hover:bg-[#1261A0]">
                  {isUploading ? 'Uploading...' : 'Upload CSV'}
                </Button>
              </div>
              {!selectedGrade && (
                <p className="text-sm text-red-600">Please select a student grade level before uploading.</p>
              )}
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
                <p className="font-semibold text-blue-900">How Course-Based Question Uploads Work:</p>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li><strong>Each course can have its own questions:</strong> Select the course before uploading</li>
                  <li><strong>Recommended: 100+ questions</strong> per course exam for best results</li>
                  <li>Upload different question sets for each of the 5 courses separately</li>
                  <li>New questions are automatically marked as <strong>active</strong> (visible to students)</li>
                  <li>Check "Deactivate Previous Questions" to hide last week's questions for that specific course</li>
                  <li>Only <strong>active</strong> questions appear in student exams</li>
                  <li>Each course maintains its own question history</li>
                  <li><strong>Weekly Workflow:</strong> Upload for Course 1 → Deactivate previous → Upload new for Course 1, then repeat for Course 2, etc.</li>
                  <li><strong>Multi-Course Support:</strong> Students can see and select from all 5 courses with their respective questions</li>
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
                  Course: <span className="text-red-600">*Required for course-specific questions</span>
                </Label>
                <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                  <SelectTrigger id="course-select" className="w-full border-2 border-[#3895D3]">
                    <SelectValue placeholder="Select a course (required for 5 courses setup)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">General Questions (No specific course)</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800 font-semibold">
                    <strong>⚠️ IMPORTANT for 5 Courses Setup:</strong>
                  </p>
                  <ul className="text-xs text-yellow-700 mt-1 space-y-1 list-disc list-inside">
                    <li>Select the course BEFORE uploading questions</li>
                    <li>Upload different question sets for each of the 5 courses separately</li>
                    <li>Students will see and select exams by course name</li>
                    <li>Each course maintains its own question history</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="student-grade" className="text-sm font-medium text-gray-700">
                  Student Grade (Required):
                </Label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger id="student-grade" className="w-full border-2 border-[#3895D3]">
                    <SelectValue placeholder="Select grade level for these questions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter (Beginner)</SelectItem>
                    <SelectItem value="mid">Mid (Intermediate)</SelectItem>
                    <SelectItem value="higher">Higher (Advanced)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Students will only see questions for their grade level. This is required.</p>
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
                <Button disabled={!file || isUploading || !selectedGrade} onClick={onSubmit} className="bg-[#3895D3] hover:bg-[#1261A0]">
                  {isUploading ? 'Uploading...' : 'Upload CSV'}
                </Button>
              </div>
              {!selectedGrade && (
                <p className="text-sm text-red-600">Please select a student grade level before uploading.</p>
              )}
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



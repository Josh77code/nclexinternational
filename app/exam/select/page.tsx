'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Course {
  id: string
  title: string
  description: string
  question_count: number
  avg_time_per_question: number
}

export default function ExamSelectPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    loadAvailableExams()
  }, [])

  const loadAvailableExams = async () => {
    try {
      setIsLoading(true)
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Get user's grade if student
      const { data: userData } = await supabase
        .from('users')
        .select('student_grade, role')
        .eq('id', user.id)
        .single()
      
      const userGrade = userData?.role === 'student' ? userData?.student_grade : null

      // Fetch courses with their question counts - filter by student grade if student
      let coursesQuery = supabase
        .from('courses')
        .select('id, title, description, status')
        .eq('status', 'active')
      
      if (userGrade) {
        coursesQuery = coursesQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
      }
      
      const { data: coursesData, error: coursesError } = await coursesQuery

      if (coursesError) {
        console.error('Error loading courses:', coursesError)
        setIsLoading(false)
        return
      }

      // For each course, count available questions
      const coursesWithCounts = await Promise.all(
        (coursesData || []).map(async (course) => {
          // Try with is_active filter first - also filter by student grade
          let query = supabase
            .from('exam_questions')
            .select('*, question_time_limit', { count: 'exact', head: true })
            .eq('course_id', course.id)
            .eq('is_active', true)
          
          // Filter by student grade if user is a student with a grade
          if (userGrade) {
            query = query.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
          }

          let { count, error: countError } = await query

          // If error (likely is_active column doesn't exist), try without it
          if (countError) {
            console.warn('Error with is_active filter, trying without:', countError)
            query = supabase
              .from('exam_questions')
              .select('*, question_time_limit', { count: 'exact', head: true })
              .eq('course_id', course.id)
            
            // Filter by student grade if user is a student with a grade
            if (userGrade) {
              query = query.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
            }
            
            const retryResult = await query
            count = retryResult.count
            countError = retryResult.error
          }

          if (countError) {
            console.error('Error counting questions for course:', course.id, countError)
            return null
          }

          // Skip courses with no questions
          if (!count || count === 0) {
            return null
          }

          // Get average time limit for questions in this course - filter by grade
          let timeQuery = supabase
            .from('exam_questions')
            .select('question_time_limit')
            .eq('course_id', course.id)
            .eq('is_active', true)
            .limit(100)
          
          // Filter by student grade if user is a student with a grade
          if (userGrade) {
            timeQuery = timeQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
          }

          let { data: timeData, error: timeError } = await timeQuery

          // If error, try without is_active filter
          if (timeError) {
            timeQuery = supabase
              .from('exam_questions')
              .select('question_time_limit')
              .eq('course_id', course.id)
              .limit(100)
            
            // Filter by student grade if user is a student with a grade
            if (userGrade) {
              timeQuery = timeQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
            }
            
            const retryTime = await timeQuery
            timeData = retryTime.data
          }

          const avgTime = timeData && timeData.length > 0
            ? Math.round(timeData.reduce((sum, q) => sum + (q.question_time_limit || 60), 0) / timeData.length)
            : 60

          return {
            id: course.id,
            title: course.title,
            description: course.description || 'NCLEX practice questions',
            question_count: count || 0,
            avg_time_per_question: avgTime
          }
        })
      )
      
      // Filter out null entries (courses with no questions)
      const validCourses = coursesWithCounts.filter(c => c !== null) as Course[]

      // Also add a general exam option if there are questions without a course - filter by grade
      let generalQuery = supabase
        .from('exam_questions')
        .select('*', { count: 'exact', head: true })
        .is('course_id', null)
        .eq('is_active', true)
      
      // Filter by student grade if user is a student with a grade
      if (userGrade) {
        generalQuery = generalQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
      }

      let { count: generalCount, error: generalError } = await generalQuery

      // If error, try without is_active filter
      if (generalError) {
        console.warn('Error with is_active filter for general questions, trying without:', generalError)
        generalQuery = supabase
          .from('exam_questions')
          .select('*', { count: 'exact', head: true })
          .is('course_id', null)
        
        // Filter by student grade if user is a student with a grade
        if (userGrade) {
          generalQuery = generalQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
        }
        
        const retryGeneral = await generalQuery
        generalCount = retryGeneral.count
        generalError = retryGeneral.error
      }

      if (generalCount && generalCount > 0) {
        let generalTimeQuery = supabase
          .from('exam_questions')
          .select('question_time_limit')
          .is('course_id', null)
          .eq('is_active', true)
          .limit(100)
        
        // Filter by student grade if user is a student with a grade
        if (userGrade) {
          generalTimeQuery = generalTimeQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
        }

        let { data: timeData, error: timeError } = await generalTimeQuery

        // If error, try without is_active filter
        if (timeError) {
          generalTimeQuery = supabase
            .from('exam_questions')
            .select('question_time_limit')
            .is('course_id', null)
            .limit(100)
          
          // Filter by student grade if user is a student with a grade
          if (userGrade) {
            generalTimeQuery = generalTimeQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
          }
          
          const retryTime = await generalTimeQuery
          timeData = retryTime.data
        }

        const avgTime = timeData && timeData.length > 0
          ? Math.round(timeData.reduce((sum, q) => sum + (q.question_time_limit || 60), 0) / timeData.length)
          : 60

        validCourses.unshift({
          id: 'general',
          title: 'General NCLEX Practice',
          description: 'Mixed practice questions from all categories',
          question_count: generalCount,
          avg_time_per_question: avgTime
        })
      }

      console.log('Found valid courses with questions:', validCourses)
      console.log('Total courses found:', validCourses.length)
      
      setCourses(validCourses)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading exams:', error)
      setIsLoading(false)
    }
  }

  const handleStartExam = async (courseId: string) => {
    // Navigate to exam page with course ID
    router.push(`/exam?courseId=${courseId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3895D3] mx-auto mb-4"></div>
          <p className="text-lg text-[#072F5F]">Loading available exams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#3895D3]/5 to-background">
      <Header />
      
      <main className="pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#072F5F] mb-2">Available Exams</h1>
            <p className="text-lg text-gray-600">Choose an exam to begin practicing for your NCLEX</p>
          </div>

          {courses.length === 0 ? (
            <Card className="border-2 border-[#3895D3]">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-[#072F5F] mb-2">No Exams Available</h2>
                <p className="text-gray-600 mb-4">There are currently no active exams available. Please check back later.</p>
                <Button onClick={() => router.push('/dashboard')} className="bg-[#3895D3] hover:bg-[#1261A0]">
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-2 border-[#3895D3] hover:border-[#1261A0] transition-all hover:shadow-xl bg-white">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-[#072F5F] mb-2">{course.title}</CardTitle>
                        <CardDescription className="text-gray-600">
                          {course.description}
                        </CardDescription>
                      </div>
                      <BookOpen className="w-8 h-8 text-[#3895D3]" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-[#3895D3] text-white text-sm px-3 py-1">
                        {course.question_count} Questions
                      </Badge>
                      <Badge variant="outline" className="border-[#1261A0] text-[#1261A0] text-sm px-3 py-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.avg_time_per_question}s per question
                      </Badge>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm text-gray-600 mb-4">
                        Total estimated time: ~{Math.round(course.question_count * course.avg_time_per_question / 60)} minutes
                      </p>
                      <Button 
                        onClick={() => handleStartExam(course.id)}
                        className="w-full bg-[#3895D3] hover:bg-[#1261A0] text-white font-semibold"
                      >
                        Start Exam
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Clock, 
  Target, 
  Award, 
  TrendingUp,
  Play,
  CheckCircle,
  AlertCircle,
  ListChecks
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ExamResult {
  id: string
  score_percentage: number
  passed: boolean
  completed_at: string
  total_questions: number
  correct_answers: number
  time_taken: number
}

interface AvailableExam {
  id: string
  title: string
  description: string
  question_count: number
  avg_time_per_question: number
}

export function ExamSection() {
  const router = useRouter()
  const [examResults, setExamResults] = useState<ExamResult[]>([])
  const [availableExams, setAvailableExams] = useState<AvailableExam[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingExams, setIsLoadingExams] = useState(true)
  const [hasAttempted, setHasAttempted] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchExamResults()
    fetchAvailableExams()
  }, [])

  const fetchExamResults = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data: results, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Error fetching exam results:', error)
        return
      }

      setExamResults(results || [])
      setHasAttempted((results || []).length > 0)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching exam results:', error)
      setIsLoading(false)
    }
  }

  const getLatestResult = () => {
    return examResults.length > 0 ? examResults[0] : null
  }

  const getBestResult = () => {
    return examResults.reduce((best, current) => 
      current.score_percentage > best.score_percentage ? current : best, 
      examResults[0]
    )
  }

  const fetchAvailableExams = async () => {
    try {
      setIsLoadingExams(true)
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      // Fetch courses with their question counts
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('id, title, description, status')
        .eq('status', 'active')

      if (coursesError) {
        console.error('Error loading courses:', coursesError)
        setIsLoadingExams(false)
        return
      }

      // For each course, count available questions
      const coursesWithCounts = await Promise.all(
        (coursesData || []).map(async (course) => {
          // Try with is_active filter first
          let query = supabase
            .from('exam_questions')
            .select('*, question_time_limit', { count: 'exact', head: true })
            .eq('course_id', course.id)
            .eq('is_active', true)

          let { count, error: countError } = await query

          // If error (likely is_active column doesn't exist), try without it
          if (countError) {
            query = supabase
              .from('exam_questions')
              .select('*, question_time_limit', { count: 'exact', head: true })
              .eq('course_id', course.id)
            
            const retryResult = await query
            count = retryResult.count
            countError = retryResult.error
          }

          if (countError || !count || count === 0) {
            return null
          }

          // Get average time limit
          let timeQuery = supabase
            .from('exam_questions')
            .select('question_time_limit')
            .eq('course_id', course.id)
            .eq('is_active', true)
            .limit(100)

          let { data: timeData, error: timeError } = await timeQuery

          if (timeError) {
            timeQuery = supabase
              .from('exam_questions')
              .select('question_time_limit')
              .eq('course_id', course.id)
              .limit(100)
            
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

      // Filter out null entries
      const validCourses = coursesWithCounts.filter(c => c !== null) as AvailableExam[]

      // Also add general exam if questions exist without course
      let generalQuery = supabase
        .from('exam_questions')
        .select('*', { count: 'exact', head: true })
        .is('course_id', null)
        .eq('is_active', true)

      let { count: generalCount, error: generalError } = await generalQuery

      if (generalError) {
        generalQuery = supabase
          .from('exam_questions')
          .select('*', { count: 'exact', head: true })
          .is('course_id', null)
        
        const retryGeneral = await generalQuery
        generalCount = retryGeneral.count
      }

      if (generalCount && generalCount > 0) {
        let generalTimeQuery = supabase
          .from('exam_questions')
          .select('question_time_limit')
          .is('course_id', null)
          .eq('is_active', true)
          .limit(100)

        let { data: timeData, error: timeError } = await generalTimeQuery

        if (timeError) {
          generalTimeQuery = supabase
            .from('exam_questions')
            .select('question_time_limit')
            .is('course_id', null)
            .limit(100)
          
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

      console.log('Available exams found:', validCourses)
      setAvailableExams(validCourses)
      setIsLoadingExams(false)
    } catch (error) {
      console.error('Error loading available exams:', error)
      setIsLoadingExams(false)
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return "Outstanding!"
    if (score >= 80) return "Excellent!"
    if (score >= 75) return "Good job!"
    if (score >= 70) return "Close!"
    return "Keep studying!"
  }

  if (isLoading) {
    return (
      <Card className="border-2 border-[#3895D3] bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#072F5F]">Practice Exam</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3895D3]"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Available Exams Section */}
      <Card className="border-2 border-[#3895D3] bg-white hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-[#072F5F] flex items-center gap-2">
              <ListChecks className="h-6 w-6 text-[#3895D3]" />
              Available Exams
            </CardTitle>
            <Badge className="bg-[#3895D3] text-white">
              {availableExams.length} {availableExams.length === 1 ? 'Exam' : 'Exams'}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          {isLoadingExams ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3895D3]"></div>
            </div>
          ) : availableExams.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No exams available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableExams.map((exam) => (
                <Card key={exam.id} className="border border-gray-200 hover:border-[#3895D3] transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#072F5F] mb-1">{exam.title}</h3>
                        <p className="text-sm text-gray-600">{exam.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <Badge className="bg-[#3895D3] text-white">
                        {exam.question_count} Questions
                      </Badge>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-3 w-3" />
                        {exam.avg_time_per_question}s/question
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => router.push(`/exam?courseId=${exam.id}`)}
                      className="w-full bg-[#3895D3] hover:bg-[#1261A0] text-white"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Exam
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exam Results Section */}
      <Card className="border-2 border-[#3895D3] bg-white hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-[#072F5F] flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-[#3895D3]" />
              Exam Results
            </CardTitle>
            <Badge className="bg-[#3895D3] text-white">
              {hasAttempted ? 'Available' : 'New'}
            </Badge>
          </div>
        </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Exam Description */}
        <div className="space-y-3">
          <p className="text-gray-600">
            Take our comprehensive NCLEX practice exam with 100 questions covering all major topics.
            Get immediate results and detailed feedback to improve your performance.
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>2 hours time limit</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>100 questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Immediate results</span>
            </div>
          </div>
        </div>

        {/* Latest Result Display */}
        {hasAttempted && getLatestResult() && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-[#072F5F]">Latest Attempt</h4>
              <Badge className={`${
                getLatestResult()?.passed 
                  ? 'bg-green-100 text-green-800 border-green-300' 
                  : 'bg-red-100 text-red-800 border-red-300'
              }`}>
                {getLatestResult()?.passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#072F5F]">
                  {getLatestResult()?.score_percentage.toFixed(1)}%
                </div>
                <div className="text-gray-600">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#072F5F]">
                  {getLatestResult()?.correct_answers}/{getLatestResult()?.total_questions}
                </div>
                <div className="text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#072F5F]">
                  {formatTime(getLatestResult()?.time_taken || 0)}
                </div>
                <div className="text-gray-600">Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#072F5F]">
                  {getPerformanceMessage(getLatestResult()?.score_percentage || 0)}
                </div>
                <div className="text-gray-600">Performance</div>
              </div>
            </div>
          </div>
        )}

        {/* Best Result Display */}
        {hasAttempted && examResults.length > 1 && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-[#072F5F] flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Best Performance
              </h4>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                {getBestResult()?.score_percentage.toFixed(1)}%
              </Badge>
            </div>
            
            <div className="text-sm text-gray-600">
              Completed on {new Date(getBestResult()?.completed_at || '').toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="flex-1 bg-[#3895D3] hover:bg-[#1261A0] text-white">
            <Link href="/exam" className="flex items-center justify-center gap-2">
              <Play className="h-4 w-4" />
              {hasAttempted ? 'Retake Exam' : 'Start Exam'}
            </Link>
          </Button>
          
          {hasAttempted && getLatestResult() && (
            <Button asChild variant="outline" className="flex-1 border-2 border-[#3895D3] text-[#3895D3] hover:bg-[#3895D3]/10">
              <Link href={`/exam/results?session=${getLatestResult()?.id}`} className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" />
                View Results
              </Link>
            </Button>
          )}
        </div>

        {/* Exam Tips */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">Exam Tips:</p>
              <ul className="text-yellow-700 space-y-1">
                <li>• Read each question carefully before answering</li>
                <li>• Use the flag feature for questions you want to review</li>
                <li>• Aim for 75% or higher to pass</li>
                <li>• Take breaks if needed, but manage your time wisely</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      </Card>
    </div>
  )
}

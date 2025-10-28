'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Target,
  Download,
  RotateCcw
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ExamResult {
  id: string
  session_id: string
  user_id: string
  user_email: string
  total_questions: number
  correct_answers: number
  incorrect_answers: number
  score_percentage: number
  time_taken: number
  passed: boolean
  completed_at: string
}

interface QuestionResult {
  question_id: string
  question_text: string
  user_answer: string
  correct_answer: string
  is_correct: boolean
  explanation: string
  category: string
}

export default function ExamResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')
  
  const [result, setResult] = useState<ExamResult | null>(null)
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    if (sessionId) {
      fetchExamResults()
    } else {
      router.push('/dashboard')
    }
  }, [sessionId])

  const fetchExamResults = async () => {
    try {
      // Fetch exam result
      const { data: resultData, error: resultError } = await supabase
        .from('exam_results')
        .select('*')
        .eq('session_id', sessionId)
        .single()

      if (resultError) {
        console.error('Error fetching result:', resultError)
        router.push('/dashboard')
        return
      }

      setResult(resultData)

      // Fetch detailed question results
      const { data: answersData, error: answersError } = await supabase
        .from('exam_answers')
        .select(`
          question_id,
          user_answer,
          is_correct,
          exam_questions (
            question_text,
            correct_answer,
            explanation,
            category
          )
        `)
        .eq('session_id', sessionId)

      if (answersError) {
        console.error('Error fetching answers:', answersError)
        return
      }

      const formattedResults = answersData?.map(answer => ({
        question_id: answer.question_id,
        question_text: answer.exam_questions.question_text,
        user_answer: answer.user_answer,
        correct_answer: answer.exam_questions.correct_answer,
        is_correct: answer.is_correct,
        explanation: answer.exam_questions.explanation,
        category: answer.exam_questions.category
      })) || []

      setQuestionResults(formattedResults)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching exam results:', error)
      setIsLoading(false)
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getCategoryBreakdown = () => {
    const breakdown: Record<string, { correct: number; total: number }> = {}
    
    questionResults.forEach(q => {
      if (!breakdown[q.category]) {
        breakdown[q.category] = { correct: 0, total: 0 }
      }
      breakdown[q.category].total++
      if (q.is_correct) {
        breakdown[q.category].correct++
      }
    })

    return breakdown
  }

  const getPerformanceMessage = () => {
    if (!result) return ''
    
    if (result.passed) {
      if (result.score_percentage >= 90) {
        return "Outstanding! You've demonstrated exceptional knowledge."
      } else if (result.score_percentage >= 80) {
        return "Excellent work! You're well-prepared for the NCLEX."
      } else {
        return "Good job! You've passed with a solid understanding."
      }
    } else {
      if (result.score_percentage >= 70) {
        return "Close! Focus on weak areas and try again."
      } else {
        return "Keep studying! Review the fundamentals and practice more."
      }
    }
  }

  const handleRetakeExam = () => {
    router.push('/exam')
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3895D3] mx-auto mb-4"></div>
          <p className="text-lg text-[#072F5F]">Loading results...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto border-2 border-[#3895D3]">
          <CardContent className="pt-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#072F5F] mb-2">Results Not Found</h2>
            <p className="text-gray-600 mb-4">Unable to load exam results.</p>
            <Button onClick={handleBackToDashboard} className="bg-[#3895D3] hover:bg-[#1261A0]">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const categoryBreakdown = getCategoryBreakdown()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#3895D3]/5 to-background">
      <Header />
      
      <main className="pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <Card className="mb-8 border-2 border-[#3895D3] bg-white">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {result.passed ? (
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 border-4 border-green-500">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 border-4 border-red-500">
                    <XCircle className="h-12 w-12 text-red-600" />
                  </div>
                )}
              </div>
              
              <CardTitle className="text-3xl font-bold text-[#072F5F] mb-2">
                {result.passed ? 'Congratulations!' : 'Keep Studying!'}
              </CardTitle>
              
              <p className="text-lg text-gray-600 mb-4">
                {getPerformanceMessage()}
              </p>
              
              <div className="flex justify-center">
                <Badge className={`text-lg px-4 py-2 ${
                  result.passed 
                    ? 'bg-green-100 text-green-800 border-green-300' 
                    : 'bg-red-100 text-red-800 border-red-300'
                }`}>
                  {result.passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Score Overview */}
            <Card className="lg:col-span-2 border-2 border-[#3895D3] bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-[#072F5F]">Exam Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#072F5F] mb-2">
                    {result.score_percentage.toFixed(1)}%
                  </div>
                  <div className="text-lg text-gray-600">
                    {result.correct_answers} out of {result.total_questions} correct
                  </div>
                  <Progress 
                    value={result.score_percentage} 
                    className="h-3 mt-4"
                  />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700">{result.correct_answers}</div>
                    <div className="text-sm text-green-600">Correct</div>
                  </div>
                  
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-700">{result.incorrect_answers}</div>
                    <div className="text-sm text-red-600">Incorrect</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-700">{formatTime(result.time_taken)}</div>
                    <div className="text-sm text-blue-600">Time Taken</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-700">
                      {result.passed ? '75%+' : '<75%'}
                    </div>
                    <div className="text-sm text-purple-600">Passing Grade</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="border-2 border-[#3895D3] bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-[#072F5F]">Performance by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(categoryBreakdown).map(([category, stats]) => {
                    const percentage = (stats.correct / stats.total) * 100
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-[#072F5F]">{category}</span>
                          <span className="text-gray-600">
                            {stats.correct}/{stats.total} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={handleRetakeExam}
              className="bg-[#3895D3] hover:bg-[#1261A0] text-white px-8 py-3"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Retake Exam
            </Button>
            
            <Button
              onClick={handleBackToDashboard}
              variant="outline"
              className="border-2 border-[#3895D3] text-[#3895D3] hover:bg-[#3895D3]/10 px-8 py-3"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Detailed Results Toggle */}
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="border-2 border-[#3895D3] text-[#3895D3] hover:bg-[#3895D3]/10"
            >
              {showDetails ? 'Hide' : 'Show'} Detailed Results
            </Button>
          </div>

          {/* Detailed Question Results */}
          {showDetails && (
            <Card className="mt-8 border-2 border-[#3895D3] bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-[#072F5F]">Question-by-Question Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {questionResults.map((question, index) => (
                    <div
                      key={question.question_id}
                      className={`p-6 rounded-lg border-2 ${
                        question.is_correct
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Badge className={`${
                            question.is_correct
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-red-100 text-red-800 border-red-300'
                          }`}>
                            Question {index + 1}
                          </Badge>
                          <Badge variant="outline" className="border-[#3895D3] text-[#3895D3]">
                            {question.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {question.is_correct ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                      
                      <p className="text-lg font-medium text-[#072F5F] mb-4">
                        {question.question_text}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Your Answer:</p>
                          <div className={`p-3 rounded border-2 ${
                            question.is_correct
                              ? 'border-green-300 bg-green-100'
                              : 'border-red-300 bg-red-100'
                          }`}>
                            <span className="font-medium">
                              {question.user_answer || 'Not answered'}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Correct Answer:</p>
                          <div className="p-3 rounded border-2 border-green-300 bg-green-100">
                            <span className="font-medium">{question.correct_answer}</span>
                          </div>
                        </div>
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
                          <p className="text-sm font-medium text-blue-800 mb-2">Explanation:</p>
                          <p className="text-sm text-blue-700">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

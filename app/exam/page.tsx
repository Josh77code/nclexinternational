'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Flag, Pause, Play } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Question {
  id: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation: string
  category: string
  difficulty_level: string
  course_id?: string | null
  question_time_limit?: number
}

interface ExamSession {
  id: string
  user_id: string
  user_email: string
  started_at: string
  total_questions: number
  status: string
}

export default function ExamPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(7200)
  const [examSession, setExamSession] = useState<ExamSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const [courseId, setCourseId] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [pausedTime, setPausedTime] = useState<number | null>(null)
  const examSessionRef = useRef<ExamSession | null>(null)
  const questionsRef = useRef<Question[]>([])
  const answersRef = useRef<Record<string, string>>({})
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const getSupabase = () => {
    if (!supabaseRef.current) {
      if (typeof window === 'undefined') {
        return null
      }
      supabaseRef.current = createClient()
    }
    return supabaseRef.current
  }

  useEffect(() => {
    examSessionRef.current = examSession
  }, [examSession])

  useEffect(() => {
    questionsRef.current = questions
  }, [questions])

  useEffect(() => {
    answersRef.current = answers
  }, [answers])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const course = params.get('courseId')
    setCourseId(course)
    const supabase = getSupabase()
    if (supabase) {
      initializeExam(supabase, course)
    }
  }, [])

  // Load paused state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && examSession) {
      const savedState = localStorage.getItem(`exam_paused_${examSession.id}`)
      const savedTime = localStorage.getItem(`exam_time_${examSession.id}`)
      if (savedState === 'true' && savedTime) {
        setIsPaused(true)
        setTimeRemaining(parseInt(savedTime, 10))
      }
    }
  }, [examSession])

  useEffect(() => {
    if (!examSession) return

    // Clear any existing timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }

    // Only start timer if not paused
    if (!isPaused) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          // Save time to localStorage
          if (examSession) {
            localStorage.setItem(`exam_time_${examSession.id}`, prev.toString())
          }
          
          if (prev <= 1) {
            if (handleSubmitExamRef.current) {
              handleSubmitExamRef.current()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [examSession, isPaused])

  const initializeExam = async (supabase: ReturnType<typeof createClient>, course: string | null) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const sessionPayload: any = {
        user_id: user.id,
        user_email: user.email,
        status: 'in_progress',
      }

      if (course && course !== 'general') {
        sessionPayload.course_id = course
      }

      const { data: sessionData, error: sessionError } = await supabase
        .from('exam_sessions')
        .insert(sessionPayload)
        .select()
        .single()

      if (sessionError) {
        console.error('Error creating exam session:', sessionError)
        return
      }

      setExamSession(sessionData)

      const { data: userData } = await supabase
        .from('users')
        .select('student_grade, role')
        .eq('id', user.id)
        .single()

      const userGrade = userData?.role === 'student' ? userData?.student_grade : null

      let questionsData, questionsError
      let activeQuery = supabase.from('exam_questions').select('*')

      if (course && course !== 'general') {
        activeQuery = activeQuery.eq('course_id', course)
      } else if (course === 'general') {
        activeQuery = activeQuery.is('course_id', null)
      }

      if (userGrade) {
        activeQuery = activeQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
      }

      activeQuery = activeQuery.eq('is_active', true).limit(100)

      const activeResult = await activeQuery
      questionsData = activeResult.data
      questionsError = activeResult.error

      if (questionsError) {
        console.warn('Error with is_active filter, trying without:', questionsError)
        let allQuery = supabase.from('exam_questions').select('*').limit(100)

        if (course && course !== 'general') {
          allQuery = allQuery.eq('course_id', course)
        } else if (course === 'general') {
          allQuery = allQuery.is('course_id', null)
        }

        if (userGrade) {
          allQuery = allQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
        }

        const allResult = await allQuery
        questionsData = allResult.data
        questionsError = allResult.error
      }

      if (!questionsError && (!questionsData || questionsData.length === 0)) {
        console.warn('No questions found for course:', course)
      }

      if (questionsError) {
        console.error('Error fetching questions:', questionsError)
        return
      }

      if (questionsData && questionsData.length < 100) {
        console.warn(`Warning: Exam has only ${questionsData.length} questions. Recommended: 100+ questions for a complete exam.`)
      }

      setQuestions(questionsData || [])
      setIsLoading(false)
    } catch (error) {
      console.error('Error initializing exam:', error)
      setIsLoading(false)
    }
  }

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleFlagQuestion = () => {
    const newFlagged = new Set(flaggedQuestions)
    if (flaggedQuestions.has(currentQuestionIndex)) {
      newFlagged.delete(currentQuestionIndex)
    } else {
      newFlagged.add(currentQuestionIndex)
    }
    setFlaggedQuestions(newFlagged)
  }

  const handlePauseExam = async () => {
    const supabase = getSupabase()
    const session = examSessionRef.current
    
    if (!supabase || !session) return

    setIsPaused(true)
    setPausedTime(timeRemaining)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(`exam_paused_${session.id}`, 'true')
      localStorage.setItem(`exam_time_${session.id}`, timeRemaining.toString())
      localStorage.setItem(`exam_answers_${session.id}`, JSON.stringify(answers))
    }

    // Update session status in database
    await supabase
      .from('exam_sessions')
      .update({ status: 'paused' })
      .eq('id', session.id)
  }

  const handleResumeExam = async () => {
    const supabase = getSupabase()
    const session = examSessionRef.current
    
    if (!supabase || !session) return

    setIsPaused(false)
    setPausedTime(null)
    
    // Remove from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`exam_paused_${session.id}`)
    }

    // Update session status in database
    await supabase
      .from('exam_sessions')
      .update({ status: 'in_progress' })
      .eq('id', session.id)
  }

  const handleSubmitExamRef = useRef<() => Promise<void>>()

  const handleSubmitExam = async () => {
    const session = examSessionRef.current
    const examQuestions = questionsRef.current
    const userAnswers = answersRef.current
    const supabase = getSupabase()

    if (!session || !supabase) return

    setIsSubmitting(true)
    try {
      let correctAnswers = 0
      const examAnswers = []

      for (const question of examQuestions) {
        const userAnswer = userAnswers[question.id]
        const isCorrect = userAnswer === question.correct_answer

        if (isCorrect) correctAnswers++

        examAnswers.push({
          session_id: session.id,
          question_id: question.id,
          user_answer: userAnswer || null,
          is_correct: isCorrect,
        })
      }

      const scorePercentage = (correctAnswers / examQuestions.length) * 100
      const currentTimeRemaining = timeRemaining
      const timeTaken = Math.floor((7200 - currentTimeRemaining) / 60)

      const { error: answersError } = await supabase
        .from('exam_answers')
        .insert(examAnswers)

      if (answersError) {
        console.error('Error saving answers:', answersError)
        return
      }

      const { error: sessionError } = await supabase
        .from('exam_sessions')
        .update({
          completed_at: new Date().toISOString(),
          time_taken: timeTaken,
          correct_answers: correctAnswers,
          score_percentage: scorePercentage,
          status: 'completed',
        })
        .eq('id', session.id)

      if (sessionError) {
        console.error('Error updating session:', sessionError)
        return
      }

      const { error: resultError } = await supabase
        .from('exam_results')
        .insert({
          session_id: session.id,
          user_id: session.user_id,
          user_email: session.user_email,
          total_questions: examQuestions.length,
          correct_answers: correctAnswers,
          incorrect_answers: examQuestions.length - correctAnswers,
          score_percentage: scorePercentage,
          time_taken: timeTaken,
          passed: scorePercentage >= 75,
        })

      if (resultError) {
        console.error('Error creating result:', resultError)
        return
      }

      router.push(`/exam/results?session=${session.id}`)
    } catch (error) {
      console.error('Error submitting exam:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Store handleSubmitExam in ref to avoid stale closure in timer
  useEffect(() => {
    handleSubmitExamRef.current = handleSubmitExam
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  const getUnansweredCount = () => {
    return questions.length - getAnsweredCount()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#304674] mx-auto mb-4"></div>
          <p className="text-lg text-[#304674]">Loading exam...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto border-2 border-[#304674]">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#304674] mb-2">No Questions Available</h2>
            <p className="text-gray-600 mb-4">
              Unable to load exam questions. Please check back later.
            </p>
            <Button onClick={() => router.push('/exam/select')} className="bg-[#304674] hover:bg-[#98bad5]">
              Return to Exam Selection
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#304674]/5 to-background">
      <Header />
      
      <main className="pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Exam Header */}
          <Card className="mb-6 border-2 border-[#304674] bg-white">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-[#304674]">NCLEX Practice Exam</CardTitle>
                  <p className="text-gray-600">Complete all {questions.length} questions to receive your score</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[#304674]">
                    <Clock className="h-5 w-5" />
                    <span className="font-bold text-lg">{formatTime(timeRemaining)}</span>
                    {isPaused && (
                      <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-50">
                        PAUSED
                      </Badge>
                    )}
                  </div>
                  <Badge className="bg-[#304674] text-white">
                    {getAnsweredCount()}/{questions.length} Answered
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isPaused ? handleResumeExam : handlePauseExam}
                    className={`border-2 ${
                      isPaused
                        ? 'border-green-500 text-green-600 hover:bg-green-50'
                        : 'border-orange-500 text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    {isPaused ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Resume
                      </>
                    ) : (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Navigation Sidebar */}
            <Card className="lg:col-span-1 border-2 border-[#304674] bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-[#304674]">Question Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                        index === currentQuestionIndex
                          ? 'bg-[#304674] text-white'
                          : answers[questions[index].id]
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : flaggedQuestions.has(index)
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span>Answered ({getAnsweredCount()})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span>Flagged ({flaggedQuestions.size})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span>Not Answered ({getUnansweredCount()})</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Content */}
            <Card className="lg:col-span-3 border-2 border-[#304674] bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-[#304674] text-white">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </Badge>
                    <Badge variant="outline" className="border-[#98bad5] text-[#98bad5]">
                      {currentQuestion.category}
                    </Badge>
                    <Badge variant="outline" className="border-[#304674] text-[#304674]">
                      {currentQuestion.difficulty_level}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFlagQuestion}
                    className={`border-2 ${
                      flaggedQuestions.has(currentQuestionIndex)
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-[#304674] text-[#304674] hover:bg-[#304674]/10'
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {flaggedQuestions.has(currentQuestionIndex) ? 'Unflag' : 'Flag'}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#304674] mb-4">
                    {currentQuestion.question_text}
                  </h3>
                  
                  <div className="space-y-3">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          answers[currentQuestion.id] === option
                            ? 'border-[#304674] bg-[#304674]/10'
                            : 'border-gray-200 hover:border-[#304674]/50 hover:bg-[#304674]/5'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
                          disabled={isPaused}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          answers[currentQuestion.id] === option
                            ? 'border-[#304674] bg-[#304674]'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQuestion.id] === option && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span className="font-medium text-[#304674]">
                          {option}. {currentQuestion[`option_${option.toLowerCase()}` as keyof Question] as string}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0 || isPaused}
                    className="border-2 border-[#304674] text-[#304674] hover:bg-[#304674]/10"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {currentQuestionIndex === questions.length - 1 ? (
                      <Button
                        onClick={() => setShowConfirmSubmit(true)}
                        className="bg-[#304674] hover:bg-[#98bad5] text-white"
                        disabled={isSubmitting || isPaused}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Exam'}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextQuestion}
                        disabled={isPaused}
                        className="bg-[#304674] hover:bg-[#98bad5] text-white"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full border-2 border-[#304674] bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#304674]">Submit Exam?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                You have answered {getAnsweredCount()} out of {questions.length} questions.
                {getUnansweredCount() > 0 && (
                  <span className="block mt-2 text-orange-600">
                    {getUnansweredCount()} questions remain unanswered.
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500">
                Once submitted, you cannot change your answers.
              </p>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 border-2 border-[#304674] text-[#304674]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitExam}
                  className="flex-1 bg-[#304674] hover:bg-[#98bad5] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  )
}

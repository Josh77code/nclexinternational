'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Flag } from 'lucide-react'
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
  const [timeRemaining, setTimeRemaining] = useState(120) // 2 hours in minutes
  const [examSession, setExamSession] = useState<ExamSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    initializeExam()
  }, [])

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 60000) // Update every minute
      return () => clearTimeout(timer)
    } else {
      // Time's up - auto submit
      handleSubmitExam()
    }
  }, [timeRemaining])

  const initializeExam = async () => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Create new exam session
      const { data: sessionData, error: sessionError } = await supabase
        .from('exam_sessions')
        .insert({
          user_id: user.id,
          user_email: user.email,
          status: 'in_progress'
        })
        .select()
        .single()

      if (sessionError) {
        console.error('Error creating exam session:', sessionError)
        return
      }

      setExamSession(sessionData)

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('exam_questions')
        .select('*')
        .limit(100)

      if (questionsError) {
        console.error('Error fetching questions:', questionsError)
        return
      }

      setQuestions(questionsData || [])
      setIsLoading(false)
    } catch (error) {
      console.error('Error initializing exam:', error)
      setIsLoading(false)
    }
  }

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
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

  const handleSubmitExam = async () => {
    if (!examSession) return

    setIsSubmitting(true)
    try {
      // Calculate score
      let correctAnswers = 0
      const examAnswers = []

      for (const question of questions) {
        const userAnswer = answers[question.id]
        const isCorrect = userAnswer === question.correct_answer
        
        if (isCorrect) correctAnswers++

        examAnswers.push({
          session_id: examSession.id,
          question_id: question.id,
          user_answer: userAnswer || null,
          is_correct: isCorrect
        })
      }

      const scorePercentage = (correctAnswers / questions.length) * 100
      const timeTaken = 120 - timeRemaining

      // Insert answers
      const { error: answersError } = await supabase
        .from('exam_answers')
        .insert(examAnswers)

      if (answersError) {
        console.error('Error saving answers:', answersError)
        return
      }

      // Update session
      const { error: sessionError } = await supabase
        .from('exam_sessions')
        .update({
          completed_at: new Date().toISOString(),
          time_taken: timeTaken,
          correct_answers: correctAnswers,
          score_percentage: scorePercentage,
          status: 'completed'
        })
        .eq('id', examSession.id)

      if (sessionError) {
        console.error('Error updating session:', sessionError)
        return
      }

      // Create exam result
      const { error: resultError } = await supabase
        .from('exam_results')
        .insert({
          session_id: examSession.id,
          user_id: examSession.user_id,
          user_email: examSession.user_email,
          total_questions: questions.length,
          correct_answers: correctAnswers,
          incorrect_answers: questions.length - correctAnswers,
          score_percentage: scorePercentage,
          time_taken: timeTaken,
          passed: scorePercentage >= 75
        })

      if (resultError) {
        console.error('Error creating result:', resultError)
        return
      }

      // Redirect to results page
      router.push(`/exam/results?session=${examSession.id}`)
    } catch (error) {
      console.error('Error submitting exam:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3895D3] mx-auto mb-4"></div>
          <p className="text-lg text-[#072F5F]">Loading exam...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto border-2 border-[#3895D3]">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#072F5F] mb-2">No Questions Available</h2>
            <p className="text-gray-600 mb-4">Unable to load exam questions. Please try again later.</p>
            <Button onClick={() => router.push('/dashboard')} className="bg-[#3895D3] hover:bg-[#1261A0]">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#3895D3]/5 to-background">
      <Header />
      
      <main className="pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Exam Header */}
          <Card className="mb-6 border-2 border-[#3895D3] bg-white">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-[#072F5F]">NCLEX Practice Exam</CardTitle>
                  <p className="text-gray-600">Complete all 100 questions to receive your score</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[#072F5F]">
                    <Clock className="h-5 w-5" />
                    <span className="font-bold text-lg">{formatTime(timeRemaining)}</span>
                  </div>
                  <Badge className="bg-[#3895D3] text-white">
                    {getAnsweredCount()}/{questions.length} Answered
                  </Badge>
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
            <Card className="lg:col-span-1 border-2 border-[#3895D3] bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-[#072F5F]">Question Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                        index === currentQuestionIndex
                          ? 'bg-[#3895D3] text-white'
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
            <Card className="lg:col-span-3 border-2 border-[#3895D3] bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-[#072F5F] text-white">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </Badge>
                    <Badge variant="outline" className="border-[#1261A0] text-[#1261A0]">
                      {currentQuestion.category}
                    </Badge>
                    <Badge variant="outline" className="border-[#3895D3] text-[#3895D3]">
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
                        : 'border-[#3895D3] text-[#3895D3] hover:bg-[#3895D3]/10'
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {flaggedQuestions.has(currentQuestionIndex) ? 'Unflag' : 'Flag'}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#072F5F] mb-4">
                    {currentQuestion.question_text}
                  </h3>
                  
                  <div className="space-y-3">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          answers[currentQuestion.id] === option
                            ? 'border-[#3895D3] bg-[#3895D3]/10'
                            : 'border-gray-200 hover:border-[#3895D3]/50 hover:bg-[#3895D3]/5'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          answers[currentQuestion.id] === option
                            ? 'border-[#3895D3] bg-[#3895D3]'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQuestion.id] === option && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span className="font-medium text-[#072F5F]">
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
                    disabled={currentQuestionIndex === 0}
                    className="border-2 border-[#3895D3] text-[#3895D3] hover:bg-[#3895D3]/10"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {currentQuestionIndex === questions.length - 1 ? (
                      <Button
                        onClick={() => setShowConfirmSubmit(true)}
                        className="bg-[#072F5F] hover:bg-[#1261A0] text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Exam'}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextQuestion}
                        className="bg-[#3895D3] hover:bg-[#1261A0] text-white"
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
          <Card className="max-w-md w-full border-2 border-[#3895D3] bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#072F5F]">Submit Exam?</CardTitle>
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
                  className="flex-1 border-2 border-[#3895D3] text-[#3895D3]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitExam}
                  className="flex-1 bg-[#072F5F] hover:bg-[#1261A0] text-white"
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

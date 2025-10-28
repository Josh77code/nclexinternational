'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  AlertCircle
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

export function ExamSection() {
  const [examResults, setExamResults] = useState<ExamResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasAttempted, setHasAttempted] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchExamResults()
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
    <Card className="border-2 border-[#3895D3] bg-white hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-[#072F5F] flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-[#3895D3]" />
            Practice Exam
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
  )
}

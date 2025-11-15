"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award,
  Search,
  Eye,
  Download,
  RefreshCw,
  BarChart3,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Student {
  id: string
  email: string
  full_name: string
  student_grade: string | null
  created_at: string
}

interface ExamResult {
  id: string
  session_id: string
  user_id: string
  user_email: string
  total_questions: number
  correct_answers: number
  score_percentage: number
  time_taken: number
  passed: boolean
  completed_at: string
}

interface StudentActivity {
  student_id: string
  student_name: string
  student_email: string
  exam_count: number
  avg_score: number
  last_exam_date: string | null
  passed_exams: number
}

export default function TeacherDashboard() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [examResults, setExamResults] = useState<ExamResult[]>([])
  const [studentActivities, setStudentActivities] = useState<StudentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGrade, setFilterGrade] = useState<string>("all")

  const supabase = createClient()

  useEffect(() => {
    checkAuth()
    loadData()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'instructor') {
      router.push('/dashboard')
      return
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        loadStudents(),
        loadExamResults(),
        loadStudentActivities()
      ])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStudents = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, full_name, student_grade, created_at')
      .eq('role', 'student')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading students:', error)
      return
    }

    setStudents(data || [])
  }

  const loadExamResults = async () => {
    const { data, error } = await supabase
      .from('exam_results')
      .select('*')
      .order('completed_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Error loading exam results:', error)
      return
    }

    setExamResults(data || [])
  }

  const loadStudentActivities = async () => {
    // Get all students with their exam statistics
    const { data: studentsData, error: studentsError } = await supabase
      .from('users')
      .select('id, email, full_name')
      .eq('role', 'student')

    if (studentsError || !studentsData) {
      console.error('Error loading students:', studentsError)
      return
    }

    // Get exam results for all students
    const { data: resultsData, error: resultsError } = await supabase
      .from('exam_results')
      .select('*')
      .order('completed_at', { ascending: false })

    if (resultsError) {
      console.error('Error loading exam results:', resultsError)
      return
    }

    // Calculate statistics for each student
    const activities: StudentActivity[] = studentsData.map(student => {
      const studentResults = (resultsData || []).filter(r => r.user_id === student.id)
      const scores = studentResults.map(r => r.score_percentage)
      const avgScore = scores.length > 0 
        ? scores.reduce((a, b) => a + b, 0) / scores.length 
        : 0
      const passedCount = studentResults.filter(r => r.passed).length
      const lastExam = studentResults.length > 0 
        ? studentResults[0].completed_at 
        : null

      return {
        student_id: student.id,
        student_name: student.full_name,
        student_email: student.email,
        exam_count: studentResults.length,
        avg_score: avgScore,
        last_exam_date: lastExam,
        passed_exams: passedCount
      }
    })

    setStudentActivities(activities.sort((a, b) => b.exam_count - a.exam_count))
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === "all" || student.student_grade === filterGrade
    return matchesSearch && matchesGrade
  })

  const filteredResults = examResults.filter(result => {
    return result.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           result.user_id === searchTerm
  })

  const stats = {
    totalStudents: students.length,
    totalExams: examResults.length,
    avgScore: examResults.length > 0
      ? examResults.reduce((sum, r) => sum + r.score_percentage, 0) / examResults.length
      : 0,
    passRate: examResults.length > 0
      ? (examResults.filter(r => r.passed).length / examResults.length) * 100
      : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A61C9] mx-auto mb-4"></div>
          <p className="text-lg text-[#0A61C9]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#0A61C9]">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wide">Teacher Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0A61C9]">Student Monitoring & Analytics</h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              View student activities, exam performance, and track progress across all registered students.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-2 border-[#0A61C9]/40 text-[#0A61C9] hover:bg-[#0A61C9]/10"
              onClick={loadData}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-[#749DC8] bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-[#0A61C9]">{stats.totalStudents}</div>
                <Users className="h-8 w-8 text-[#0A61C9]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#749DC8] bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-[#0A61C9]">{stats.totalExams}</div>
                <BookOpen className="h-8 w-8 text-[#0A61C9]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#749DC8] bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-[#0A61C9]">{stats.avgScore.toFixed(1)}%</div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#749DC8] bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-[#0A61C9]">{stats.passRate.toFixed(1)}%</div>
                <Award className="h-8 w-8 text-[#0A61C9]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="activities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activities">Student Activities</TabsTrigger>
            <TabsTrigger value="exams">Exam Results</TabsTrigger>
            <TabsTrigger value="students">All Students</TabsTrigger>
          </TabsList>

          {/* Student Activities Tab */}
          <TabsContent value="activities" className="space-y-4">
            <Card className="border-2 border-[#749DC8] bg-white">
              <CardHeader>
                <CardTitle className="text-[#0A61C9]">Student Activity Overview</CardTitle>
                <CardDescription>
                  View comprehensive activity statistics for each student
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Search by student name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                  <div className="rounded-lg border border-[#0A61C9]/20 bg-white">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Exams Taken</TableHead>
                          <TableHead>Average Score</TableHead>
                          <TableHead>Passed Exams</TableHead>
                          <TableHead>Last Exam</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentActivities
                          .filter(activity =>
                            activity.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            activity.student_email?.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((activity) => (
                            <TableRow key={activity.student_id}>
                              <TableCell className="font-medium text-[#0A61C9]">
                                {activity.student_name}
                              </TableCell>
                              <TableCell>{activity.student_email}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-[#0A61C9]/40 text-[#0A61C9]">
                                  {activity.exam_count}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span className={`font-semibold ${
                                  activity.avg_score >= 75 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {activity.avg_score.toFixed(1)}%
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                  {activity.passed_exams}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {activity.last_exam_date
                                  ? new Date(activity.last_exam_date).toLocaleDateString()
                                  : 'N/A'}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exam Results Tab */}
          <TabsContent value="exams" className="space-y-4">
            <Card className="border-2 border-[#749DC8] bg-white">
              <CardHeader>
                <CardTitle className="text-[#0A61C9]">Recent Exam Results</CardTitle>
                <CardDescription>
                  View detailed results from all student exams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Search by student email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                  <div className="rounded-lg border border-[#0A61C9]/20 bg-white">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Correct/Total</TableHead>
                          <TableHead>Time Taken</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredResults.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell className="font-medium text-[#0A61C9]">
                              {result.user_email}
                            </TableCell>
                            <TableCell>
                              <span className={`font-semibold text-lg ${
                                result.score_percentage >= 75 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {result.score_percentage.toFixed(1)}%
                              </span>
                            </TableCell>
                            <TableCell>
                              {result.correct_answers}/{result.total_questions}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                {result.time_taken} min
                              </div>
                            </TableCell>
                            <TableCell>
                              {result.passed ? (
                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Passed
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800 border-red-300">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Failed
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {new Date(result.completed_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/exam/results?session=${result.session_id}`)}
                                className="border-[#0A61C9] text-[#0A61C9] hover:bg-[#0A61C9]/10"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card className="border-2 border-[#749DC8] bg-white">
              <CardHeader>
                <CardTitle className="text-[#0A61C9]">All Registered Students</CardTitle>
                <CardDescription>
                  View and manage all student accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-md"
                    />
                    <select
                      value={filterGrade}
                      onChange={(e) => setFilterGrade(e.target.value)}
                      className="px-3 py-2 border-2 border-[#0A61C9]/40 rounded-md"
                    >
                      <option value="all">All Grades</option>
                      <option value="starter">Starter</option>
                      <option value="mid">Mid</option>
                      <option value="higher">Higher</option>
                    </select>
                  </div>
                  <div className="rounded-lg border border-[#0A61C9]/20 bg-white">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Registered</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium text-[#0A61C9]">
                              {student.full_name}
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-[#0A61C9]/40 text-[#0A61C9]">
                                {student.student_grade || 'Not Assigned'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(student.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


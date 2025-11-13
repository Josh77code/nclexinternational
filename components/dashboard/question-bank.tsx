"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  Download,
  Upload,
  BookOpen
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

interface Question {
  id: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation: string | null
  category: string | null
  difficulty_level: string
  course_id: string | null
  student_grade: string | null
  is_active: boolean
  created_at: string
}

export function QuestionBankSection() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all")
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('exam_questions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading questions:', error)
        toast({
          title: "Error",
          description: "Failed to load questions",
          variant: "destructive"
        })
        return
      }

      setQuestions(data || [])
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return

    const { error } = await supabase
      .from('exam_questions')
      .delete()
      .eq('id', questionId)

    if (error) {
      console.error('Error deleting question:', error)
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Success",
      description: "Question deleted successfully"
    })
    loadQuestions()
  }

  const handleAddQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const questionData = {
      question_text: formData.get('question_text') as string,
      option_a: formData.get('option_a') as string,
      option_b: formData.get('option_b') as string,
      option_c: formData.get('option_c') as string,
      option_d: formData.get('option_d') as string,
      correct_answer: formData.get('correct_answer') as string,
      explanation: formData.get('explanation') as string || null,
      category: formData.get('category') as string || null,
      difficulty_level: formData.get('difficulty_level') as string,
      is_active: formData.get('is_active') === 'true',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('exam_questions')
      .insert(questionData)

    if (error) {
      console.error('Error adding question:', error)
      toast({
        title: "Error",
        description: "Failed to add question",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Success",
      description: "Question added successfully"
    })
    setIsAddDialogOpen(false)
    // Reset form
    e.currentTarget.reset()
    loadQuestions()
  }

  const handleUpdateQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedQuestion) return

    const formData = new FormData(e.currentTarget)
    const questionData = {
      question_text: formData.get('question_text') as string,
      option_a: formData.get('option_a') as string,
      option_b: formData.get('option_b') as string,
      option_c: formData.get('option_c') as string,
      option_d: formData.get('option_d') as string,
      correct_answer: formData.get('correct_answer') as string,
      explanation: formData.get('explanation') as string || null,
      category: formData.get('category') as string || null,
      difficulty_level: formData.get('difficulty_level') as string,
      is_active: formData.get('is_active') === 'true',
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('exam_questions')
      .update(questionData)
      .eq('id', selectedQuestion.id)

    if (error) {
      console.error('Error updating question:', error)
      toast({
        title: "Error",
        description: "Failed to update question",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Success",
      description: "Question updated successfully"
    })
    setIsEditDialogOpen(false)
    loadQuestions()
  }

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = 
      q.question_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || q.category === filterCategory
    const matchesDifficulty = filterDifficulty === "all" || q.difficulty_level === filterDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const categories = Array.from(new Set(questions.map(q => q.category).filter(Boolean)))

  const stats = {
    total: questions.length,
    active: questions.filter(q => q.is_active).length,
    byDifficulty: {
      easy: questions.filter(q => q.difficulty_level === 'easy').length,
      medium: questions.filter(q => q.difficulty_level === 'medium').length,
      hard: questions.filter(q => q.difficulty_level === 'hard').length
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading questions...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-teal-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Easy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.byDifficulty.easy}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-orange-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Medium/Hard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.byDifficulty.medium + stats.byDifficulty.hard}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-2 border-teal-100">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Question Bank</CardTitle>
          <CardDescription>View and manage all exam questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat || ''}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Questions Table */}
          <div className="rounded-lg border border-teal-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No questions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="max-w-md">
                        <div className="truncate" title={question.question_text}>
                          {question.question_text}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-teal-200 text-teal-700">
                          {question.category || 'Uncategorized'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${
                            question.difficulty_level === 'easy' ? 'border-green-200 text-green-700' :
                            question.difficulty_level === 'medium' ? 'border-yellow-200 text-yellow-700' :
                            'border-red-200 text-red-700'
                          }`}
                        >
                          {question.difficulty_level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {question.is_active ? (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        ) : (
                          <Badge variant="outline" className="border-gray-300 text-gray-600">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(question.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedQuestion(question)
                              setIsViewDialogOpen(true)
                            }}
                            className="border-teal-200 text-teal-700 hover:bg-teal-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedQuestion(question)
                              setIsEditDialogOpen(true)
                            }}
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="border-red-200 text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Question Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Question Details</DialogTitle>
          </DialogHeader>
          {selectedQuestion && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Question</Label>
                <p className="mt-1 text-gray-900">{selectedQuestion.question_text}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Option A</Label>
                  <p className="mt-1 text-gray-900">{selectedQuestion.option_a}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Option B</Label>
                  <p className="mt-1 text-gray-900">{selectedQuestion.option_b}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Option C</Label>
                  <p className="mt-1 text-gray-900">{selectedQuestion.option_c}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Option D</Label>
                  <p className="mt-1 text-gray-900">{selectedQuestion.option_d}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Correct Answer</Label>
                <Badge className="mt-1 bg-green-100 text-green-800">{selectedQuestion.correct_answer}</Badge>
              </div>
              {selectedQuestion.explanation && (
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Explanation</Label>
                  <p className="mt-1 text-gray-900">{selectedQuestion.explanation}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Category</Label>
                  <p className="mt-1 text-gray-900">{selectedQuestion.category || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Difficulty</Label>
                  <p className="mt-1 text-gray-900 capitalize">{selectedQuestion.difficulty_level}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Question Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>Create a new question for the exam bank</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddQuestion} className="space-y-4">
            <div>
              <Label htmlFor="new_question_text">Question Text</Label>
              <Textarea
                id="new_question_text"
                name="question_text"
                required
                className="mt-1"
                placeholder="Enter the question text..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new_option_a">Option A</Label>
                <Input
                  id="new_option_a"
                  name="option_a"
                  required
                  className="mt-1"
                  placeholder="Option A"
                />
              </div>
              <div>
                <Label htmlFor="new_option_b">Option B</Label>
                <Input
                  id="new_option_b"
                  name="option_b"
                  required
                  className="mt-1"
                  placeholder="Option B"
                />
              </div>
              <div>
                <Label htmlFor="new_option_c">Option C</Label>
                <Input
                  id="new_option_c"
                  name="option_c"
                  required
                  className="mt-1"
                  placeholder="Option C"
                />
              </div>
              <div>
                <Label htmlFor="new_option_d">Option D</Label>
                <Input
                  id="new_option_d"
                  name="option_d"
                  required
                  className="mt-1"
                  placeholder="Option D"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new_correct_answer">Correct Answer</Label>
                <Select name="correct_answer" required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select correct answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="new_difficulty_level">Difficulty Level</Label>
                <Select name="difficulty_level" defaultValue="medium" required>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="new_category">Category</Label>
              <Input
                id="new_category"
                name="category"
                placeholder="e.g., Cardiovascular, Respiratory"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new_explanation">Explanation</Label>
              <Textarea
                id="new_explanation"
                name="explanation"
                placeholder="Explanation for the correct answer"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new_is_active">Status</Label>
              <Select name="is_active" defaultValue="true" required>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Question Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
            <DialogDescription>Update the question details below</DialogDescription>
          </DialogHeader>
          {selectedQuestion && (
            <form onSubmit={handleUpdateQuestion} className="space-y-4">
              <div>
                <Label htmlFor="question_text">Question Text</Label>
                <Textarea
                  id="question_text"
                  name="question_text"
                  defaultValue={selectedQuestion.question_text}
                  required
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="option_a">Option A</Label>
                  <Input
                    id="option_a"
                    name="option_a"
                    defaultValue={selectedQuestion.option_a}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="option_b">Option B</Label>
                  <Input
                    id="option_b"
                    name="option_b"
                    defaultValue={selectedQuestion.option_b}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="option_c">Option C</Label>
                  <Input
                    id="option_c"
                    name="option_c"
                    defaultValue={selectedQuestion.option_c}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="option_d">Option D</Label>
                  <Input
                    id="option_d"
                    name="option_d"
                    defaultValue={selectedQuestion.option_d}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="correct_answer">Correct Answer</Label>
                  <Select name="correct_answer" defaultValue={selectedQuestion.correct_answer} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="difficulty_level">Difficulty Level</Label>
                  <Select name="difficulty_level" defaultValue={selectedQuestion.difficulty_level} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  defaultValue={selectedQuestion.category || ''}
                  placeholder="e.g., Cardiovascular, Respiratory"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="explanation">Explanation</Label>
                <Textarea
                  id="explanation"
                  name="explanation"
                  defaultValue={selectedQuestion.explanation || ''}
                  placeholder="Explanation for the correct answer"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="is_active">Status</Label>
                <Select name="is_active" defaultValue={selectedQuestion.is_active ? 'true' : 'false'} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


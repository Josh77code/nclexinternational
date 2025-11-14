"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  Users
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

interface TeacherData {
  name: string
  email: string
  password: string
  status: 'pending' | 'created' | 'error'
  error?: string
}

export default function ImportTeachersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [csvContent, setCsvContent] = useState("")
  const [teachers, setTeachers] = useState<TeacherData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [successCount, setSuccessCount] = useState(0)
  const [errorCount, setErrorCount] = useState(0)

  const supabase = createClient()

  const generatePassword = (name: string, index: number): string => {
    // Generate password: First name + last 4 digits of timestamp + special char
    const namePart = name.split(' ')[0].toLowerCase().replace(/\s+/g, '')
    const timestamp = Date.now().toString().slice(-4)
    return `${namePart}${timestamp}@T`
  }

  const parseCSV = (text: string): TeacherData[] => {
    const lines = text.trim().split('\n')
    if (lines.length < 2) {
      throw new Error('CSV must have at least a header row and one data row')
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    const nameIndex = headers.findIndex(h => h.includes('name') || h.includes('full'))
    const emailIndex = headers.findIndex(h => h.includes('email'))

    if (nameIndex === -1 || emailIndex === -1) {
      throw new Error('CSV must contain "name" and "email" columns')
    }

    const teachers: TeacherData[] = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      if (values.length < 2) continue

      const name = values[nameIndex]
      const email = values[emailIndex]

      if (!name || !email) continue

      // Generate email if not provided (optional - can be name-based)
      const finalEmail = email || `${name.toLowerCase().replace(/\s+/g, '.')}@nclexkeys.com`
      const password = generatePassword(name, i)

      teachers.push({
        name,
        email: finalEmail,
        password,
        status: 'pending'
      })
    }

    return teachers
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setCsvContent(content)
      
      try {
        const parsedTeachers = parseCSV(content)
        setTeachers(parsedTeachers)
        toast({
          title: "Success",
          description: `Parsed ${parsedTeachers.length} teachers from CSV`
        })
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        })
      }
    }
    reader.readAsText(file)
  }

  const handlePasteCSV = () => {
    if (!csvContent) {
      toast({
        title: "Error",
        description: "Please paste CSV content or upload a file",
        variant: "destructive"
      })
      return
    }

    try {
      const parsedTeachers = parseCSV(csvContent)
      setTeachers(parsedTeachers)
      toast({
        title: "Success",
        description: `Parsed ${parsedTeachers.length} teachers from CSV`
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const handleCreateTeachers = async () => {
    if (teachers.length === 0) {
      toast({
        title: "Error",
        description: "No teachers to create",
        variant: "destructive"
      })
      return
    }

    setIsCreating(true)
    setSuccessCount(0)
    setErrorCount(0)

    try {
      const response = await fetch('/api/admin/teachers/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teachers }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create teachers')
      }

      // Update teacher statuses based on results (match by email)
      const updatedTeachers = teachers.map((teacher) => {
        const result = data.results.find((r: any) => r.email === teacher.email)
        if (result) {
          return {
            ...teacher,
            status: result.status as 'created' | 'error',
            error: result.error
          }
        }
        return teacher
      })

      setTeachers(updatedTeachers)
      setSuccessCount(data.summary.success)
      setErrorCount(data.summary.errors)

      toast({
        title: "Completed",
        description: `Created ${data.summary.success} teachers successfully. ${data.summary.errors} failed.`
      })
    } catch (error: any) {
      console.error('Error creating teachers:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to create teachers",
        variant: "destructive"
      })
    } finally {
      setIsCreating(false)
    }
  }

  const downloadTemplate = () => {
    const template = `Name,Email
John Doe,john.doe@nclexkeys.com
Jane Smith,jane.smith@nclexkeys.com`
    
    const blob = new Blob([template], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'teachers-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#304674]">
              <Users className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wide">Admin Tools</span>
            </div>
            <h1 className="text-3xl font-bold text-[#304674]">Import Teachers from Google Form</h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Upload a CSV file exported from Google Forms with teacher names and emails. Passwords will be auto-generated.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-2 border-[#304674]/40 text-[#304674] hover:bg-[#304674]/10"
            onClick={() => router.push('/dashboard/instructor')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Instructions */}
        <Card className="border-2 border-[#304674]/30">
          <CardHeader>
            <CardTitle className="text-[#304674] flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Export your Google Form responses as CSV</li>
              <li>Ensure the CSV has columns for "Name" (or "Full Name") and "Email"</li>
              <li>Upload the CSV file or paste its content below</li>
              <li>Review the parsed teachers - passwords will be auto-generated</li>
              <li>Click "Create All Teachers" to create the accounts</li>
            </ol>
            <div className="mt-4 pt-4 border-t">
              <Button
                variant="outline"
                onClick={downloadTemplate}
                className="border-2 border-[#304674]/40 text-[#304674] hover:bg-[#304674]/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Download CSV Template
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <Card className="border-2 border-[#304674]/30">
          <CardHeader>
            <CardTitle className="text-[#304674]">Upload CSV File</CardTitle>
            <CardDescription>Upload a CSV file from Google Forms or paste CSV content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="csv-content">Or Paste CSV Content</Label>
              <Textarea
                id="csv-content"
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                placeholder="Paste CSV content here..."
                className="mt-1 min-h-[150px] font-mono text-sm"
              />
            </div>
            <Button
              onClick={handlePasteCSV}
              disabled={!csvContent || isProcessing}
              className="bg-[#304674] hover:bg-[#98bad5] text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Parse CSV
            </Button>
          </CardContent>
        </Card>

        {/* Teachers Preview */}
        {teachers.length > 0 && (
          <Card className="border-2 border-[#304674]/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#304674]">Teachers Preview</CardTitle>
                  <CardDescription>
                    {teachers.length} teacher(s) ready to create. Passwords are auto-generated.
                  </CardDescription>
                </div>
                <Button
                  onClick={handleCreateTeachers}
                  disabled={isCreating}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isCreating ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4 mr-2" />
                      Create All Teachers ({teachers.length})
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-[#304674]/20 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Generated Password</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers.map((teacher, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-[#304674]">
                          {teacher.name}
                        </TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {teacher.password}
                          </code>
                        </TableCell>
                        <TableCell>
                          {teacher.status === 'pending' && (
                            <Badge variant="outline" className="border-[#98bad5] text-[#304674]">
                              Pending
                            </Badge>
                          )}
                          {teacher.status === 'created' && (
                            <Badge className="bg-green-100 text-green-800 border-green-300">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Created
                            </Badge>
                          )}
                          {teacher.status === 'error' && (
                            <Badge className="bg-red-100 text-red-800 border-red-300">
                              <XCircle className="h-3 w-3 mr-1" />
                              Error
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {successCount > 0 && (
                <Alert className="mt-4 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Successfully created {successCount} teacher account(s)
                  </AlertDescription>
                </Alert>
              )}

              {errorCount > 0 && (
                <Alert className="mt-4 border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Failed to create {errorCount} teacher account(s). Check errors above.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


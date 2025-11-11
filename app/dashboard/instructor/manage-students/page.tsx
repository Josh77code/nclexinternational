"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Plus, RefreshCw, Users, ArrowLeft, Lock, GraduationCap } from "lucide-react"

type StudentGrade = "starter" | "mid" | "higher" | null

type StudentRecord = {
  id: string
  email: string
  full_name: string
  phone_number: string | null
  student_grade: StudentGrade
  created_at?: string
  updated_at?: string
}

const gradeOptions: { value: Exclude<StudentGrade, null>; label: string }[] = [
  { value: "starter", label: "Starter (Beginner)" },
  { value: "mid", label: "Mid (Intermediate)" },
  { value: "higher", label: "Higher (Advanced)" },
]

function formatGrade(value: StudentGrade) {
  if (value === "starter") return "Starter (Beginner)"
  if (value === "mid") return "Mid (Intermediate)"
  if (value === "higher") return "Higher (Advanced)"
  return "Not Assigned"
}

export default function ManageStudentsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [students, setStudents] = useState<StudentRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [filterGrade, setFilterGrade] = useState<"all" | Exclude<StudentGrade, null>>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [refreshToken, setRefreshToken] = useState(0)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    studentGrade: "starter" as Exclude<StudentGrade, null>,
  })

  const [gradeDrafts, setGradeDrafts] = useState<Record<string, Exclude<StudentGrade, null>>>({})

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterGrade !== "all") {
        params.set("grade", filterGrade)
      }
      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim())
      }

      const res = await fetch(`/api/admin/students?${params.toString()}`, {
        cache: "no-store",
      })

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload.error || "Failed to load students")
      }

      const payload = await res.json()
      setStudents(payload.students || [])
      setGradeDrafts(
        (payload.students || []).reduce(
          (acc: Record<string, Exclude<StudentGrade, null>>, student: StudentRecord) => {
            acc[student.id] = (student.student_grade as Exclude<StudentGrade, null>) || "starter"
            return acc
          },
          {}
        )
      )
    } catch (error: any) {
      console.error("[manage-students] fetch error", error)
      toast({
        title: "Unable to load students",
        description: error?.message || "Please try again shortly.",
      })
    } finally {
      setLoading(false)
    }
  }, [filterGrade, searchTerm, toast])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents, refreshToken])

  const handleCreateStudent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.email || !formData.password || !formData.fullName) {
      toast({
        title: "Missing information",
        description: "Full name, email and password are required.",
      })
      return
    }

    setCreating(true)
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber || null,
          studentGrade: formData.studentGrade,
        }),
      })

      const payload = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(payload.error || "Unable to create student")
      }

      toast({
        title: "Student created",
        description: `${formData.fullName} now has access.`,
      })

      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        studentGrade: "starter",
      })
      setRefreshToken((prev) => prev + 1)
    } catch (error: any) {
      console.error("[manage-students] create error", error)
      toast({
        title: "Failed to create student",
        description: error?.message || "Please verify the details and try again.",
      })
    } finally {
      setCreating(false)
    }
  }

  const handleUpdateStudent = async (student: StudentRecord) => {
    const draftGrade = gradeDrafts[student.id]
    const hasGradeChange = draftGrade && draftGrade !== student.student_grade

    if (!hasGradeChange) {
      toast({
        title: "No changes detected",
        description: "Select a different grade to migrate the student.",
      })
      return
    }

    setSavingId(student.id)
    try {
      const res = await fetch("/api/admin/students", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: student.id,
          studentGrade: draftGrade,
        }),
      })

      const payload = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(payload.error || "Unable to update student")
      }

      toast({
        title: "Student updated",
        description: `${student.full_name} moved to ${formatGrade(draftGrade)}.`,
      })
      setRefreshToken((prev) => prev + 1)
    } catch (error: any) {
      console.error("[manage-students] update error", error)
      toast({
        title: "Failed to update student",
        description: error?.message || "Please try again.",
      })
    } finally {
      setSavingId(null)
    }
  }

  const quickStats = useMemo(() => {
    const counts = {
      starter: 0,
      mid: 0,
      higher: 0,
      unassigned: 0,
    }

    students.forEach((student) => {
      if (student.student_grade === "starter") counts.starter += 1
      else if (student.student_grade === "mid") counts.mid += 1
      else if (student.student_grade === "higher") counts.higher += 1
      else counts.unassigned += 1
    })

    return counts
  }, [students])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#072F5F]">
              <GraduationCap className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wide">Admin Tools</span>
            </div>
            <h1 className="text-3xl font-bold text-[#072F5F]">Manage Student Accounts</h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Create student logins, assign initial grade levels, and migrate learners between Starter,
              Mid, and Higher categories as they progress.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-2 border-[#3895D3]/40 text-[#072F5F] hover:bg-[#3895D3]/10"
              onClick={() => router.push("/dashboard/instructor")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Instructor Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#3895D3]/40 text-[#072F5F] hover:bg-[#3895D3]/10"
              onClick={() => setRefreshToken((prev) => prev + 1)}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#3895D3]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#072F5F]">
              <Users className="h-5 w-5" />
              Provision a New Student
            </CardTitle>
            <CardDescription>
              Fill in the learner’s details. They will receive access immediately with the password you set.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateStudent} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Deborah Badmus"
                  value={formData.fullName}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, fullName: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="deborah@example.com"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1234567890"
                  value={formData.phoneNumber}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, phoneNumber: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  Password <Lock className="h-4 w-4 text-muted-foreground" />
                </Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="temporary password"
                  value={formData.password}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, password: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Assign Grade</Label>
                <Select
                  value={formData.studentGrade}
                  onValueChange={(value: Exclude<StudentGrade, null>) =>
                    setFormData((prev) => ({ ...prev, studentGrade: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  type="submit"
                  className="w-full bg-[#3895D3] hover:bg-[#1261A0]"
                  disabled={creating}
                >
                  {creating ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Student
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#3895D3]/30">
          <CardHeader>
            <CardTitle className="text-[#072F5F]">All Students</CardTitle>
            <CardDescription>
              Promote learners between grades or reset their credentials as needed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                <Select
                  value={filterGrade}
                  onValueChange={(value: "all" | Exclude<StudentGrade, null>) => setFilterGrade(value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    {gradeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search name, email, or phone"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-64"
                  />
                  <Button
                    variant="outline"
                    className="border-2 border-[#3895D3]/40 text-[#072F5F] hover:bg-[#3895D3]/10"
                    onClick={() => setRefreshToken((prev) => prev + 1)}
                    disabled={loading}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="border-[#3895D3]/40 text-[#072F5F]">
                Starter: {quickStats.starter}
              </Badge>
              <Badge variant="outline" className="border-[#3895D3]/40 text-[#072F5F]">
                Mid: {quickStats.mid}
              </Badge>
              <Badge variant="outline" className="border-[#3895D3]/40 text-[#072F5F]">
                Higher: {quickStats.higher}
              </Badge>
              <Badge variant="outline" className="border-[#3895D3]/40 text-[#072F5F]">
                Unassigned: {quickStats.unassigned}
              </Badge>
            </div>

            <div className="rounded-lg border border-[#3895D3]/20 bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Current Grade</TableHead>
                    <TableHead>Change To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Loading students...
                      </TableCell>
                    </TableRow>
                  ) : students.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No students found for the selected filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium text-[#072F5F]">
                          {student.full_name || "—"}
                          <div className="text-xs text-muted-foreground">
                            ID: {student.id.slice(0, 8)}…{student.id.slice(-4)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`mailto:${student.email}`}
                            className="text-[#1261A0] hover:underline"
                          >
                            {student.email}
                          </Link>
                        </TableCell>
                        <TableCell>{student.phone_number || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-[#3895D3]/40 text-[#072F5F]">
                            {formatGrade(student.student_grade)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={gradeDrafts[student.id] ?? "starter"}
                            onValueChange={(value: Exclude<StudentGrade, null>) =>
                              setGradeDrafts((prev) => ({ ...prev, [student.id]: value }))
                            }
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {gradeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            className="bg-[#3895D3] hover:bg-[#1261A0]"
                            onClick={() => handleUpdateStudent(student)}
                            disabled={savingId === student.id}
                          >
                            {savingId === student.id ? (
                              <span className="flex items-center gap-2">
                                <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                Updating…
                              </span>
                            ) : (
                              "Update Grade"
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#3895D3]/30">
          <CardHeader>
            <CardTitle className="text-[#072F5F] text-lg">Need help migrating a group?</CardTitle>
            <CardDescription>
              Export student emails by grade and promote them in bulk using the Supabase SQL helper scripts.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Check the <Link href="/HOW_TO_ADD_STUDENTS_TO_CATEGORIES" className="underline font-medium">HOW_TO_ADD_STUDENTS_TO_CATEGORIES</Link> guide for the latest SQL snippets.
            </p>
            <p>
              You can also reach our team at{" "}
              <Link href="mailto:nclexkeysintl.academy@gmail.com" className="underline font-medium">
                nclexkeysintl.academy@gmail.com
              </Link>{" "}
              for personalised migrations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


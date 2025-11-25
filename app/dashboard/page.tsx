import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { CourseList } from "@/components/dashboard/course-list"
import { CourseMaterials } from "@/components/dashboard/course-materials"
import { LiveClassLinks } from "@/components/dashboard/live-class-links"
import { ExternalLinks } from "@/components/dashboard/external-links"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { ExamSection } from "@/components/dashboard/exam-section"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, BookOpen } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user data
  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  // Get enrollments with program details
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, programs(*)")
    .eq("user_id", user.id)
    .eq("status", "active")

  // Get user's grade if student
  const { data: userDataWithGrade } = await supabase
    .from("users")
    .select("student_grade, role")
    .eq("id", user.id)
    .single()

  const userGrade = userDataWithGrade?.role === "student" ? userDataWithGrade?.student_grade : null

  const gradeLabel =
    userGrade === "starter"
      ? "Starter (Beginner)"
      : userGrade === "mid"
        ? "Mid (Intermediate)"
        : userGrade === "higher"
          ? "Higher (Advanced)"
          : null

  // Get ALL active courses from the courses table (instructor-created courses)
  // Filter by student grade if user is a student
  let coursesQuery = supabase
    .from("courses")
    .select("*, course_materials(*)")
    .eq("status", "active")
  
  if (userGrade) {
    coursesQuery = coursesQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`)
  }
  
  const { data: instructorCourses } = await coursesQuery.order("created_at", { ascending: false })

  // Get courses for enrolled programs (old system)
  // IMPORTANT: Include course_materials so students can access materials even after completing courses
  const programIds = enrollments?.map((e) => e.program_id) || []
  const { data: programCourses } = await supabase
    .from("courses")
    .select("*, course_materials(*)")
    .in("program_id", programIds)
    .order("order_index", { ascending: true })

  // Combine both course types (instructor courses and program courses)
  const courses = [...(instructorCourses || []), ...(programCourses || [])]

  // Get active live class links
  const { data: liveClassLinks } = await supabase
    .from("live_class_links")
    .select("*")
    .eq("is_active", true)
    .order("scheduled_time", { ascending: true, nullsFirst: false })

  // Get user progress
  const { data: progress } = await supabase.from("user_progress").select("*").eq("user_id", user.id)

  const completedCourses = progress?.filter((p) => p.completed).length || 0
  const totalCourses = courses?.length || 0
  const progressPercentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader user={userData} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <Card className="border-2 border-[#749DC8] shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-[#0A61C9] text-2xl">Welcome back</CardTitle>
                <CardDescription className="text-sm text-[#0A61C9]">
                  Your profile updates automatically as we migrate you across grades.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-[#0A61C9]">
                    {userData?.full_name || "NCLEX Keys Student"}
                  </p>
                  <p className="text-sm text-[#0A61C9]">{user?.email}</p>
                </div>
                {gradeLabel && (
                  <Badge className="bg-[#F1F7F9] text-[#0A61C9] border border-[#749DC8] px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    <Shield className="mr-1 h-3 w-3" />
                    {gradeLabel}
                  </Badge>
                )}
                <div className="rounded-lg border border-[#749DC8] bg-[#F1F7F9] p-3 text-xs text-[#0A61C9] space-y-2">
                  <p className="font-semibold">Grade migration</p>
                  <p>
                    The admin team upgrades you from Starter → Mid → Higher as you complete coaching milestones.
                    Keep attending sessions and submitting tasks to unlock the next level.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#749DC8] bg-white">
              <CardHeader>
                <CardTitle className="text-sm text-[#0A61C9] flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Quick Progress Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-[#0A61C9]">
                <p>
                  Courses completed: <span className="font-semibold text-[#0A61C9]">{completedCourses}</span> /{" "}
                  <span className="font-semibold text-[#0A61C9]">{totalCourses}</span>
                </p>
                <p>
                  Overall progress:{" "}
                  <span className="font-semibold text-[#0A61C9]">{progressPercentage}%</span>
                </p>
              </CardContent>
            </Card>
          </aside>

          <section className="flex-1 space-y-10">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0A61C9]">
                Welcome back, {userData?.full_name}!
              </h1>
              <p className="text-enhanced mt-3 text-lg">
                Continue your NCLEX preparation journey with fresh content curated for your grade level.
              </p>
            </div>

            {enrollments && enrollments.length > 0 && !enrollments[0].payment_verified && (
              <div className="relative overflow-hidden bg-gradient-to-r from-[#F1F7F9] to-[#749DC8] border border-[#749DC8] rounded-xl p-6 animate-fade-in shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#749DC8]/20 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <h3 className="font-bold text-[#0A61C9] mb-2 text-lg">
                    Payment Verification Pending
                  </h3>
                  <p className="text-sm text-[#0A61C9]">
                    Your payment is being verified. You'll get full access once verification is complete (usually within 24
                    hours).
                  </p>
                </div>
              </div>
            )}

            <DashboardStats
              totalCourses={totalCourses}
              completedCourses={completedCourses}
              progressPercentage={progressPercentage}
              enrollments={enrollments || []}
            />

            <ProgressOverview progressPercentage={progressPercentage} />

            <ExamSection />

            <LiveClassLinks links={liveClassLinks || []} />

            <CourseMaterials courses={courses || []} userProgress={progress || []} />

            <ExternalLinks />

            <CourseList courses={courses || []} userProgress={progress || []} />
          </section>
        </div>
      </main>
    </div>
  )
}

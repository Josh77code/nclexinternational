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

  const userGrade = userDataWithGrade?.role === 'student' ? userDataWithGrade?.student_grade : null

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
  const programIds = enrollments?.map((e) => e.program_id) || []
  const { data: programCourses } = await supabase
    .from("courses")
    .select("*")
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
    <div className="min-h-screen bg-gradient-to-br from-background via-[#3895D3]/5 to-background">
      <DashboardHeader user={userData} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Welcome Section */}
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-solid">
            Welcome back, {userData?.full_name}!
          </h1>
          <p className="text-enhanced mt-3 text-lg">Continue your NCLEX preparation journey</p>
          {userData?.role === 'student' && userData?.student_grade && (
            <div className="mt-4 inline-block">
              <span className="px-4 py-2 bg-[#3895D3]/10 text-[#3895D3] rounded-lg font-semibold border border-[#3895D3]/30">
                Grade: {userData.student_grade === 'starter' ? 'Starter (Beginner)' : 
                       userData.student_grade === 'mid' ? 'Mid (Intermediate)' : 
                       userData.student_grade === 'higher' ? 'Higher (Advanced)' : 
                       userData.student_grade}
              </span>
            </div>
          )}
        </div>

        {/* Payment Verification Alert */}
        {enrollments && enrollments.length > 0 && !enrollments[0].payment_verified && (
          <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 animate-fade-in shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2 text-lg">Payment Verification Pending</h3>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">
                Your payment is being verified. You'll get full access once verification is complete (usually within 24
                hours).
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <DashboardStats
          totalCourses={totalCourses}
          completedCourses={completedCourses}
          progressPercentage={progressPercentage}
          enrollments={enrollments || []}
        />

        {/* Progress Overview */}
        <ProgressOverview progressPercentage={progressPercentage} />

        {/* Practice Exam Section */}
        <ExamSection />

        {/* Live Class Links */}
        <LiveClassLinks links={liveClassLinks || []} />

        {/* Course Materials */}
        <CourseMaterials courses={courses || []} userProgress={progress || []} />

        {/* External Links */}
        <ExternalLinks />

        {/* Course List */}
        <CourseList courses={courses || []} userProgress={progress || []} />
      </main>
    </div>
  )
}

          enrollments={enrollments || []}
        />

        {/* Progress Overview */}
        <ProgressOverview progressPercentage={progressPercentage} />

        {/* Practice Exam Section */}
        <ExamSection />

        {/* Live Class Links */}
        <LiveClassLinks links={liveClassLinks || []} />

        {/* Course Materials */}
        <CourseMaterials courses={courses || []} userProgress={progress || []} />

        {/* External Links */}
        <ExternalLinks />

        {/* Course List */}
        <CourseList courses={courses || []} userProgress={progress || []} />
      </main>
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, CheckCircle, TrendingUp, Award } from "lucide-react"

interface DashboardStatsProps {
  totalCourses: number
  completedCourses: number
  progressPercentage: number
  enrollments: any[]
}

export function DashboardStats({
  totalCourses,
  completedCourses,
  progressPercentage,
  enrollments,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="group relative overflow-hidden hover:shadow-xl hover:shadow-[var(--primary)]/20 transition-all duration-500 hover:-translate-y-2 border-l-4 border-[var(--primary)] bg-white dark:bg-card hover:border-[var(--primary-light)] animate-fade-in-up shadow-sm hover:shadow-md">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/10 rounded-full blur-2xl" />
        <CardContent className="pt-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Total Courses</p>
              <p className="text-3xl font-bold text-[var(--primary)]">
                {totalCourses}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-[var(--primary)] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <BookOpen className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden hover:shadow-xl hover:shadow-[var(--success)]/20 transition-all duration-500 hover:-translate-y-2 border-l-4 border-[var(--success)] bg-white dark:bg-card hover:border-green-600 animate-fade-in-up stagger-1 shadow-sm hover:shadow-md">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--success)]/10 rounded-full blur-2xl" />
        <CardContent className="pt-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Completed</p>
              <p className="text-3xl font-bold text-[var(--success)]">
                {completedCourses}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-[var(--success)] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <CheckCircle className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden hover:shadow-xl hover:shadow-[var(--primary)]/20 transition-all duration-500 hover:-translate-y-2 border-l-4 border-[var(--primary)] bg-white dark:bg-card hover:border-[var(--primary-light)] animate-fade-in-up stagger-2 shadow-sm hover:shadow-md">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/10 rounded-full blur-2xl" />
        <CardContent className="pt-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Progress</p>
              <p className="text-3xl font-bold text-[var(--primary)]">
                {progressPercentage}%
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-[var(--primary)] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <TrendingUp className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden hover:shadow-xl hover:shadow-[var(--primary)]/20 transition-all duration-500 hover:-translate-y-2 border-l-4 border-[var(--primary)] bg-white dark:bg-card hover:border-[var(--primary-light)] animate-fade-in-up stagger-3 shadow-sm hover:shadow-md">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/10 rounded-full blur-2xl" />
        <CardContent className="pt-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Programs</p>
              <p className="text-3xl font-bold text-[var(--primary)]">
                {enrollments.length}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-[var(--primary)] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <Award className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

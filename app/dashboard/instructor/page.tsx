"use client";

import { useState, useEffect } from "react";
import { getInstructorCourses, updateCourseStatus, deleteCourse } from "@/lib/actions/courses";
import { getInstructorLiveClassLinks } from "@/lib/actions/live-class-links";
import { LiveClassManagement } from "@/components/dashboard/live-class-management";
import { QuestionBankSection } from "@/components/dashboard/question-bank";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  GraduationCap,
  TrendingUp,
  Clock,
  Award,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  MessageSquare,
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [liveClassLinks, setLiveClassLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      course: "NCLEX-RN Comprehensive Review",
      progress: 75,
      lastActive: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@email.com",
      course: "Pharmacology Fundamentals",
      progress: 60,
      lastActive: "1 day ago",
      status: "active"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      course: "Medical-Surgical Nursing",
      progress: 90,
      lastActive: "3 hours ago",
      status: "active"
    }
  ]);

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Load courses and live class links on component mount
  useEffect(() => {
    loadCourses();
    loadLiveClassLinks();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const result = await getInstructorCourses();
      if (result.success) {
        setCourses(result.courses || []);
      } else {
        console.error('Failed to load courses:', result.error);
        setCourses([]);
        
        // Show specific error message based on the error
        if (result.error?.includes('Database schema not created')) {
          alert('Database setup required: Please run the database schema script in Supabase SQL Editor first.');
        } else {
          alert(`Failed to load courses: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourses([]);
      alert('Error loading courses. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadLiveClassLinks = async () => {
    try {
      const result = await getInstructorLiveClassLinks();
      if (result.success) {
        setLiveClassLinks(result.links || []);
      } else {
        console.error('Failed to load live class links:', result.error);
      }
    } catch (error) {
      console.error('Error loading live class links:', error);
    }
  };

  const stats = [
    {
      title: "Total Students",
      value: students.length.toString(),
      icon: Users,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Courses",
      value: courses.filter(c => c.status === "active").length.toString(),
      icon: BookOpen,
      change: "+1",
      changeType: "positive"
    },
    {
      title: "Total Courses",
      value: courses.length.toString(),
      icon: TrendingUp,
      change: "+1",
      changeType: "positive"
    },
    {
      title: "Materials",
      value: courses.reduce((total, course) => total + (course.course_materials?.length || 0), 0).toString(),
      icon: Clock,
      change: "+5",
      changeType: "positive"
    }
  ];

  // Filter courses based on search and status
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle course status change
  const handleStatusChange = async (courseId: string, newStatus: string) => {
    try {
      const result = await updateCourseStatus(courseId, newStatus as 'draft' | 'active' | 'archived');
      if (result.success) {
        await loadCourses(); // Reload courses
      } else {
        console.error('Failed to update course status:', result.error);
      }
    } catch (error) {
      console.error('Error updating course status:', error);
    }
  };

  // Handle course deletion
  const handleDeleteCourse = async (courseId: string) => {
    try {
      const result = await deleteCourse(courseId);
      if (result.success) {
        await loadCourses(); // Reload courses
      } else {
        console.error('Failed to delete course:', result.error);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Handle activating all courses
  const handleActivateAllCourses = async () => {
    try {
      const draftCourses = courses.filter(c => c.status === 'draft');
      for (const course of draftCourses) {
        await updateCourseStatus(course.id, 'active');
      }
      await loadCourses(); // Reload courses
      alert(`Activated ${draftCourses.length} courses! Students can now see them.`);
    } catch (error) {
      console.error('Error activating all courses:', error);
      alert('Error activating courses. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-2 border-teal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg shadow-lg shadow-teal-500/50">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">Instructor Dashboard</h1>
                <p className="text-gray-600 font-medium">Manage your courses and students</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 text-teal-700 font-semibold"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              {courses.some(c => c.status === 'draft') && (
                <Button 
                  variant="outline" 
                  onClick={handleActivateAllCourses}
                  className="border-2 border-green-400 text-green-600 hover:bg-green-50 font-semibold"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Activate All Courses
                </Button>
              )}
              <Button 
                onClick={() => window.location.href = '/dashboard/instructor/upload-questions'}
                variant="outline"
                className="border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700 font-semibold"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Questions
              </Button>
              <Button 
                onClick={() => window.location.href = '/dashboard/instructor/create-course'}
                className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold shadow-lg shadow-teal-500/40"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 border-teal-100 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg shadow-lg shadow-teal-500/40">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Class Links Section */}
        <div className="space-y-6">
          <LiveClassManagement links={liveClassLinks} />
        </div>

        {/* Courses Section */}
        <div className="space-y-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-soft rounded-md bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-4">Create your first course to get started</p>
              <Button 
                onClick={() => window.location.href = '/dashboard/instructor/create-course'}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="border-2 bg-white hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-900 font-bold">{course.title}</CardTitle>
                        <CardDescription className="mt-1 text-gray-700">
                          {course.course_enrollments?.[0]?.count || 0} students enrolled
                        </CardDescription>
                        <p className="text-sm text-gray-700 mt-2">{course.description}</p>
                      </div>
                      <Badge 
                        variant={course.status === 'active' ? 'default' : 'secondary'}
                        className={course.status === 'active' ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100 text-gray-800 font-semibold'}
                      >
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-900 font-medium">
                          <Clock className="w-4 h-4 mr-2 text-gray-700" />
                          {course.duration}
                        </div>
                        <div className="flex items-center text-gray-900 font-medium">
                          <Award className="w-4 h-4 mr-2 text-gray-700" />
                          {course.price}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-900 font-medium">
                        <BookOpen className="w-4 h-4 mr-2 text-gray-700" />
                        {course.course_materials?.length || 0} materials
                      </div>
                      <div className="flex items-center text-sm text-gray-900 font-medium">
                        <Clock className="w-4 h-4 mr-2 text-gray-700" />
                        Created {new Date(course.created_at).toLocaleDateString()}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-soft hover:border-glow flex-1"
                          onClick={() => {/* Handle view course */}}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-soft hover:border-glow flex-1"
                          onClick={() => {/* Handle edit course */}}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-soft hover:border-glow text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant={course.status === 'active' ? 'default' : 'outline'}
                          className={`flex-1 ${
                            course.status === 'active' 
                              ? 'bg-green-500 hover:bg-green-600 text-white' 
                              : 'border-soft hover:border-glow'
                          }`}
                          onClick={() => handleStatusChange(course.id, course.status === 'active' ? 'draft' : 'active')}
                        >
                          {course.status === 'active' ? '✓ Active' : 'Activate'}
                        </Button>
                        {course.status === 'active' && (
                          <div className="flex items-center text-xs text-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Visible to students
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Question Bank Section */}
        <div className="space-y-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Question Bank Collections</h2>
              <p className="text-gray-600 mt-1">Organize and manage exam questions in collections</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/dashboard/instructor/upload-questions'}
              className="bg-[#3895D3] hover:bg-[#1261A0] text-white font-semibold"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Questions
            </Button>
          </div>
          <QuestionBankSection />
        </div>

        {/* Students Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Students</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <Card key={student.id} className="border-soft hover:border-glow transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                    <Badge 
                      variant={student.status === 'active' ? 'default' : 'secondary'}
                      className={student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {student.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Course:</span> {student.course}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Progress:</span> {student.progress}%
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Last Active:</span> {student.lastActive}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="border-2 h-20 flex-col bg-white hover:bg-gray-50 text-gray-900"
              onClick={() => { window.location.href = '/dashboard/instructor/create-course' }}
            >
              <BookOpen className="w-6 h-6 mb-2 text-gray-700" />
              <span className="text-gray-900 font-medium">Add Course Material</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 h-20 flex-col bg-white hover:bg-gray-50 text-gray-900"
              onClick={() => { window.location.href = '/dashboard/instructor/manage-students' }}
            >
              <Users className="w-6 h-6 mb-2 text-gray-700" />
              <span className="text-gray-900 font-medium">Manage Students</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 h-20 flex-col bg-white hover:bg-gray-50 text-gray-900"
              onClick={() => window.location.href = '/dashboard/instructor/upload-questions'}
            >
              <Upload className="w-6 h-6 mb-2 text-gray-700" />
              <span className="text-gray-900 font-medium">Upload Questions</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 h-20 flex-col bg-white hover:bg-gray-50 text-gray-900"
              onClick={() => window.location.href = '/dashboard/instructor/import-teachers'}
            >
              <Users className="w-6 h-6 mb-2 text-gray-700" />
              <span className="text-gray-900 font-medium">Import Teachers</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 h-20 flex-col bg-white hover:bg-gray-50 text-gray-900"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              <BarChart3 className="w-6 h-6 mb-2 text-gray-700" />
              <span className="text-gray-900 font-medium">View Analytics</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 h-20 flex-col bg-white hover:bg-gray-50 text-gray-900"
              onClick={() => {/* Handle settings */}}
            >
              <Settings className="w-6 h-6 mb-2 text-gray-700" />
              <span className="text-gray-900 font-medium">Settings</span>
            </Button>
          </div>
        </div>

        {/* Analytics Panel */}
        {showAnalytics && (
          <div className="mt-8">
            <Card className="border-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Analytics Overview
                </CardTitle>
                <CardDescription>
                  Detailed insights into your courses and student performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-primary rounded-lg text-white">
                    <div className="text-2xl font-bold">105</div>
                    <div className="text-sm opacity-90">Total Students</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-[#6daedb] to-[#2f4e7a] rounded-lg text-white">
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-sm opacity-90">Completion Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-[#2f4e7a] to-[#143c78] rounded-lg text-white">
                    <div className="text-2xl font-bold">4.2h</div>
                    <div className="text-sm opacity-90">Avg Study Time</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-[#143c78] to-[#0a0e1a] rounded-lg text-white">
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-sm opacity-90">Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
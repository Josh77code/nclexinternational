"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStudentCourses, enrollInCourse, getAllCourses } from "@/lib/actions/courses";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Image, 
  Play, 
  Download,
  Clock,
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  Calendar,
  Star
} from "lucide-react";

interface CourseMaterial {
  id: string;
  type: 'video' | 'pdf' | 'slides';
  title: string;
  description: string;
  duration?: string;
  completed: boolean;
  url?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  duration: string;
  price: string;
  materials: CourseMaterial[];
  lastAccessed: string;
  status: 'active' | 'completed' | 'paused';
}

export default function StudentDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("browse"); // Default to browse tab
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);

  // Load student courses on component mount
  useEffect(() => {
    loadStudentCourses();
    loadAvailableCourses();
  }, []);

  const loadStudentCourses = async () => {
    setLoading(true);
    try {
      const result = await getStudentCourses();
      if (result.success) {
        setEnrollments(result.enrollments);
      } else {
        console.error('Failed to load courses:', result.error);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableCourses = async () => {
    try {
      console.log('Loading available courses...');
      const result = await getAllCourses();
      console.log('Available courses result:', result);
      if (result.success) {
        setAvailableCourses(result.courses);
        console.log('Available courses loaded:', result.courses);
      } else {
        console.error('Failed to load available courses:', result.error);
        alert(`Failed to load courses: ${result.error}`);
      }
    } catch (error) {
      console.error('Error loading available courses:', error);
      alert('Error loading available courses. Please check the console for details.');
    }
  };

  const handleEnrollInCourse = async (courseId: string) => {
    setEnrolling(courseId);
    try {
      const result = await enrollInCourse(courseId);
      if (result.success) {
        // Reload both enrolled and available courses
        await loadStudentCourses();
        await loadAvailableCourses();
        alert('Successfully enrolled in course!');
      } else {
        alert(`Failed to enroll: ${result.error}`);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Error enrolling in course. Please try again.');
    } finally {
      setEnrolling(null);
    }
  };

  const stats = [
    {
      title: "Courses Enrolled",
      value: enrollments.length.toString(),
      icon: BookOpen,
      change: "+2",
      changeType: "positive"
    },
    {
      title: "Completion Rate",
      value: `${Math.round(enrollments.reduce((total, enrollment) => total + enrollment.progress_percentage, 0) / (enrollments.length || 1))}%`,
      icon: TrendingUp,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Study Hours",
      value: "24.5h",
      icon: Clock,
      change: "+3.2h",
      changeType: "positive"
    },
    {
      title: "Certificates",
      value: enrollments.filter(e => e.status === 'completed').length.toString(),
      icon: Award,
      change: "+1",
      changeType: "positive"
    }
  ];

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5 text-red-500" />;
      case 'pdf': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'slides': return <Image className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getMaterialAction = (material: CourseMaterial) => {
    const handleView = () => {
      if (material.file_url) {
        window.open(material.file_url, '_blank');
      } else {
        alert('File URL not available');
      }
    };

    const handleDownload = () => {
      if (material.file_url) {
        const link = document.createElement('a');
        link.href = material.file_url;
        link.download = material.file_name || material.title;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('Download URL not available');
      }
    };

    return (
      <div className="flex gap-2">
        {/* View/Watch Button */}
        {material.type === 'video' ? (
          <Button 
            size="sm" 
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleView}
          >
            <Play className="w-4 h-4 mr-1" />
            Watch
          </Button>
        ) : material.type === 'pdf' ? (
          <Button 
            size="sm" 
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleView}
          >
            <FileText className="w-4 h-4 mr-1" />
            View
          </Button>
        ) : material.type === 'slides' ? (
          <Button 
            size="sm" 
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={handleView}
          >
            <Image className="w-4 h-4 mr-1" />
            View
          </Button>
        ) : null}
        
        {/* Download Button */}
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleDownload}
          className="border-2 hover:bg-gray-50"
          title="Download"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-2 border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-500/50">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">My Courses</h1>
                <p className="text-gray-600 font-medium">Continue your learning journey</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => router.push('/exam/select')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg"
              >
                Take Exam
              </Button>
              <div className="text-right">
                <div className="text-sm text-gray-600 font-medium">Overall Progress</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">68%</div>
              </div>
              <div className="w-16 h-16">
                <Progress value={68} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg shadow-purple-500/40">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-purple-200 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-700 font-semibold">My Courses</TabsTrigger>
            <TabsTrigger value="browse" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-700 font-semibold">Browse Courses</TabsTrigger>
            <TabsTrigger value="materials" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-700 font-semibold">Course Materials</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="overview" className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading courses...</p>
              </div>
            ) : enrollments.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses enrolled yet</h3>
                <p className="text-gray-600 mb-4">Browse and enroll in courses to start your learning journey</p>
                <Button 
                  onClick={() => setActiveTab('browse')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Browse Available Courses
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="border-2 border-teal-100 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 bg-white group">
                    <CardHeader className="bg-gradient-to-br from-teal-50 to-indigo-50 pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">{enrollment.courses.title}</CardTitle>
                          <CardDescription className="mt-1 text-gray-600 font-medium">
                            by {enrollment.courses.users?.full_name || 'Instructor'}
                          </CardDescription>
                          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{enrollment.courses.description}</p>
                        </div>
                        <Badge 
                          variant={enrollment.status === 'active' ? 'default' : 'secondary'}
                          className={enrollment.status === 'active' ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white border-0' : 'bg-gray-200 text-gray-700'}
                        >
                          {enrollment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 font-semibold">Progress</span>
                          <span className="text-teal-600 font-bold text-lg">{enrollment.progress_percentage}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={enrollment.progress_percentage} className="w-full h-3 bg-gray-100" />
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full" style={{width: `${enrollment.progress_percentage}%`}}></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-gray-700 bg-teal-50 px-3 py-2 rounded-lg">
                            <Clock className="w-4 h-4 mr-2 text-teal-600" />
                            <span className="font-medium">{enrollment.courses.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-700 bg-indigo-50 px-3 py-2 rounded-lg">
                            <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                            <span className="font-medium text-xs">{new Date(enrollment.enrolled_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all"
                            onClick={() => {
                              setSelectedCourse(enrollment);
                              setActiveTab('materials');
                            }}
                          >
                            Continue Learning
                          </Button>
                          <Button variant="outline" className="border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 text-teal-600">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Browse Courses Tab */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Available Courses</h2>
              <p className="text-gray-600">Discover and enroll in new courses</p>
            </div>

            {availableCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses available yet</h3>
                <p className="text-gray-600 mb-4">Instructors haven't published any courses yet</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Ask your instructor to create and publish courses, or check back later for new content.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {availableCourses.map((course) => {
                  const isEnrolled = enrollments.some(e => e.course_id === course.id);
                  const isEnrolling = enrolling === course.id;
                  
                  return (
                    <Card key={course.id} className="border-soft hover:border-glow transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{course.title}</CardTitle>
                            <CardDescription className="mt-1">
                              by {course.users?.full_name || 'Instructor'}
                            </CardDescription>
                            <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                          </div>
                          <Badge 
                            variant={isEnrolled ? 'default' : 'secondary'}
                            className={isEnrolled ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                          >
                            {isEnrolled ? 'Enrolled' : 'Available'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              {course.duration}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Award className="w-4 h-4 mr-2" />
                              {course.price}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <BookOpen className="w-4 h-4 mr-2" />
                            {course.course_materials?.length || 0} materials
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Created {new Date(course.created_at).toLocaleDateString()}
                          </div>
                          
                          <div className="flex gap-2">
                            {isEnrolled ? (
                              <Button 
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => {
                                  setSelectedCourse(enrollments.find(e => e.course_id === course.id));
                                  setActiveTab('materials');
                                }}
                              >
                                Continue Learning
                              </Button>
                            ) : (
                              <Button 
                                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                onClick={() => handleEnrollInCourse(course.id)}
                                disabled={isEnrolling}
                              >
                                {isEnrolling ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Enrolling...
                                  </div>
                                ) : (
                                  'Enroll Now'
                                )}
                              </Button>
                            )}
                            <Button variant="outline" className="border-soft hover:border-glow">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Course Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            {selectedCourse ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveTab('overview')}
                    className="flex items-center gap-2"
                  >
                    ← Back to Courses
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.courses.title}</h2>
                    <p className="text-gray-600">by {selectedCourse.courses.users?.full_name || 'Instructor'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Course Info */}
                  <Card className="border-soft">
                    <CardHeader>
                      <CardTitle className="text-lg">Course Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="font-semibold">{selectedCourse.progress_percentage}%</span>
                      </div>
                      <Progress value={selectedCourse.progress_percentage} className="w-full" />
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span>{selectedCourse.courses.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Materials:</span>
                          <span>{selectedCourse.courses.course_materials?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span>{selectedCourse.material_progress?.filter(m => m.completed).length || 0}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Materials List */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Course Materials</h3>
                    {selectedCourse.courses.course_materials?.map((material: any, index: number) => (
                      <Card key={material.id} className="border-soft hover:border-glow transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                {getMaterialIcon(material.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-gray-900">{material.title}</h4>
                                  {material.completed && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {material.duration}
                                  </span>
                                  <Badge 
                                    variant={material.completed ? 'default' : 'secondary'}
                                    className={material.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                                  >
                                    {material.completed ? 'Completed' : 'Pending'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              {getMaterialAction(material)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Course Selected</h3>
                <p className="text-gray-600 mb-4">Select a course from "My Courses" to view materials</p>
                <Button 
                  onClick={() => setActiveTab('overview')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View My Courses
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

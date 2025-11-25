"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlayCircle, 
  FileText, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Video, 
  File,
  CheckCircle,
  Clock
} from "lucide-react"

interface CourseMaterialsProps {
  courses: any[]
  userProgress: any[]
}

export function CourseMaterials({ courses, userProgress }: CourseMaterialsProps) {
  const [activeTab, setActiveTab] = useState("videos")

  const isCourseCompleted = (courseId: string) => {
    return userProgress.some((p) => p.course_id === courseId && p.completed)
  }

  const getFileTypeIcon = (url: string) => {
    if (url.includes('youtube.com') || url.includes('vimeo.com')) {
      return <Video className="h-4 w-4" />
    }
    if (url.includes('.pdf')) {
      return <FileText className="h-4 w-4" />
    }
    return <File className="h-4 w-4" />
  }

  const getFileTypeLabel = (url: string) => {
    if (url.includes('youtube.com') || url.includes('vimeo.com')) {
      return "Video"
    }
    if (url.includes('.pdf')) {
      return "PDF"
    }
    if (url.includes('.doc') || url.includes('.docx')) {
      return "Document"
    }
    return "File"
  }

  // Extract all materials from courses - INCLUDING completed courses
  // Students should be able to access materials even after completing a course
  const allMaterials: any[] = []
  courses.forEach(course => {
    // Check if course is completed
    const isCompleted = isCourseCompleted(course.id)
    
    if (course.course_materials && course.course_materials.length > 0) {
      course.course_materials.forEach((material: any) => {
        allMaterials.push({
          ...material,
          courseTitle: course.title,
          courseDescription: course.description,
          courseCompleted: isCompleted, // Track completion status for display
          courseId: course.id
        })
      })
    }
    // Also handle old-style courses with video_url and materials_url
    // Note: isCompleted is already defined above for this course
    
    if (course.video_url) {
      allMaterials.push({
        id: `${course.id}-video`,
        type: 'video',
        title: course.title,
        description: course.description,
        file_url: course.video_url,
        courseTitle: course.title,
        courseDescription: course.description,
        courseCompleted: isCompleted,
        courseId: course.id
      })
    }
    if (course.materials_url) {
      allMaterials.push({
        id: `${course.id}-material`,
        type: 'pdf',
        title: course.title,
        description: course.description,
        file_url: course.materials_url,
        courseTitle: course.title,
        courseDescription: course.description,
        courseCompleted: isCompleted,
        courseId: course.id
      })
    }
  })

  const videoMaterials = allMaterials.filter(m => m.type === 'video')
  const pdfMaterials = allMaterials.filter(m => m.type === 'pdf')
  const slidesMaterials = allMaterials.filter(m => m.type === 'slides')
  const studyMaterials = [...pdfMaterials, ...slidesMaterials]

  if (allMaterials.length === 0) {
    return (
      <Card className="border-soft animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Course Materials
          </CardTitle>
          <CardDescription className="text-base">
            No course materials available yet. Check back soon!
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-soft hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Course Materials
        </CardTitle>
        <CardDescription className="text-base text-enhanced">
          Access your video lectures and downloadable study materials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Lectures ({videoMaterials.length})
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Study Materials ({studyMaterials.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-4 mt-6">
            {videoMaterials.length === 0 ? (
              <div className="text-center py-8">
                <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No video lectures available yet.</p>
              </div>
            ) : (
              videoMaterials.map((material, index) => {
                return (
                  <div
                    key={material.id}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-soft hover:border-glow hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary"
                    >
                      <PlayCircle className="h-7 w-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                            {material.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-gray-500">
                              Course: {material.courseTitle}
                            </p>
                            {material.courseCompleted && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                          {material.description && (
                            <p className="text-sm text-enhanced mt-2 group-hover:text-foreground transition-colors duration-300">
                              {material.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {material.file_url && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            asChild
                            className="hover:bg-primary/10 hover:border-glow transition-all duration-300"
                          >
                            <a href={material.file_url} target="_blank" rel="noopener noreferrer">
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Watch Video
                              <ExternalLink className="h-3 w-3 ml-2" />
                            </a>
                          </Button>
                        )}
                        {material.duration && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {material.duration}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="materials" className="space-y-4 mt-6">
            {studyMaterials.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No study materials available yet.</p>
              </div>
            ) : (
              studyMaterials.map((material, index) => {
                return (
                  <div
                    key={material.id}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-soft hover:border-glow hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary"
                    >
                      <FileText className="h-7 w-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                            {material.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-gray-500">
                              Course: {material.courseTitle}
                            </p>
                            {material.courseCompleted && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                          {material.description && (
                            <p className="text-sm text-enhanced mt-2 group-hover:text-foreground transition-colors duration-300">
                              {material.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {material.courseCompleted && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {material.type === 'pdf' ? 'PDF' : 'Slides'}
                          </Badge>
                          {material.file_size && (
                            <Badge variant="outline" className="text-xs">
                              {(material.file_size / 1024 / 1024).toFixed(1)} MB
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {material.file_url && (
                          <>
                            <Button 
                              size="sm" 
                              variant="default" 
                              asChild
                              className="bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white"
                            >
                              <a href={material.file_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View {material.type === 'pdf' ? 'PDF' : 'Slides'}
                              </a>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              asChild
                              className="hover:bg-primary/10 hover:border-glow transition-all duration-300"
                            >
                              <a href={material.file_url} download target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </a>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

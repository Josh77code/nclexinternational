"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse, type CourseData, type CourseMaterial } from "@/lib/actions/courses";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileUpload } from "@/components/ui/file-upload";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Image, 
  Upload, 
  Plus, 
  Trash2, 
  Eye,
  Download,
  Play,
  File,
  ArrowLeft,
  Save,
  CheckCircle
} from "lucide-react";

interface LocalCourseMaterial {
  id: string;
  type: 'video' | 'pdf' | 'slides';
  title: string;
  description: string;
  file: File | null;
  url?: string;
  duration?: string;
  size?: string;
}

export default function CreateCoursePage() {
  const router = useRouter();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    category: "NCLEX-RN",
    student_grade: "" as 'starter' | 'mid' | 'higher' | '' | null
  });

  const [materials, setMaterials] = useState<LocalCourseMaterial[]>([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Add new material
  const addMaterial = (type: 'video' | 'pdf' | 'slides') => {
    const newMaterial: LocalCourseMaterial = {
      id: Date.now().toString(),
      type,
      title: "",
      description: "",
      file: null
    };
    setMaterials([...materials, newMaterial]);
  };

  // Update material
  const updateMaterial = (id: string, updates: Partial<LocalCourseMaterial>) => {
    setMaterials(materials.map(material => 
      material.id === id ? { ...material, ...updates } : material
    ));
  };

  // Remove material
  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  // Handle file upload
  const handleFileUpload = async (file: File, materialId: string) => {
    setUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update material with file info
      updateMaterial(materialId, {
        file,
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  // Save course
  const handleSaveCourse = async () => {
    if (!courseData.title || !courseData.description || !courseData.student_grade) {
      return;
    }

    setUploading(true);
    try {
      // Convert local materials to database format
      const dbMaterials: CourseMaterial[] = materials.map((material, index) => ({
        title: material.title,
        description: material.description,
        type: material.type,
        file_name: material.file?.name,
        file_url: material.url,
        file_size: material.file?.size,
        duration: material.duration,
        order_index: index + 1
      }));

      // Save to database - ensure student_grade is properly formatted
      const courseDataToSave = {
        ...courseData,
        student_grade: courseData.student_grade && courseData.student_grade !== '' 
          ? courseData.student_grade as 'starter' | 'mid' | 'higher' 
          : null
      };
      const result = await createCourse(courseDataToSave, dbMaterials);
      
      if (result.success) {
        setSuccess(true);
        // Redirect after success
        setTimeout(() => {
          router.push('/dashboard/instructor');
        }, 2000);
      } else {
        console.error('Save failed:', result.error);
        // Handle error - you might want to show an error message
      }
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                <p className="text-gray-600">Build your course with videos, PDFs, and slides</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-soft hover:border-glow">
                Save Draft
              </Button>
              <Button 
                onClick={handleSaveCourse}
                disabled={uploading || !courseData.title || !courseData.description || !courseData.student_grade}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Publish Course
                  </div>
                )}
        </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Course created successfully! Redirecting to dashboard...
            </AlertDescription>
                </Alert>
              )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="materials">Course Materials</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card className="border-soft">
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>
                  Provide basic details about your course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                      value={courseData.title}
                      onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                      placeholder="e.g., NCLEX-RN Comprehensive Review"
                      className="border-soft"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={courseData.category}
                      onChange={(e) => setCourseData({...courseData, category: e.target.value})}
                      className="border-soft"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student_grade">Student Grade (Required)</Label>
                    <select
                      id="student_grade"
                      value={courseData.student_grade || ''}
                      onChange={(e) => setCourseData({...courseData, student_grade: e.target.value as 'starter' | 'mid' | 'higher' | '' | null})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A61C9]"
                      required
                    >
                      <option value="">Select Grade Level</option>
                      <option value="starter">Starter (Beginner)</option>
                      <option value="mid">Mid (Intermediate)</option>
                      <option value="higher">Higher (Advanced)</option>
                    </select>
                    <p className="text-xs text-gray-500">Select which grade level this course is for. Students will only see courses for their grade.</p>
                  </div>
              </div>

              <div className="space-y-2">
                  <Label htmlFor="description">Course Description *</Label>
                <Textarea
                  id="description"
                    value={courseData.description}
                    onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                    placeholder="Describe what students will learn in this course..."
                    className="border-soft min-h-[120px]"
                />
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={courseData.duration}
                      onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
                      placeholder="e.g., 8 weeks, 40 hours"
                      className="border-soft"
                    />
              </div>
              <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                <Input
                      id="price"
                      value={courseData.price}
                      onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                      placeholder="e.g., $199"
                      className="border-soft"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card className="border-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Materials
                </CardTitle>
                <CardDescription>
                  Add videos, PDFs, and slides to your course
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add Material Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Button 
                    onClick={() => addMaterial('video')}
                    className="h-20 flex-col border-soft hover:border-glow"
                    variant="outline"
                  >
                    <Video className="w-6 h-6 mb-2 text-red-500" />
                    <span>Add Video</span>
                  </Button>
                  <Button 
                    onClick={() => addMaterial('pdf')}
                    className="h-20 flex-col border-soft hover:border-glow"
                    variant="outline"
                  >
                    <FileText className="w-6 h-6 mb-2 text-blue-500" />
                    <span>Add PDF</span>
                  </Button>
                  <Button 
                    onClick={() => addMaterial('slides')}
                    className="h-20 flex-col border-soft hover:border-glow"
                    variant="outline"
                  >
                    <Image className="w-6 h-6 mb-2 text-green-500" />
                    <span>Add Slides</span>
                  </Button>
                </div>

                {/* Materials List */}
                <div className="space-y-4">
                  {materials.map((material, index) => (
                    <Card key={material.id} className="border-soft">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              {material.type === 'video' && <Video className="w-5 h-5 text-red-500" />}
                              {material.type === 'pdf' && <FileText className="w-5 h-5 text-blue-500" />}
                              {material.type === 'slides' && <Image className="w-5 h-5 text-green-500" />}
                            </div>
                            <div>
                              <h4 className="font-semibold">
                                {material.title || `New ${material.type}`}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {material.type.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => removeMaterial(material.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
              </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <Label>Title</Label>
                <Input
                                value={material.title}
                                onChange={(e) => updateMaterial(material.id, { title: e.target.value })}
                                placeholder={`Enter ${material.type} title`}
                                className="border-soft"
                              />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                value={material.description}
                                onChange={(e) => updateMaterial(material.id, { description: e.target.value })}
                                placeholder={`Describe this ${material.type}`}
                                className="border-soft"
                              />
                            </div>
              </div>

                          <div className="space-y-3">
                            <div>
                              <Label>Upload File</Label>
                              <FileUpload
                                onUpload={(file) => handleFileUpload(file, material.id)}
                                accept={material.type === 'video' ? 'video/*' : material.type === 'pdf' ? '.pdf' : 'image/*'}
                                maxSize={material.type === 'video' ? 500 : 50}
                                className="border-soft"
                              />
              </div>

                            {material.file && (
                              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 text-green-800">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-sm font-medium">File uploaded successfully</span>
                                </div>
                                <div className="text-xs text-green-600 mt-1">
                                  {material.file.name} ({material.size})
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {materials.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No materials added yet. Click the buttons above to add content.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card className="border-soft">
              <CardHeader>
                <CardTitle>Course Preview</CardTitle>
                <CardDescription>
                  How your course will appear to students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{courseData.title || "Course Title"}</h3>
                    <p className="text-gray-600 mt-2">{courseData.description || "Course description will appear here"}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="font-semibold">{courseData.duration || "TBD"}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Price</div>
                      <div className="font-semibold">{courseData.price || "TBD"}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Materials</div>
                      <div className="font-semibold">{materials.length}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Category</div>
                      <div className="font-semibold">{courseData.category}</div>
                    </div>
                  </div>

                  {materials.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Course Materials</h4>
                      <div className="space-y-2">
                        {materials.map((material, index) => (
                          <div key={material.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-white rounded">
                              {material.type === 'video' && <Video className="w-4 h-4 text-red-500" />}
                              {material.type === 'pdf' && <FileText className="w-4 h-4 text-blue-500" />}
                              {material.type === 'slides' && <Image className="w-4 h-4 text-green-500" />}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{material.title || `Material ${index + 1}`}</div>
                              <div className="text-sm text-gray-600">{material.description || "No description"}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {material.type === 'video' && <Play className="w-4 h-4 text-gray-400" />}
                              {material.type === 'pdf' && <File className="w-4 h-4 text-gray-400" />}
                              {material.type === 'slides' && <Image className="w-4 h-4 text-gray-400" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
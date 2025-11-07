"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface CourseData {
  title: string;
  description: string;
  duration: string;
  price: string;
  category: string;
  student_grade?: 'starter' | 'mid' | 'higher' | null;
}

export interface CourseMaterial {
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'slides';
  file_name?: string;
  file_url?: string;
  file_size?: number;
  duration?: string;
  order_index: number;
}

export async function createCourse(
  courseData: CourseData,
  materials: CourseMaterial[]
) {
  const supabase = await getSupabaseServerClient();
  
  try {
    // Get current user (optional - use a default ID if not authenticated)
    const { data: { user } } = await supabase.auth.getUser();
    const instructorId = user?.id || '00000000-0000-0000-0000-000000000000'; // Default admin ID

    // Create course
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({
        title: courseData.title,
        description: courseData.description,
        instructor_id: instructorId,
        duration: courseData.duration,
        price: courseData.price,
        category: courseData.category,
        student_grade: courseData.student_grade || null,
        status: 'active'
      })
      .select()
      .single();

    if (courseError) {
      throw new Error(`Failed to create course: ${courseError.message}`);
    }

    // Create course materials
    if (materials.length > 0) {
      const materialsWithCourseId = materials.map(material => ({
        ...material,
        course_id: course.id
      }));

      const { error: materialsError } = await supabase
        .from('course_materials')
        .insert(materialsWithCourseId);

      if (materialsError) {
        // If materials fail, delete the course
        await supabase.from('courses').delete().eq('id', course.id);
        throw new Error(`Failed to create materials: ${materialsError.message}`);
      }
    }

    revalidatePath('/dashboard/instructor');
    return { success: true, course };
  } catch (error) {
    console.error('Error creating course:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getInstructorCourses() {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const instructorId = user?.id || '00000000-0000-0000-0000-000000000000'; // Default admin ID

    // Get courses with materials - try with relationship first, fallback to separate queries
    let courses, coursesError;
    
    try {
      const result = await supabase
        .from('courses')
        .select(`
          *,
          course_materials(*),
          course_enrollments(count)
        `)
        .eq('instructor_id', instructorId)
        .order('created_at', { ascending: false });
      
      courses = result.data;
      coursesError = result.error;
    } catch (relationshipError) {
      // If relationship query fails, try separate queries
      console.log('Relationship query failed, trying separate queries...');
      
      const { data: coursesData, error: coursesErr } = await supabase
        .from('courses')
        .select('*')
        .eq('instructor_id', instructorId)
        .order('created_at', { ascending: false });
      
      if (coursesErr) {
        coursesError = coursesErr;
      } else {
        // Get materials and enrollments separately
        const courseIds = coursesData?.map(c => c.id) || [];
        
        const { data: materials } = await supabase
          .from('course_materials')
          .select('*')
          .in('course_id', courseIds);
        
        const { data: enrollments } = await supabase
          .from('course_enrollments')
          .select('course_id')
          .in('course_id', courseIds);
        
        // Combine the data
        courses = coursesData?.map(course => ({
          ...course,
          course_materials: materials?.filter(m => m.course_id === course.id) || [],
          course_enrollments: [{ count: enrollments?.filter(e => e.course_id === course.id).length || 0 }]
        }));
      }
    }

    if (coursesError) {
      // Check if it's a table doesn't exist error
      if (coursesError.message.includes('relation "courses" does not exist') || 
          coursesError.message.includes('relation "public.courses" does not exist')) {
        throw new Error("Database schema not created yet. Please run the database schema script first.");
      }
      throw new Error(`Failed to fetch courses: ${coursesError.message}`);
    }

    return { success: true, courses: courses || [] };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getStudentCourses() {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // If not authenticated, return empty courses
      return { success: true, courses: [] };
    }

    // Get enrolled courses with materials and progress - try relationship first, fallback to separate queries
    let enrollments, enrollmentsError;
    
    try {
      const result = await supabase
        .from('course_enrollments')
        .select(`
          *,
          courses(
            *,
            course_materials(*),
            users!courses_instructor_id_fkey(full_name)
          ),
          material_progress(*)
        `)
        .eq('student_id', user.id)
        .eq('status', 'active')
        .order('enrolled_at', { ascending: false });
      
      enrollments = result.data;
      enrollmentsError = result.error;
    } catch (relationshipError) {
      // If relationship query fails, try separate queries
      console.log('Relationship query failed for enrollments, trying separate queries...');
      
      const { data: enrollmentsData, error: enrollmentsErr } = await supabase
        .from('course_enrollments')
        .select('*')
        .eq('student_id', user.id)
        .eq('status', 'active')
        .order('enrolled_at', { ascending: false });
      
      if (enrollmentsErr) {
        enrollmentsError = enrollmentsErr;
      } else {
        // Get courses, materials, and progress separately
        const courseIds = enrollmentsData?.map(e => e.course_id) || [];
        
        const { data: courses } = await supabase
          .from('courses')
          .select('*')
          .in('id', courseIds);
        
        const { data: materials } = await supabase
          .from('course_materials')
          .select('*')
          .in('course_id', courseIds);
        
        const { data: progress } = await supabase
          .from('material_progress')
          .select('*')
          .in('enrollment_id', enrollmentsData?.map(e => e.id) || []);
        
        // Combine the data
        enrollments = enrollmentsData?.map(enrollment => ({
          ...enrollment,
          courses: {
            ...courses?.find(c => c.id === enrollment.course_id),
            course_materials: materials?.filter(m => m.course_id === enrollment.course_id) || []
          },
          material_progress: progress?.filter(p => p.enrollment_id === enrollment.id) || []
        }));
      }
    }

    if (enrollmentsError) {
      throw new Error(`Failed to fetch enrollments: ${enrollmentsError.message}`);
    }

    return { success: true, enrollments: enrollments || [] };
  } catch (error) {
    console.error('Error fetching student courses:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateCourseStatus(courseId: string, status: 'draft' | 'active' | 'archived') {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const instructorId = user?.id || '00000000-0000-0000-0000-000000000000';

    const { error } = await supabase
      .from('courses')
      .update({ status })
      .eq('id', courseId)
      .eq('instructor_id', instructorId);

    if (error) {
      throw new Error(`Failed to update course: ${error.message}`);
    }

    revalidatePath('/dashboard/instructor');
    return { success: true };
  } catch (error) {
    console.error('Error updating course:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteCourse(courseId: string) {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const instructorId = user?.id || '00000000-0000-0000-0000-000000000000';

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId)
      .eq('instructor_id', instructorId);

    if (error) {
      throw new Error(`Failed to delete course: ${error.message}`);
    }

    revalidatePath('/dashboard/instructor');
    return { success: true };
  } catch (error) {
    console.error('Error deleting course:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getAllCourses() {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();

    console.log('Getting all courses for user:', user?.id || 'not authenticated');

    // Get user's grade if student
    let userGrade: string | null = null;
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('student_grade, role')
        .eq('id', user.id)
        .single();
      
      if (userData?.role === 'student') {
        userGrade = userData.student_grade;
      }
    }

    // Get all active courses with materials
    // Filter by student grade if user is a student
    let courses, coursesError;
    
    try {
      let query = supabase
        .from('courses')
        .select(`
          *,
          course_materials(*),
          users!courses_instructor_id_fkey(full_name)
        `)
        .eq('status', 'active');
      
      // If user is a student with a grade, filter courses by grade
      if (userGrade) {
        query = query.or(`student_grade.is.null,student_grade.eq.${userGrade}`);
      }
      
      const result = await query.order('created_at', { ascending: false });
      
      courses = result.data;
      coursesError = result.error;
    } catch (relationshipError) {
      // Fallback to separate queries
      console.log('Relationship query failed for all courses, trying separate queries...');
      
      let coursesQuery = supabase
        .from('courses')
        .select('*')
        .eq('status', 'active');
      
      // If user is a student with a grade, filter courses by grade
      if (userGrade) {
        coursesQuery = coursesQuery.or(`student_grade.is.null,student_grade.eq.${userGrade}`);
      }
      
      const { data: coursesData, error: coursesErr } = await coursesQuery.order('created_at', { ascending: false });
      
      if (coursesErr) {
        coursesError = coursesErr;
      } else {
        // Get materials separately
        const courseIds = coursesData?.map(c => c.id) || [];
        
        const { data: materials } = await supabase
          .from('course_materials')
          .select('*')
          .in('course_id', courseIds);
        
        // Combine the data
        courses = coursesData?.map(course => ({
          ...course,
          course_materials: materials?.filter(m => m.course_id === course.id) || [],
          users: { full_name: 'Instructor' } // Fallback instructor name
        }));
      }
    }

    if (coursesError) {
      console.error('Courses error:', coursesError);
      throw new Error(`Failed to fetch courses: ${coursesError.message}`);
    }

    console.log('Found courses:', courses);
    return { success: true, courses: courses || [] };
  } catch (error) {
    console.error('Error fetching all courses:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function enrollInCourse(courseId: string) {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Must be logged in to enroll' };
    }

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('course_id', courseId)
      .eq('student_id', user.id)
      .single();

    if (existingEnrollment) {
      return { success: false, error: 'Already enrolled in this course' };
    }

    // Enroll in course
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('course_enrollments')
      .insert({
        course_id: courseId,
        student_id: user.id,
        status: 'active'
      })
      .select()
      .single();

    if (enrollmentError) {
      throw new Error(`Failed to enroll: ${enrollmentError.message}`);
    }

    // Create material progress entries
    const { data: materials } = await supabase
      .from('course_materials')
      .select('id')
      .eq('course_id', courseId);

    if (materials && materials.length > 0) {
      const progressEntries = materials.map(material => ({
        enrollment_id: enrollment.id,
        material_id: material.id,
        completed: false
      }));

      await supabase
        .from('material_progress')
        .insert(progressEntries);
    }

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/student');
    return { success: true, enrollment };
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

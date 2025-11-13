import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

type EnsureAdminResult =
  | {
      adminClient: ReturnType<typeof createAdminClient>
      requesterId: string
      role: string
    }
  | {
      error: string
      status: number
    }

async function ensureAdmin() {
  try {
    const supabase = await getSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: "Unauthorized", status: 401 } satisfies EnsureAdminResult
    }

    const adminClient = createAdminClient()
    const { data: profile, error: profileError } = await adminClient
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profileError || !profile || !["admin", "instructor"].includes(profile.role)) {
      return { error: "Forbidden", status: 403 } satisfies EnsureAdminResult
    }

    return {
      adminClient,
      requesterId: user.id,
      role: profile.role,
    } satisfies EnsureAdminResult
  } catch (error) {
    console.error("[admin/students] ensureAdmin error", error)
    return { error: "Unable to verify credentials", status: 500 } satisfies EnsureAdminResult
  }
}

export async function GET(req: NextRequest) {
  const auth = await ensureAdmin()
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const { adminClient } = auth
  const { searchParams } = new URL(req.url)
  const gradeFilter = searchParams.get("grade")
  const search = searchParams.get("search")?.toLowerCase().trim()

  let query = adminClient
    .from("users")
    .select("id,email,full_name,phone_number,student_grade,created_at,updated_at")
    .eq("role", "student")
    .order("created_at", { ascending: false })

  if (gradeFilter && gradeFilter !== "all") {
    query = query.eq("student_grade", gradeFilter)
  }

  const { data, error } = await query

  if (error) {
    console.error("[admin/students] GET error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const filtered = (data || []).filter((student) => {
    if (!search) return true
    return (
      student.full_name?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search) ||
      student.phone_number?.toLowerCase().includes(search)
    )
  })

  return NextResponse.json({ students: filtered })
}

export async function POST(req: NextRequest) {
  const auth = await ensureAdmin()
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const { adminClient } = auth

  const body = await req.json()
  const email = body.email?.toLowerCase().trim()
  const password = body.password?.trim()
  const fullName = body.fullName?.trim()
  const phoneNumber = body.phoneNumber?.trim()
  const studentGrade = body.studentGrade?.trim() || "starter"

  if (!email || !password || !fullName) {
    return NextResponse.json(
      { error: "Email, password, and full name are required" },
      { status: 400 }
    )
  }

  try {
    // Try to create the user first
    let { data: created, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone_number: phoneNumber ?? null,
      },
    })

    // If user already exists, find and delete the existing user, then try again
    if (authError && authError.message?.toLowerCase().includes("already registered")) {
      console.log(`[admin/students] User with email ${email} already exists, deleting before recreating...`)
      
      // Find the existing user by email
      const { data: existingUsers, error: listError } = await adminClient.auth.admin.listUsers()
      if (!listError && existingUsers?.users) {
        const existingUser = existingUsers.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
        if (existingUser) {
          // Delete existing user from both auth.users and public.users
          // Delete from auth.users (this will cascade to public.users if CASCADE is set up)
          const { error: deleteAuthError } = await adminClient.auth.admin.deleteUser(existingUser.id)
          if (deleteAuthError) {
            console.error("[admin/students] Error deleting existing auth user:", deleteAuthError)
          }
          
          // Also delete from public.users to be safe
          const { error: deletePublicError } = await adminClient
            .from("users")
            .delete()
            .eq("email", email)
          if (deletePublicError) {
            console.error("[admin/students] Error deleting existing public user:", deletePublicError)
          }
          
          // Wait a bit for the deletion to complete
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Try creating the user again
          const retryResult = await adminClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
              full_name: fullName,
              phone_number: phoneNumber ?? null,
            },
          })
          
          created = retryResult.data
          authError = retryResult.error
        }
      }
    }

    if (authError) {
      const status = authError.message?.toLowerCase().includes("already registered") ? 409 : 400
      return NextResponse.json({ error: authError.message }, { status })
    }

    const userId = created.user?.id
    if (!userId) {
      return NextResponse.json(
        { error: "Unable to obtain user id from Supabase" },
        { status: 500 }
      )
    }

    const profilePayload = {
      id: userId,
      email,
      full_name: fullName,
      phone_number: phoneNumber ?? null,
      role: "student",
      student_grade: studentGrade,
      updated_at: new Date().toISOString(),
    }

    const { error: upsertError } = await adminClient
      .from("users")
      .upsert(profilePayload, { onConflict: "id" })

    if (upsertError) {
      console.error("[admin/students] upsert error", upsertError)
      return NextResponse.json({ error: upsertError.message }, { status: 500 })
    }

    return NextResponse.json({
      student: {
        id: userId,
        email,
        full_name: fullName,
        phone_number: phoneNumber ?? null,
        student_grade: studentGrade,
      },
    })
  } catch (error: any) {
    console.error("[admin/students] POST error", error)
    return NextResponse.json(
      { error: error?.message || "Unexpected error creating student" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await ensureAdmin()
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const { adminClient } = auth

  const body = await req.json()
  const userId = body.userId as string | undefined
  const newGrade = body.studentGrade as string | undefined
  const newPassword = body.password as string | undefined
  const fullName = body.fullName as string | undefined
  const phoneNumber = body.phoneNumber as string | undefined

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 })
  }

  try {
    if (newPassword && newPassword.trim().length > 0) {
      const { error: passwordError } = await adminClient.auth.admin.updateUserById(userId, {
        password: newPassword,
      })
      if (passwordError) {
        return NextResponse.json({ error: passwordError.message }, { status: 400 })
      }
    }

    const updatePayload: Record<string, any> = {}

    if (newGrade) {
      updatePayload.student_grade = newGrade
    }
    if (fullName) {
      updatePayload.full_name = fullName
    }
    if (typeof phoneNumber !== "undefined") {
      updatePayload.phone_number = phoneNumber
    }

    if (Object.keys(updatePayload).length > 0) {
      updatePayload.updated_at = new Date().toISOString()
      const { error: updateError } = await adminClient
        .from("users")
        .update(updatePayload)
        .eq("id", userId)

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 400 })
      }
    }

    const { data: updatedProfile, error: fetchError } = await adminClient
      .from("users")
      .select("id,email,full_name,phone_number,student_grade,updated_at")
      .eq("id", userId)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    return NextResponse.json({ student: updatedProfile })
  } catch (error: any) {
    console.error("[admin/students] PATCH error", error)
    return NextResponse.json(
      { error: error?.message || "Unexpected error updating student" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await ensureAdmin()
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const { adminClient } = auth

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 })
  }

  try {
    // Delete from auth.users first (this should cascade to public.users if CASCADE is set up)
    const { error: deleteAuthError } = await adminClient.auth.admin.deleteUser(userId)
    if (deleteAuthError) {
      console.error("[admin/students] Error deleting auth user:", deleteAuthError)
      // Continue to try deleting from public.users
    }

    // Also delete from public.users to ensure complete removal
    const { error: deletePublicError } = await adminClient
      .from("users")
      .delete()
      .eq("id", userId)

    if (deletePublicError) {
      console.error("[admin/students] Error deleting public user:", deletePublicError)
      // If auth deletion succeeded but public deletion failed, still return success
      // since the user won't be able to log in anyway
      if (deleteAuthError) {
        return NextResponse.json({ error: deletePublicError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, message: "Student deleted successfully" })
  } catch (error: any) {
    console.error("[admin/students] DELETE error", error)
    return NextResponse.json(
      { error: error?.message || "Unexpected error deleting student" },
      { status: 500 }
    )
  }
}







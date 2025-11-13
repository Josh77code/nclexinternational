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
    console.error("[admin/teachers/import] ensureAdmin error", error)
    return { error: "Unable to verify credentials", status: 500 } satisfies EnsureAdminResult
  }
}

interface TeacherData {
  name: string
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  const auth = await ensureAdmin()
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const { adminClient } = auth
  const body = await req.json()
  const teachers: TeacherData[] = body.teachers || []

  if (!teachers || teachers.length === 0) {
    return NextResponse.json(
      { error: "No teachers provided" },
      { status: 400 }
    )
  }

  const results = []

  for (const teacher of teachers) {
    try {
      // Check if user already exists
      const { data: existingUsers, error: listError } = await adminClient.auth.admin.listUsers()
      let existingUser = null
      if (!listError && existingUsers?.users) {
        existingUser = existingUsers.users.find(u => u.email === teacher.email)
      }

      if (existingUser) {
        // Update existing user
        await adminClient.auth.admin.updateUserById(existingUser.id, {
          password: teacher.password,
          user_metadata: {
            full_name: teacher.name,
            role: 'instructor'
          }
        })

        // Update public user
        await adminClient
          .from('users')
          .update({
            role: 'instructor',
            full_name: teacher.name,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingUser.id)

        results.push({
          email: teacher.email,
          status: 'created',
          message: 'Updated existing user'
        })
      } else {
        // Create new user
        const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
          email: teacher.email,
          password: teacher.password,
          email_confirm: true,
          user_metadata: {
            full_name: teacher.name,
            role: 'instructor'
          }
        })

        if (authError) {
          results.push({
            email: teacher.email,
            status: 'error',
            error: authError.message
          })
          continue
        }

        // Create public user
        const { error: publicError } = await adminClient
          .from('users')
          .insert({
            id: authData.user.id,
            email: teacher.email,
            full_name: teacher.name,
            role: 'instructor',
            phone_number: '+234-000-0000',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (publicError) {
          // If public user creation fails, try update
          await adminClient
            .from('users')
            .update({
              role: 'instructor',
              full_name: teacher.name,
              updated_at: new Date().toISOString()
            })
            .eq('id', authData.user.id)
        }

        results.push({
          email: teacher.email,
          status: 'created',
          message: 'Created new user'
        })
      }
    } catch (error: any) {
      results.push({
        email: teacher.email,
        status: 'error',
        error: error.message || 'Unknown error'
      })
    }
  }

  const successCount = results.filter(r => r.status === 'created').length
  const errorCount = results.filter(r => r.status === 'error').length

  return NextResponse.json({
    success: true,
    results,
    summary: {
      total: teachers.length,
      success: successCount,
      errors: errorCount
    }
  })
}


// Create 10 Teacher Accounts using Supabase Admin API
// Run this script using: node scripts/create-10-teachers-admin-api.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bpyqsxwbxsfozdzustgy.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pkenVzdGd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI3OTU5NywiZXhwIjoyMDc0ODU1NTk3fQ.Ljs6egHOepdaxg8PxGTcPI7sprg20-RavNZULp37I6M'

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const teachers = [
  { email: 'teacher1@nclexkeys.com', name: 'Teacher One', password: 'Teacher1@2025' },
  { email: 'teacher2@nclexkeys.com', name: 'Teacher Two', password: 'Teacher2@2025' },
  { email: 'teacher3@nclexkeys.com', name: 'Teacher Three', password: 'Teacher3@2025' },
  { email: 'teacher4@nclexkeys.com', name: 'Teacher Four', password: 'Teacher4@2025' },
  { email: 'teacher5@nclexkeys.com', name: 'Teacher Five', password: 'Teacher5@2025' },
  { email: 'teacher6@nclexkeys.com', name: 'Teacher Six', password: 'Teacher6@2025' },
  { email: 'teacher7@nclexkeys.com', name: 'Teacher Seven', password: 'Teacher7@2025' },
  { email: 'teacher8@nclexkeys.com', name: 'Teacher Eight', password: 'Teacher8@2025' },
  { email: 'teacher9@nclexkeys.com', name: 'Teacher Nine', password: 'Teacher9@2025' },
  { email: 'teacher10@nclexkeys.com', name: 'Teacher Ten', password: 'Teacher10@2025' }
]

async function createTeachers() {
  console.log('🚀 Starting teacher account creation...\n')

  for (let i = 0; i < teachers.length; i++) {
    const teacher = teachers[i]
    console.log(`\n📝 Creating teacher ${i + 1}/10: ${teacher.name}`)
    console.log(`   Email: ${teacher.email}`)

    try {
      // Check if user already exists
      const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers()
      if (!listError && existingUsers?.users) {
        const existingUser = existingUsers.users.find(u => u.email === teacher.email)
        if (existingUser) {
          console.log(`   ⚠️  User already exists in auth.users (ID: ${existingUser.id})`)
          
          // Check if public user exists
          const { data: publicUser } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', teacher.email)
            .single()

          if (publicUser) {
            console.log(`   ✅ Public user already exists, updating...`)
            const { error: updateError } = await supabaseAdmin
              .from('users')
              .update({
                role: 'instructor',
                full_name: teacher.name,
                updated_at: new Date().toISOString()
              })
              .eq('id', existingUser.id)

            if (updateError) {
              console.log(`   ❌ Error updating public user: ${updateError.message}`)
            } else {
              console.log(`   ✅ Public user updated successfully`)
            }
            continue
          }
        }
      }

      // Create auth user
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: teacher.email,
        password: teacher.password,
        email_confirm: true,
        user_metadata: {
          full_name: teacher.name,
          role: 'instructor'
        }
      })

      if (authError) {
        console.log(`   ❌ Error creating auth user: ${authError.message}`)
        continue
      }

      console.log(`   ✅ Auth user created (ID: ${authData.user.id})`)

      // Create public user
      const { error: publicError } = await supabaseAdmin
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
        console.log(`   ❌ Error creating public user: ${publicError.message}`)
        
        // Try to update if it exists
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({
            role: 'instructor',
            full_name: teacher.name,
            updated_at: new Date().toISOString()
          })
          .eq('id', authData.user.id)

        if (updateError) {
          console.log(`   ❌ Error updating public user: ${updateError.message}`)
        } else {
          console.log(`   ✅ Public user updated successfully`)
        }
      } else {
        console.log(`   ✅ Public user created successfully`)
      }

      console.log(`   ✅ Teacher ${teacher.name} created successfully!`)

    } catch (error) {
      console.log(`   ❌ Unexpected error: ${error.message}`)
    }
  }

  console.log('\n🎉 Teacher account creation completed!')
  console.log('\n📋 Summary of created accounts:')
  teachers.forEach((teacher, index) => {
    console.log(`   ${index + 1}. ${teacher.email} / ${teacher.password}`)
  })
}

// Run the script
createTeachers()
  .then(() => {
    console.log('\n✅ Script completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  })


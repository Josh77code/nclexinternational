const fs = require("fs")
const path = require("path")

const CSV_PATH = path.join(
  __dirname,
  "..",
  "Contact Information (Responses) - Form Responses 1.csv"
)
const SQL_OUTPUT_PATH = path.join(__dirname, "..", "generated-google-form-students.sql")
const CSV_OUTPUT_PATH = path.join(__dirname, "..", "generated-google-form-students.csv")

function parseCsv(text) {
  const rows = []
  let current = []
  let value = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      value += '"'
      i += 1
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      current.push(value)
      value = ""
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1
      }
      current.push(value)
      rows.push(current)
      current = []
      value = ""
    } else {
      value += char
    }
  }

  if (value.length > 0 || current.length > 0) {
    current.push(value)
    rows.push(current)
  }

  return rows
}

function normaliseWhitespace(input) {
  return input.replace(/\s+/g, " ").trim()
}

function extractSurname(fullName) {
  const trimmed = normaliseWhitespace(fullName)
  if (!trimmed) return ""
  const parts = trimmed.split(" ")
  let surname = parts[parts.length - 1] || parts[0]
  surname = surname.replace(/[^A-Za-z0-9\-]/g, "")
  if (!surname && parts.length > 0) {
    surname = parts[0].replace(/[^A-Za-z0-9\-]/g, "")
  }
  return surname.toLowerCase()
}

function mapGrade(raw) {
  const grade = raw.toLowerCase()
  if (grade.includes("mid")) return "mid"
  if (grade.includes("higher")) return "higher"
  return "starter"
}

function escapeSql(value) {
  return value.replace(/'/g, "''")
}

function generateSql(records) {
  const blocks = records.map((record) => {
    const {
      fullName,
      email,
      phone,
      grade,
      password,
    } = record

    return [
      "DO $$",
      "DECLARE",
      "  student_id UUID;",
      "  existing_user UUID;",
      `  student_email TEXT := '${escapeSql(email)}';`,
      `  student_password TEXT := '${escapeSql(password)}';`,
      `  student_name TEXT := '${escapeSql(fullName)}';`,
      `  student_phone TEXT := '${escapeSql(phone)}';`,
      `  student_grade TEXT := '${escapeSql(grade)}';`,
      "BEGIN",
      "  SELECT id INTO existing_user",
      "  FROM public.users",
      "  WHERE email = student_email;",
      "",
      "  IF existing_user IS NOT NULL THEN",
      "    RAISE NOTICE '⚠️ Student already exists: %', student_email;",
      "    RETURN;",
      "  END IF;",
      "",
      "  student_id := gen_random_uuid();",
      "",
      "  INSERT INTO auth.users (",
      "    instance_id, id, aud, role, email, encrypted_password,",
      "    email_confirmed_at, created_at, updated_at,",
      "    raw_app_meta_data, raw_user_meta_data, is_super_admin",
      "  ) VALUES (",
      "    '00000000-0000-0000-0000-000000000000',",
      "    student_id,",
      "    'authenticated',",
      "    'authenticated',",
      "    student_email,",
      "    crypt(student_password, gen_salt('bf')),",
      "    NOW(),",
      "    NOW(),",
      "    NOW(),",
      "    '{\"provider\":\"email\",\"providers\":[\"email\"]}',",
      "    jsonb_build_object(",
      "      'full_name', student_name,",
      "      'phone_number', NULLIF(student_phone, '')",
      "    ),",
      "    FALSE",
      "  );",
      "",
      "  INSERT INTO public.users (",
      "    id, email, full_name, role, student_grade, phone_number, created_at, updated_at",
      "  ) VALUES (",
      "    student_id,",
      "    student_email,",
      "    student_name,",
      "    'student',",
      "    student_grade,",
      "    NULLIF(student_phone, ''),",
      "    NOW(),",
      "    NOW()",
      "  )",
      "  ON CONFLICT (id) DO UPDATE",
      "  SET",
      "    email = EXCLUDED.email,",
      "    full_name = EXCLUDED.full_name,",
      "    role = EXCLUDED.role,",
      "    student_grade = EXCLUDED.student_grade,",
      "    phone_number = EXCLUDED.phone_number,",
      "    updated_at = NOW();",
      "",
      "  RAISE NOTICE '✅ Created student: % (% / %)', student_name, student_email, student_grade;",
      "END $$;",
    ].join("\n")
  })

  const header = [
    "-- Generated SQL to create students from Google Form responses",
    `-- Generated at: ${new Date().toISOString()}`,
    "",
  ]

  return `${header.join("\n")}${blocks.join("\n\n")}\n`
}

function escapeCsv(value) {
  if (value == null) return ""
  const needsQuotes = /[",\n\r]/.test(value)
  const escaped = value.replace(/"/g, '""')
  return needsQuotes ? `"${escaped}"` : escaped
}

function generateCsv(records) {
  const header = ["full_name", "email", "password", "phone_number", "student_grade"]
  const rows = records.map((record) => [
    record.fullName,
    record.email,
    record.password,
    record.phone,
    record.grade,
  ])

  return [header, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n")
}

function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV file not found at ${CSV_PATH}`)
    process.exit(1)
  }

  const csvText = fs.readFileSync(CSV_PATH, "utf8")
  const [header, ...dataRows] = parseCsv(csvText)

  if (!header) {
    console.error("CSV appears to be empty")
    process.exit(1)
  }

  const rows = dataRows
    .map((row) => row.slice(0, 5))
    .filter((row) => row.length >= 5)

  const deduped = new Map()

  rows.forEach((row) => {
    const [, rawFullName = "", rawEmail = "", rawPhone = "", rawGrade = ""] = row.map(
      (value) => (value || "").trim()
    )

    const email = rawEmail.toLowerCase()
    if (!email) return

    if (!deduped.has(email)) {
      const fullName = normaliseWhitespace(rawFullName)
      const phone = normaliseWhitespace(rawPhone)
      const grade = mapGrade(rawGrade || "Starter Grade")
      const password = extractSurname(fullName) || "changeme"

      deduped.set(email, {
        fullName,
        email,
        phone,
        grade,
        password,
      })
    }
  })

  const records = Array.from(deduped.values())

  const sql = generateSql(records)
  fs.writeFileSync(SQL_OUTPUT_PATH, sql, "utf8")

  const csvOutput = generateCsv(records)
  fs.writeFileSync(CSV_OUTPUT_PATH, `${csvOutput}\n`, "utf8")

  console.log(`Generated SQL for ${records.length} students.`)
  console.log(`SQL output written to ${SQL_OUTPUT_PATH}`)
  console.log(`CSV output written to ${CSV_OUTPUT_PATH}`)
}

main()



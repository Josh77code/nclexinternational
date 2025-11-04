# How to Import Students from Excel File

## 📋 Quick Start

### Option 1: Upload Excel File Directly (Easiest)

1. **Prepare your Excel file** with these columns:
   - `email` (required)
   - `password` (required)
   - `full_name` (required)
   - `phone_number` (optional)
   - `student_grade` (required: `starter`, `mid`, or `higher`)

2. **Upload the Excel file** in this conversation

3. **I'll generate SQL** to create all student accounts

4. **Copy and run the SQL** in Supabase SQL Editor

5. **Done!** ✅ All students created with their grades

---

### Option 2: Use the Script (Advanced)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Prepare your Excel file:**
   - Name it `students.xlsx`
   - Place it in the project root directory
   - Or update the filename in `scripts/excel-to-sql-generator.js`

3. **Run the script:**
   ```bash
   npm run generate-students
   # or
   node scripts/excel-to-sql-generator.js
   ```

4. **Get the generated SQL:**
   - Open `generated-students.sql`
   - Copy all the SQL
   - Paste into Supabase SQL Editor
   - Run the queries

5. **Done!** ✅ All students created

---

## 📊 Excel File Format

Your Excel file should look like this:

| email | password | full_name | phone_number | student_grade |
|-------|----------|-----------|--------------|--------------|
| john.doe@example.com | John2024! | John Doe | +1234567890 | starter |
| jane.smith@example.com | Jane2024! | Jane Smith | +1234567891 | mid |
| bob.johnson@example.com | Bob2024! | Bob Johnson | +1234567892 | higher |

### Column Details:

1. **email** (Required)
   - Must be valid email format
   - Must be unique
   - Example: `student@example.com`

2. **password** (Required)
   - Minimum 6 characters (recommended: 8+)
   - Mix of letters, numbers, symbols
   - Example: `Student2024!`
   - Will be hashed with bcrypt automatically

3. **full_name** (Required)
   - Student's full name
   - Example: `John Doe`

4. **phone_number** (Optional)
   - Can be empty
   - Format: `+1234567890` or `1234567890`
   - Example: `+1234567890`

5. **student_grade** (Required)
   - Must be exactly: `starter`, `mid`, or `higher`
   - Case-sensitive (lowercase)
   - Example: `starter`

---

## 📝 Example Excel File

### CSV Format (Alternative)

You can also use CSV format:

```csv
email,password,full_name,phone_number,student_grade
john.doe@example.com,John2024!,John Doe,+1234567890,starter
jane.smith@example.com,Jane2024!,Jane Smith,+1234567891,mid
bob.johnson@example.com,Bob2024!,Bob Johnson,+1234567892,higher
```

---

## ✅ What Happens When You Upload

1. **I read your Excel file** - Parse all student data
2. **Validate the data** - Check for required fields and format
3. **Generate SQL queries** - Create INSERT statements for each student
4. **Hash passwords** - Use bcrypt for secure password storage
5. **Assign grades** - Set student_grade category for each student
6. **Handle duplicates** - Check if students already exist

---

## 🎯 Generated SQL Format

The generated SQL will look like this:

```sql
-- Student 1: John Doe
DO $$
DECLARE
  student_id UUID;
  student_email TEXT := 'john.doe@example.com';
  student_password TEXT := 'John2024!';
  student_name TEXT := 'John Doe';
  student_phone TEXT := '+1234567890';
  student_grade TEXT := 'starter';
BEGIN
  -- Check if exists
  IF EXISTS (SELECT 1 FROM public.users WHERE email = student_email) THEN
    RAISE NOTICE '⚠️  Student already exists: %', student_email;
    RETURN;
  END IF;
  
  -- Create student...
END $$;
```

---

## ⚠️ Important Notes

1. **Password Security:**
   - Passwords are hashed with bcrypt
   - Cannot be reversed or decrypted
   - Each password has a unique salt

2. **Duplicate Handling:**
   - Script checks if student exists
   - If exists, skips creation
   - No errors, just warnings

3. **Grade Validation:**
   - Must be: `starter`, `mid`, or `higher`
   - Case-insensitive in script
   - Defaults to `starter` if invalid

4. **Email Format:**
   - Must be valid email
   - Must be unique
   - Used for login

---

## 🚀 Ready to Upload?

1. **Prepare your Excel file** with the format above
2. **Upload it here** in this conversation
3. **I'll process it** and generate SQL
4. **You run the SQL** in Supabase
5. **All students created!** 🎉

---

## 📋 Checklist

- [ ] Excel file has required columns
- [ ] Email addresses are valid and unique
- [ ] Passwords are strong (8+ characters)
- [ ] Grades are: `starter`, `mid`, or `higher`
- [ ] File is saved as `.xlsx` or `.csv`
- [ ] Ready to upload!

---

**Just upload your Excel file and I'll help you create all the student accounts!** 📊✨


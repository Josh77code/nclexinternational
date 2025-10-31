# Weekly Questions Upload - Complete Setup Guide

This guide will help you set up the weekly CSV question upload feature for your NCLEX Keys platform.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Get Supabase Service Role Key](#step-1-get-supabase-service-role-key)
3. [Step 2: Configure Environment Variables](#step-2-configure-environment-variables)
4. [Step 3: Test the Upload Feature](#step-3-test-the-upload-feature)
5. [Step 4: Weekly Workflow](#step-4-weekly-workflow)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Access to your Supabase project dashboard
- Access to your Vercel project settings (or your hosting platform)
- Admin/instructor account on your platform

---

## Step 1: Get Supabase Service Role Key

The Service Role Key allows the API to bypass Row Level Security (RLS) and insert questions directly.

### Instructions:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in to your account
   - Select your project

2. **Navigate to Settings**
   - Click on **Settings** (gear icon) in the left sidebar
   - Click on **API** in the settings menu

3. **Find the Service Role Key**
   - Scroll down to the **Project API keys** section
   - Find **`service_role`** key (⚠️ This is secret - never expose in client code)
   - Click the **👁️ eye icon** to reveal it
   - **Copy this key** - you'll need it in Step 2

4. **Also note your Project URL**
   - At the top, you'll see **Project URL**
   - Copy this URL as well

**⚠️ Security Note:** The `service_role` key has full access to your database. Keep it secure and never commit it to version control.

---

## Step 2: Configure Environment Variables

You need to set up environment variables in two places:
- **Local development** (`.env.local` file)
- **Vercel/Production** (Vercel dashboard)

### For Local Development:

1. **Create/Edit `.env.local` file** in your project root:
   ```bash
   # If file doesn't exist, create it:
   touch .env.local
   ```

2. **Add these variables** to `.env.local`:
   ```env
   # Supabase Configuration (Required)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

   # Upload Protection (Optional but Recommended)
   UPLOAD_TOKEN=your-random-secure-string-here
   NEXT_PUBLIC_UPLOAD_TOKEN=your-random-secure-string-here
   ```

3. **Replace the values:**
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (from Step 1)
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (from Step 1)
   - `UPLOAD_TOKEN` & `NEXT_PUBLIC_UPLOAD_TOKEN`: Generate a random secure string (same value for both)
     - Example: `UPLOAD_TOKEN=abc123xyz789secure` (use something stronger in production!)

### For Vercel (Production):

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Navigate to Settings**
   - Click **Settings** tab
   - Click **Environment Variables** in the left menu

3. **Add Environment Variables**
   Click **Add New** and add each variable:

   | Variable Name | Value | Environment |
   |--------------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Production, Preview, Development |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Production, Preview, Development |
   | `UPLOAD_TOKEN` | Your random secure string | Production, Preview, Development |
   | `NEXT_PUBLIC_UPLOAD_TOKEN` | Same as UPLOAD_TOKEN | Production, Preview, Development |

4. **Save and Redeploy**
   - After adding all variables, you may need to **Redeploy** your project for changes to take effect
   - Go to **Deployments** → Click **⋮** → **Redeploy**

---

## Step 3: Test the Upload Feature

1. **Install dependencies locally** (if not already done):
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start your development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Access the Upload Page**:
   - Navigate to: `http://localhost:3000/dashboard/instructor/upload-questions`
   - Or go to Instructor Dashboard and click **"Upload Questions"** button

4. **Download the Template**:
   - Click **"Download Template"** button
   - This downloads `questions-template.csv`

5. **Test with Sample Data**:
   - Open the CSV template in Excel/Google Sheets
   - Fill in at least 2-3 sample questions:
     ```
     question_text,option_a,option_b,option_c,option_d,correct_answer,explanation,category,difficulty_level
     What is the priority intervention for dyspnea?,Elevate head,Increase fluids,Apply cold compress,Ambulate,B,Improves ventilation,Respiratory,medium
     Which electrolyte is monitored with furosemide?,Sodium,Potassium,Calcium,Magnesium,B,Causes hypokalemia,Cardiovascular,medium
     ```
   - Save as CSV

6. **Upload and Verify**:
   - Go back to upload page
   - Select your CSV file
   - Click **"Upload CSV"**
   - You should see a success message with number of questions inserted
   - Check your Supabase dashboard → `exam_questions` table to verify questions were added

---

## Step 4: Weekly Workflow

### Every Week (Recommended: Friday):

1. **Prepare Your Questions** (Monday-Thursday)
   - Create questions in your preferred format (Word, Google Docs, etc.)

2. **Format as CSV** (Thursday/Friday)
   - Open Excel or Google Sheets
   - Use the template format:
     ```
     question_text,option_a,option_b,option_c,option_d,correct_answer,explanation,category,difficulty_level
     ```
   - Fill in all required columns:
     - **question_text**: The question (required)
     - **option_a, option_b, option_c, option_d**: Answer choices (all required)
     - **correct_answer**: Must be A, B, C, or D (required)
     - **explanation**: Why the answer is correct (optional but recommended)
     - **category**: e.g., "Cardiovascular", "Respiratory" (optional)
     - **difficulty_level**: Must be "easy", "medium", or "hard" (optional, defaults to "medium")

3. **Upload via Dashboard** (Friday)
   - Log in as instructor
   - Go to `/dashboard/instructor/upload-questions`
   - Select your CSV file
   - Click **"Upload CSV"**
   - Verify success message

4. **Verify Questions** (After Upload)
   - Test a sample question in the exam interface
   - Check that questions appear correctly

---

## CSV Format Requirements

### Required Columns:
- `question_text` - The question text
- `option_a` - First answer choice
- `option_b` - Second answer choice  
- `option_c` - Third answer choice
- `option_d` - Fourth answer choice
- `correct_answer` - Must be exactly: `A`, `B`, `C`, or `D`

### Optional Columns:
- `explanation` - Explanation for the correct answer
- `category` - Category name (e.g., "Cardiovascular", "Pharmacology")
- `difficulty_level` - Must be: `easy`, `medium`, or `hard` (defaults to "medium" if empty)

### Example CSV:
```csv
question_text,option_a,option_b,option_c,option_d,correct_answer,explanation,category,difficulty_level
What is the priority intervention for a client with dyspnea?,Elevate head of bed,Increase IV fluids,Apply cold compress,Ambulate client,B,Improves ventilation and reduces work of breathing,Respiratory,medium
Which electrolyte is monitored with furosemide therapy?,Sodium,Potassium,Calcium,Magnesium,B,Loop diuretics may cause hypokalemia,Cardiovascular,medium
A client with MI should be monitored for which complication?,Pulmonary edema,Hyperglycemia,Hypothermia,Bradycardia,A,Left ventricular dysfunction increases pulmonary pressure,Cardiovascular,hard
```

### CSV Best Practices:
- ✅ Use commas to separate columns
- ✅ Enclose text with commas in quotes: `"Text, with comma"`
- ✅ Save as UTF-8 encoding
- ✅ No empty rows between questions
- ✅ Use consistent category names

---

## Troubleshooting

### ❌ Error: "Missing Supabase env vars for admin client"
**Solution:** Make sure `SUPABASE_SERVICE_ROLE_KEY` is set in your environment variables (both local `.env.local` and Vercel)

### ❌ Error: "Unauthorized" (401)
**Solution:** 
- If you set `UPLOAD_TOKEN`, make sure `NEXT_PUBLIC_UPLOAD_TOKEN` matches it in client-side code
- Or remove the token check from the API route if you don't want protection

### ❌ Error: "Missing fields or invalid correct_answer"
**Solution:** 
- Ensure all required columns are present
- Check that `correct_answer` is exactly A, B, C, or D (case-insensitive but must be one of these)

### ❌ Error: "Invalid difficulty_level"
**Solution:** 
- `difficulty_level` must be: `easy`, `medium`, or `hard`
- Leave it empty to default to "medium"

### ❌ Questions not appearing in exam
**Solution:** 
- Check Supabase `exam_questions` table to verify questions were inserted
- Verify your exam page query isn't filtering out the questions

### ❌ CSV parse errors
**Solution:**
- Open CSV in a text editor and check for special characters
- Ensure proper CSV encoding (UTF-8)
- Check that commas inside text are properly quoted

### ❌ "No valid rows to insert"
**Solution:**
- Verify at least one row has all required fields
- Check for empty rows in your CSV
- Ensure correct_answer column has valid values (A, B, C, or D)

---

## Security Best Practices

1. **Never commit `.env.local` to git** - It's already in `.gitignore`
2. **Keep Service Role Key secret** - Never expose in client-side code
3. **Use UPLOAD_TOKEN** - Recommended to prevent unauthorized uploads
4. **Restrict access** - Only give instructor dashboard access to trusted users
5. **Monitor uploads** - Regularly check Supabase for unexpected insertions

---

## Quick Reference

### Environment Variables Checklist:
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Set in local and Vercel
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Set in local and Vercel
- [ ] `UPLOAD_TOKEN` - Set in local and Vercel (optional)
- [ ] `NEXT_PUBLIC_UPLOAD_TOKEN` - Set in local and Vercel (optional, must match UPLOAD_TOKEN)

### Access Points:
- **Upload Page:** `/dashboard/instructor/upload-questions`
- **Instructor Dashboard:** `/dashboard/instructor` (has "Upload Questions" button)
- **Template Download:** `/questions-template.csv`

### Support:
- Check Supabase logs in dashboard if uploads fail
- Check browser console for client-side errors
- Check Vercel function logs for API errors

---

## Need Help?

If you encounter issues not covered in this guide:
1. Check browser console for errors
2. Check Vercel function logs
3. Verify all environment variables are set correctly
4. Test with a minimal CSV (2-3 questions) first
5. Ensure you're logged in as an instructor/admin

---

**Last Updated:** After implementing weekly CSV upload feature
**Version:** 1.0


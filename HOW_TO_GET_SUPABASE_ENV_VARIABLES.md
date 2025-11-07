# How to Get Supabase Environment Variables

## 📋 Step-by-Step Guide

### Step 1: Log in to Supabase

1. Go to https://supabase.com
2. Click **"Sign In"** or **"Log In"**
3. Enter your credentials

---

### Step 2: Select Your Project

1. After logging in, you'll see your project dashboard
2. If you have multiple projects, select the one you want to use
3. Click on your project name

---

### Step 3: Get Your Project URL

1. In your project dashboard, look for **"Project Settings"** in the left sidebar
2. Click on **"Project Settings"** (gear icon)
3. Scroll down to **"Project URL"** section
4. Copy the URL - this is your `NEXT_PUBLIC_SUPABASE_URL`

**Example:**
```
https://bpyqsxwbxsfozdzustgy.supabase.co
```

---

### Step 4: Get Your Anonymous Key (Anon Key)

1. Still in **"Project Settings"**
2. Click on **"API"** in the left sidebar (under Project Settings)
3. Look for **"Project API keys"** section
4. Find the key labeled **"anon"** or **"public"**
5. Click the **"Reveal"** or **"Copy"** button next to it
6. This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pdenVzdGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNzk1OTcsImV4cCI6MjA3NDg1NTU5N30.bDrvbgAmKuBMCeGGlzpF7vzYdwdH7iq3cCxrMnBVNt8
```

---

### Step 5: Get Your Service Role Key

1. Still in **"Project Settings"** → **"API"**
2. In the **"Project API keys"** section
3. Find the key labeled **"service_role"** or **"secret"**
4. **⚠️ WARNING:** This key has admin privileges - keep it secret!
5. Click the **"Reveal"** or **"Copy"** button next to it
6. This is your `SUPABASE_SERVICE_ROLE_KEY`

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pdenVzdGd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI3OTU5NywiZXhwIjoyMDc0ODU1NTk3fQ.Ljs6egHOepdaxg8PxGTcPI7sprg20-RavNZULp37I6M
```

---

### Step 6: Get Development Redirect URL (Optional)

1. Still in **"Project Settings"**
2. Click on **"Authentication"** in the left sidebar
3. Scroll down to **"URL Configuration"** or **"Redirect URLs"**
4. Add your development URL (e.g., `http://localhost:3000`)
5. Or use your production URL (e.g., `https://your-domain.vercel.app`)
6. This is your `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`

**Example:**
```
http://localhost:3000
```
or
```
https://nclexkeyswebsite.vercel.app
```

---

## 📝 Create Your .env.local File

Once you have all the values, create a `.env.local` file in your project root:

### Option 1: Use the Batch Script

Run the provided script:
```bash
create-env.bat
```

### Option 2: Create Manually

Create a file named `.env.local` in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

**Replace:**
- `https://your-project-id.supabase.co` with your actual Supabase URL
- `your-anon-key-here` with your actual anon key
- `your-service-role-key-here` with your actual service role key
- `http://localhost:3000` with your development URL

---

## 🎯 Quick Reference: Where to Find Each Value

| Variable | Location in Supabase |
|----------|---------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → service_role key |
| `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | Project Settings → Authentication → Redirect URLs |

---

## 🔒 Security Notes

1. **Never commit `.env.local` to GitHub** - It's already in `.gitignore`
2. **Service Role Key is secret** - Never expose it in client-side code
3. **Anon Key is public** - Safe to use in client-side code (it's in `NEXT_PUBLIC_`)
4. **For Production** - Set these in Vercel/your hosting platform's environment variables

---

## ✅ Verification

After creating your `.env.local` file, verify it works:

1. Restart your development server
2. Check the console for any Supabase connection errors
3. Try logging in to verify authentication works

---

## 🚀 For Production (Vercel)

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (optional)
4. Redeploy your application

---

## 📸 Visual Guide

### Finding Project URL:
```
Supabase Dashboard
  → Project Settings (gear icon)
    → General
      → Project URL: https://xxxxx.supabase.co
```

### Finding API Keys:
```
Supabase Dashboard
  → Project Settings (gear icon)
    → API
      → Project API keys
        → anon/public (for NEXT_PUBLIC_SUPABASE_ANON_KEY)
        → service_role (for SUPABASE_SERVICE_ROLE_KEY)
```

---

## 🆘 Troubleshooting

### "Cannot find Project Settings"
- Make sure you're logged in
- Make sure you've selected the correct project
- Look for the gear icon (⚙️) in the left sidebar

### "Keys not showing"
- Click "Reveal" button to show hidden keys
- Make sure you have admin access to the project

### "Connection errors"
- Verify the URL is correct (no trailing slash)
- Check that keys are copied completely (no spaces)
- Restart your development server after creating `.env.local`

---

## 📋 Summary

1. **Log in** to Supabase
2. **Go to Project Settings** → **API**
3. **Copy** the Project URL → `NEXT_PUBLIC_SUPABASE_URL`
4. **Copy** the anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **Copy** the service_role key → `SUPABASE_SERVICE_ROLE_KEY`
6. **Set redirect URL** → `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (optional)
7. **Create `.env.local`** file with all values
8. **Restart** your development server

Done! ✅



## 📋 Step-by-Step Guide

### Step 1: Log in to Supabase

1. Go to https://supabase.com
2. Click **"Sign In"** or **"Log In"**
3. Enter your credentials

---

### Step 2: Select Your Project

1. After logging in, you'll see your project dashboard
2. If you have multiple projects, select the one you want to use
3. Click on your project name

---

### Step 3: Get Your Project URL

1. In your project dashboard, look for **"Project Settings"** in the left sidebar
2. Click on **"Project Settings"** (gear icon)
3. Scroll down to **"Project URL"** section
4. Copy the URL - this is your `NEXT_PUBLIC_SUPABASE_URL`

**Example:**
```
https://bpyqsxwbxsfozdzustgy.supabase.co
```

---

### Step 4: Get Your Anonymous Key (Anon Key)

1. Still in **"Project Settings"**
2. Click on **"API"** in the left sidebar (under Project Settings)
3. Look for **"Project API keys"** section
4. Find the key labeled **"anon"** or **"public"**
5. Click the **"Reveal"** or **"Copy"** button next to it
6. This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pdenVzdGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNzk1OTcsImV4cCI6MjA3NDg1NTU5N30.bDrvbgAmKuBMCeGGlzpF7vzYdwdH7iq3cCxrMnBVNt8
```

---

### Step 5: Get Your Service Role Key

1. Still in **"Project Settings"** → **"API"**
2. In the **"Project API keys"** section
3. Find the key labeled **"service_role"** or **"secret"**
4. **⚠️ WARNING:** This key has admin privileges - keep it secret!
5. Click the **"Reveal"** or **"Copy"** button next to it
6. This is your `SUPABASE_SERVICE_ROLE_KEY`

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pdenVzdGd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI3OTU5NywiZXhwIjoyMDc0ODU1NTk3fQ.Ljs6egHOepdaxg8PxGTcPI7sprg20-RavNZULp37I6M
```

---

### Step 6: Get Development Redirect URL (Optional)

1. Still in **"Project Settings"**
2. Click on **"Authentication"** in the left sidebar
3. Scroll down to **"URL Configuration"** or **"Redirect URLs"**
4. Add your development URL (e.g., `http://localhost:3000`)
5. Or use your production URL (e.g., `https://your-domain.vercel.app`)
6. This is your `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`

**Example:**
```
http://localhost:3000
```
or
```
https://nclexkeyswebsite.vercel.app
```

---

## 📝 Create Your .env.local File

Once you have all the values, create a `.env.local` file in your project root:

### Option 1: Use the Batch Script

Run the provided script:
```bash
create-env.bat
```

### Option 2: Create Manually

Create a file named `.env.local` in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

**Replace:**
- `https://your-project-id.supabase.co` with your actual Supabase URL
- `your-anon-key-here` with your actual anon key
- `your-service-role-key-here` with your actual service role key
- `http://localhost:3000` with your development URL

---

## 🎯 Quick Reference: Where to Find Each Value

| Variable | Location in Supabase |
|----------|---------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → service_role key |
| `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | Project Settings → Authentication → Redirect URLs |

---

## 🔒 Security Notes

1. **Never commit `.env.local` to GitHub** - It's already in `.gitignore`
2. **Service Role Key is secret** - Never expose it in client-side code
3. **Anon Key is public** - Safe to use in client-side code (it's in `NEXT_PUBLIC_`)
4. **For Production** - Set these in Vercel/your hosting platform's environment variables

---

## ✅ Verification

After creating your `.env.local` file, verify it works:

1. Restart your development server
2. Check the console for any Supabase connection errors
3. Try logging in to verify authentication works

---

## 🚀 For Production (Vercel)

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (optional)
4. Redeploy your application

---

## 📸 Visual Guide

### Finding Project URL:
```
Supabase Dashboard
  → Project Settings (gear icon)
    → General
      → Project URL: https://xxxxx.supabase.co
```

### Finding API Keys:
```
Supabase Dashboard
  → Project Settings (gear icon)
    → API
      → Project API keys
        → anon/public (for NEXT_PUBLIC_SUPABASE_ANON_KEY)
        → service_role (for SUPABASE_SERVICE_ROLE_KEY)
```

---

## 🆘 Troubleshooting

### "Cannot find Project Settings"
- Make sure you're logged in
- Make sure you've selected the correct project
- Look for the gear icon (⚙️) in the left sidebar

### "Keys not showing"
- Click "Reveal" button to show hidden keys
- Make sure you have admin access to the project

### "Connection errors"
- Verify the URL is correct (no trailing slash)
- Check that keys are copied completely (no spaces)
- Restart your development server after creating `.env.local`

---

## 📋 Summary

1. **Log in** to Supabase
2. **Go to Project Settings** → **API**
3. **Copy** the Project URL → `NEXT_PUBLIC_SUPABASE_URL`
4. **Copy** the anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **Copy** the service_role key → `SUPABASE_SERVICE_ROLE_KEY`
6. **Set redirect URL** → `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (optional)
7. **Create `.env.local`** file with all values
8. **Restart** your development server

Done! ✅




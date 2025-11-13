# Environment Variables Template

## 📝 .env.local File Template

Create a file named `.env.local` in your project root directory with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: Development Redirect URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Optional: Upload Token (if using question upload API)
UPLOAD_TOKEN=your-upload-token-here
```

---

## 🔍 How to Get Each Value

### 1. NEXT_PUBLIC_SUPABASE_URL

**Location:** Supabase Dashboard → Project Settings → General → Project URL

**Steps:**
1. Log in to https://supabase.com
2. Select your project
3. Click **Project Settings** (gear icon ⚙️)
4. Scroll to **"Project URL"**
5. Copy the URL

**Example:**
```
https://bpyqsxwbxsfozdzustgy.supabase.co
```

---

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY

**Location:** Supabase Dashboard → Project Settings → API → Project API keys → anon/public

**Steps:**
1. In Project Settings, click **"API"** in the left sidebar
2. Find **"Project API keys"** section
3. Look for **"anon"** or **"public"** key
4. Click **"Reveal"** or **"Copy"** button
5. Copy the key

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pdenVzdGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNzk1OTcsImV4cCI6MjA3NDg1NTU5N30.bDrvbgAmKuBMCeGGlzpF7vzYdwdH7iq3cCxrMnBVNt8
```

---

### 3. SUPABASE_SERVICE_ROLE_KEY

**Location:** Supabase Dashboard → Project Settings → API → Project API keys → service_role

**Steps:**
1. In Project Settings → API
2. Find **"Project API keys"** section
3. Look for **"service_role"** key
4. Click **"Reveal"** or **"Copy"** button
5. Copy the key

**⚠️ WARNING:** This key has admin privileges. Keep it secret and never commit it to GitHub!

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pdenVzdGd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI3OTU5NywiZXhwIjoyMDc0ODU1NTk3fQ.Ljs6egHOepdaxg8PxGTcPI7sprg20-RavNZULp37I6M
```

---

### 4. NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL (Optional)

**Location:** Supabase Dashboard → Project Settings → Authentication → URL Configuration

**Steps:**
1. In Project Settings, click **"Authentication"**
2. Scroll to **"URL Configuration"** or **"Redirect URLs"**
3. Add your development URL (e.g., `http://localhost:3000`)
4. Or use your production URL

**Example:**
```
http://localhost:3000
```
or
```
https://nclexkeyswebsite.vercel.app
```

---

## 🎯 Quick Steps Summary

1. **Go to:** https://supabase.com/dashboard
2. **Select your project**
3. **Click:** Project Settings (⚙️ icon)
4. **Get URL:** General → Project URL
5. **Get Keys:** API → Project API keys
   - Copy **anon** key
   - Copy **service_role** key
6. **Set Redirect:** Authentication → Redirect URLs (optional)

---

## ✅ After Creating .env.local

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Verify it works:**
   - Check console for errors
   - Try logging in
   - Test database connections

---

## 🔒 Security Checklist

- [ ] `.env.local` is in `.gitignore` (should be automatically)
- [ ] Never commit `.env.local` to GitHub
- [ ] Service Role Key is kept secret
- [ ] For production, set variables in Vercel/hosting platform

---

## 📚 Need More Help?

See `HOW_TO_GET_SUPABASE_ENV_VARIABLES.md` for detailed step-by-step instructions with screenshots guidance.



## 📝 .env.local File Template

Create a file named `.env.local` in your project root directory with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: Development Redirect URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Optional: Upload Token (if using question upload API)
UPLOAD_TOKEN=your-upload-token-here
```

---

## 🔍 How to Get Each Value

### 1. NEXT_PUBLIC_SUPABASE_URL

**Location:** Supabase Dashboard → Project Settings → General → Project URL

**Steps:**
1. Log in to https://supabase.com
2. Select your project
3. Click **Project Settings** (gear icon ⚙️)
4. Scroll to **"Project URL"**
5. Copy the URL

**Example:**
```
https://bpyqsxwbxsfozdzustgy.supabase.co
```

---

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY

**Location:** Supabase Dashboard → Project Settings → API → Project API keys → anon/public

**Steps:**
1. In Project Settings, click **"API"** in the left sidebar
2. Find **"Project API keys"** section
3. Look for **"anon"** or **"public"** key
4. Click **"Reveal"** or **"Copy"** button
5. Copy the key

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pdenVzdGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNzk1OTcsImV4cCI6MjA3NDg1NTU5N30.bDrvbgAmKuBMCeGGlzpF7vzYdwdH7iq3cCxrMnBVNt8
```

---

### 3. SUPABASE_SERVICE_ROLE_KEY

**Location:** Supabase Dashboard → Project Settings → API → Project API keys → service_role

**Steps:**
1. In Project Settings → API
2. Find **"Project API keys"** section
3. Look for **"service_role"** key
4. Click **"Reveal"** or **"Copy"** button
5. Copy the key

**⚠️ WARNING:** This key has admin privileges. Keep it secret and never commit it to GitHub!

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pdenVzdGd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI3OTU5NywiZXhwIjoyMDc0ODU1NTk3fQ.Ljs6egHOepdaxg8PxGTcPI7sprg20-RavNZULp37I6M
```

---

### 4. NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL (Optional)

**Location:** Supabase Dashboard → Project Settings → Authentication → URL Configuration

**Steps:**
1. In Project Settings, click **"Authentication"**
2. Scroll to **"URL Configuration"** or **"Redirect URLs"**
3. Add your development URL (e.g., `http://localhost:3000`)
4. Or use your production URL

**Example:**
```
http://localhost:3000
```
or
```
https://nclexkeyswebsite.vercel.app
```

---

## 🎯 Quick Steps Summary

1. **Go to:** https://supabase.com/dashboard
2. **Select your project**
3. **Click:** Project Settings (⚙️ icon)
4. **Get URL:** General → Project URL
5. **Get Keys:** API → Project API keys
   - Copy **anon** key
   - Copy **service_role** key
6. **Set Redirect:** Authentication → Redirect URLs (optional)

---

## ✅ After Creating .env.local

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Verify it works:**
   - Check console for errors
   - Try logging in
   - Test database connections

---

## 🔒 Security Checklist

- [ ] `.env.local` is in `.gitignore` (should be automatically)
- [ ] Never commit `.env.local` to GitHub
- [ ] Service Role Key is kept secret
- [ ] For production, set variables in Vercel/hosting platform

---

## 📚 Need More Help?

See `HOW_TO_GET_SUPABASE_ENV_VARIABLES.md` for detailed step-by-step instructions with screenshots guidance.






























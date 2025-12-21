# 🚀 SiteGround Deployment Profile (সম্পূর্ণ Ready-to-Deploy)

## 📦 এটি কি?

এটি একটি **সম্পূর্ণ deployment configuration** যা আপনার সাইটকে SiteGround-এ তাৎক্ষণিক চালু করতে পারে। শুধু আপলোড করুন এবং কাজ হয়ে যাবে!

---

## 📋 আপনার Project Details

```
Project Name: GreenGrass Store
Framework: React 18 + Vite + TypeScript
Backend: Supabase PostgreSQL
Hosting: SiteGround
Domain: [আপনার domain]
```

### Supabase Configuration (ইতিমধ্যে Setup)
```
Project URL: https://fwkouvwabyftfhcsnfgm.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3a291dndhYnlmdGZoY3NuZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NjU0NTMsImV4cCI6MjA4MDQ0MTQ1M30.HYlXLFmk5wwdzrsiG_OxI_Sn8Ncu1jUyBX6yxHlNGJs
```

---

## 🎯 ডিপ্লয়মেন্ট Steps (মাত্র ৩ ধাপ!)

### Step 1️⃣: Build করুন (Local Machine)

```bash
# Terminal/Command Prompt খুলুন এবং প্রজেক্ট folder-এ যান
cd "greengrassstore-vs cod"

# Dependencies install করুন (প্রথমবার)
npm install

# Production build তৈরি করুন
npm run build
```

✅ এটি `dist/` folder-এ সব files তৈরি করবে

---

### Step 2️⃣: SiteGround-এ Upload করুন

**সাইট ম্যানেজার দিয়ে (সবচেয়ে সহজ):**

1. SiteGround Dashboard খুলুন
2. **File Manager** → **public_html** folder
3. এই files/folders upload করুন:
   ```
   dist/ এর সব content:
   ✓ index.html
   ✓ assets/ (সম্পূর্ণ folder)
   ✓ robots.txt
   
   Project root থেকে:
   ✓ .htaccess (এই file টি)
   ```

**ধাপে ধাপে:**
```
public_html এ:
1. সব পুরাতন files delete করুন
2. dist/index.html upload করুন
3. dist/assets/ folder upload করুন
4. .htaccess file upload করুন
```

---

### Step 3️⃣: Installation Complete করুন

**Browser এ এই URL খুলুন:**
```
https://yourdomain.com/install
```

**এখানে:**
1. Admin Email: আপনার email দিন
2. Admin Password: শক্তিশালী password (12+ characters)
3. Store Name: "GreenGrass Store"
4. Create Admin Account ক্লিক করুন

✅ **হয়ে গেছে! আপনার site live!**

---

## 📁 What's Included

### 1. `.htaccess` File
- ✅ React Router SPA routing
- ✅ GZIP compression
- ✅ Browser caching
- ✅ Security headers (XSS, Clickjacking protection)
- ✅ PHP API routes support
- ✅ HTTPS redirect ready

### 2. `dist/` Folder (Build থেকে)
- ✅ All JavaScript bundles
- ✅ CSS files
- ✅ Asset images
- ✅ index.html

### 3. `public/api/` Folder (Optional)
- ✅ PHP backend files
- ✅ Database config
- ✅ API endpoints

---

## 🔐 Security Already Configured

✅ XSS Protection Header  
✅ Clickjacking Prevention  
✅ MIME-sniffing Protection  
✅ Content Security Policy  
✅ Sensitive Files Blocked (.env, .sql)  
✅ Directory Browsing Disabled  

---

## ⚡ Performance Already Optimized

✅ GZIP Compression Enabled  
✅ Browser Caching Headers Set  
✅ Image Caching: 1 year  
✅ CSS/JS Caching: 1 month  
✅ HTML Caching: 2 days  

---

## 🔧 কাস্টমাইজেশন (যদি প্রয়োজন)

### HTTP to HTTPS Redirect (SSL Active হওয়ার পরে)

`.htaccess` file এ এটি already uncommented আছে। SSL activate করলে automatic HTTPS redirect হবে।

### CSP Policy সম্পাদনা

আপনার external APIs থাকলে এটি edit করুন:
```
Header always set Content-Security-Policy "default-src 'self'; ..."
```

---

## ✅ Checklist Before Upload

- [ ] `npm run build` চালিয়েছেন এবং `dist/` folder created হয়েছে
- [ ] SiteGround account এ login করতে পারেন
- [ ] Domain এ access আছে (custom domain অথবা SiteGround provided)
- [ ] `.htaccess` file ready আছে (এটি এখানেই আছে)
- [ ] Admin email ঠিক আছে
- [ ] Admin password ready আছে (12+ characters)

---

## 🚀 Quick Upload Guide

### Using SiteGround File Manager:

1. **Login করুন** → https://www.siteground.com
2. **Hosting** → **File Manager**
3. **public_html** folder খুলুন
4. **Delete** করুন: পুরাতন index.html, assets/
5. **Upload** করুন:
   - `dist/index.html`
   - `dist/assets/` (সম্পূর্ণ folder)
   - `.htaccess` (এই file)

### Using FTP (Advanced):

```
Host: yourdomain.com
Port: 21 (FTP) অথবা 22 (SFTP)
Username: [SiteGround cPanel username]
Password: [SiteGround cPanel password]

Upload to: /public_html/
```

---

## 📊 File Structure After Upload

```
public_html/
├── index.html                 ← React app entry point
├── .htaccess                  ← Server configuration
├── robots.txt                 ← SEO configuration
└── assets/
    ├── index-XXXXXX.js       ← Main bundle
    ├── index-XXXXXX.css      ← Styles
    └── [other assets]
```

---

## 🔗 Important URLs After Upload

```
Admin Panel:       https://yourdomain.com/admin
Installation:      https://yourdomain.com/install
Blog:              https://yourdomain.com/blog
Shop:              https://yourdomain.com/shop
API (if enabled):  https://yourdomain.com/api/
```

---

## ⚠️ Common Issues & Fixes

### ❌ White Screen দেখছেন
**সমাধান:**
1. `.htaccess` file আছে কিনা check করুন
2. `index.html` upload হয়েছে কিনা verify করুন
3. Browser console (F12) দেখুন কোন error আছে কিনা

### ❌ 404 Error আসছে
**সমাধান:**
1. সব files properly upload হয়েছে কিনা check করুন
2. `.htaccess` file সঠিক permission আছে কিনা (644)
3. RewriteEngine enabled আছে কিনা

### ❌ Admin page নয় এমন page open হচ্ছে
**সমাধান:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Incognito/Private window এ try করুন
3. Browser console errors দেখুন

### ❌ Database connection error
**সমাধান:**
1. Supabase credentials correct আছে কিনা verify করুন
2. Internet connection check করুন
3. Supabase dashboard-এ project active আছে কিনা দেখুন

---

## 📞 Support এর জন্য প্রয়োজনীয় তথ্য রাখুন

```
1. Domain: [আপনার domain]
2. SiteGround Account Email: [email]
3. Admin Email: [admin email]
4. Build Date: [date যখন npm run build করেছেন]
5. Upload Date: [যখন SiteGround-এ upload করেছেন]
```

---

## 🎉 Success Indicators

✅ Website accessible: https://yourdomain.com  
✅ Admin can login: https://yourdomain.com/admin  
✅ Products display হচ্ছে  
✅ Blog posts show হচ্ছে  
✅ Orders save হচ্ছে  
✅ Emails পাচ্ছেন  

---

## 📝 Version Information

```
Created: December 16, 2025
Tested with: SiteGround Shared Hosting
Node.js: 18+
npm: 9+
React: 18
Vite: Latest
Database: Supabase PostgreSQL
```

---

## 🔄 Future Updates

নতুন feature add করতে:
1. Local এ code edit করুন
2. `npm run build` করুন
3. নতুন `dist/` folder content upload করুন
4. Old files delete করার প্রয়োজন নেই (overwrite হবে)

---

## ✨ Summary

এই profile সহ আপনার website SiteGround-এ **production-ready** আছে!

**সাধারণ ধাপ:**
1. `npm run build` → dist/ তৈরি
2. dist/ + .htaccess upload → public_html
3. `/install` page → Admin account create
4. Done! 🚀

---

**প্রশ্ন থাকলে বা কোনো issue হলে জানান!** 💬

Last Updated: December 16, 2025

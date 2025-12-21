# ✅ SiteGround Upload Checklist

## Pre-Upload (Local Machine)

### 🔧 Build Preparation
- [ ] Terminal/Command Prompt খুলুন
- [ ] Project folder এ navigate করুন
  ```bash
  cd "greengrassstore-vs cod"
  ```
- [ ] Dependencies install করুন (first time only)
  ```bash
  npm install
  ```
- [ ] Production build তৈরি করুন
  ```bash
  npm run build
  ```
- [ ] `dist/` folder created হয়েছে check করুন
- [ ] `.htaccess` file ready আছে check করুন (এটি project root এ আছে)

### 📋 Verification
- [ ] `dist/index.html` exist করে
- [ ] `dist/assets/` folder এ files আছে
- [ ] Build process কোনো error দেখায়নি

---

## SiteGround Preparation

### 🔐 Account Access
- [ ] SiteGround account email আছে
- [ ] SiteGround password আছে
- [ ] Login test করেছেন: https://www.siteground.com

### 📝 Domain Info Collect করুন
- [ ] Domain name: ________________
- [ ] SiteGround provided domain (যদি custom না থাকে): ________________
- [ ] Admin email (for installation): ________________
- [ ] Admin password (12+ chars): ________________

---

## Upload Process (SiteGround File Manager)

### Step 1: File Manager খুলুন
- [ ] SiteGround Dashboard login করুন
- [ ] "File Manager" click করুন
- [ ] "public_html" folder খুলুন
- [ ] Current folder path: `/public_html/` (verify করুন)

### Step 2: পুরাতন Files Delete করুন (যদি থাকে)
- [ ] `index.html` delete করুন (যদি থাকে)
- [ ] `assets/` folder delete করুন (যদি থাকে)
- [ ] সব `.js` ও `.css` files delete করুন
- [ ] ⚠️ `.htaccess` থাকলে বাকি রাখুন (overwrite করবেন)

### Step 3: নতুন Files Upload করুন

#### 3a. index.html Upload
- [ ] Local: `dist/index.html` open করুন
- [ ] SiteGround: File Manager এ Upload button ক্লিক করুন
- [ ] `dist/index.html` select করুন
- [ ] Upload complete হওয়া পর্যন্ত অপেক্ষা করুন
- [ ] ✅ Verification: `public_html/index.html` দেখা যাচ্ছে

#### 3b. assets/ Folder Upload
- [ ] Local: `dist/assets/` folder খুলুন
- [ ] **সব files inside assets/:** Select করুন (Ctrl+A)
- [ ] SiteGround: "Create Folder" → নাম: `assets`
- [ ] এর মধ্যে সব files upload করুন
- [ ] **OR** Direct upload: `dist/assets/*` সব files একসাথে upload করুন
- [ ] ✅ Verification: `public_html/assets/` folder created হয়েছে

#### 3c. robots.txt Upload (Optional)
- [ ] Local: `dist/robots.txt` আছে কিনা check করুন
- [ ] থাকলে upload করুন: `public_html/robots.txt`
- [ ] ✅ Verification: `/robots.txt` exist করে

#### 3d. .htaccess Upload (Critical!)
- [ ] `.htaccess` file project root এ আছে
- [ ] SiteGround: Upload করুন `public_html/.htaccess`
- [ ] ⚠️ **Important**: Hidden file হতে পারে (show করতে পারেন File Manager settings থেকে)
- [ ] ✅ Verification: `public_html/.htaccess` exist করে এবং size ~3KB

---

## Post-Upload Verification

### ✔️ Files Structure Check
```
public_html/
├── index.html              ✅ Check
├── .htaccess               ✅ Check
├── robots.txt              ✅ Check (optional)
└── assets/
    ├── index-XXXXX.js      ✅ Check
    ├── index-XXXXX.css     ✅ Check
    └── [other files]       ✅ Check
```

### 🌐 Website Access Test
- [ ] Browser এ open করুন: `https://yourdomain.com` (or SiteGround domain)
- [ ] Website loads হচ্ছে (white screen না হলে OK)
- [ ] Console errors check করুন (F12 → Console)
- [ ] ✅ পেজ load হচ্ছে কিনা verify করুন

### 🔗 Admin Installation
- [ ] Browser এ খুলুন: `https://yourdomain.com/install`
- [ ] Installation form দেখা যাচ্ছে
- [ ] [ ] Email field fill করুন: ________________
- [ ] [ ] Password field fill করুন: ________________
- [ ] [ ] Store Name fill করুন: "GreenGrass Store"
- [ ] [ ] "Create Admin Account" button click করুন
- [ ] Wait for redirect (30-60 seconds)
- [ ] ✅ Admin dashboard access করতে পারেন check করুন

---

## Post-Installation Setup

### 🛒 Basic Configuration
- [ ] Admin Panel: `https://yourdomain.com/admin`
- [ ] Store Settings configure করুন:
  - [ ] Store Name
  - [ ] Store Email
  - [ ] Contact Phone
  - [ ] Address
  - [ ] Logo (optional)
- [ ] Save করুন

### 🔐 Security Settings
- [ ] Admin panel এ Settings → Security check করুন
- [ ] Two-Factor Authentication (optional) enable করুন

### 💳 Payment Gateway (Optional)
- [ ] Settings → Payments
- [ ] Stripe/PayPal setup করুন (যদি প্রয়োজন)

### 📧 Email Configuration (Optional)
- [ ] Settings → Email
- [ ] SMTP settings configure করুন (SiteGround এ পাওয়া যাবে)

### 🌐 Domain Configuration
- [ ] Settings → Domain
- [ ] Domain name set করুন
- [ ] HTTPS enabled check করুন

---

## SSL Certificate Setup (Recommended)

### 🔒 SiteGround থেকে SSL Add করুন
- [ ] SiteGround Dashboard → Security
- [ ] "Install Free SSL" click করুন
- [ ] Let's Encrypt select করুন
- [ ] Wait 15-30 minutes for propagation
- [ ] Browser এ site open করুন: https://yourdomain.com (🔒 lock icon দেখা যাবে)

### Force HTTPS (After SSL Active)
- [ ] `.htaccess` এর HTTP to HTTPS line uncommented আছে
- [ ] Automatic redirect হবে: http → https

---

## Final Verification (All Green ✅)

### Website Functionality
- [ ] Homepage loads: https://yourdomain.com
- [ ] Shop page works: https://yourdomain.com/shop
- [ ] Blog page works: https://yourdomain.com/blog
- [ ] Admin accessible: https://yourdomain.com/admin
- [ ] Can login with admin credentials
- [ ] Products display হচ্ছে
- [ ] Categories show হচ্ছে
- [ ] Wishlist works
- [ ] Cart functions working
- [ ] Checkout works

### Performance Check
- [ ] Page load time reasonable (< 5 seconds)
- [ ] Images loading properly
- [ ] CSS/JS bundled সঠিকভাবে
- [ ] No console errors (F12)

### Security Check
- [ ] 🔒 HTTPS active (lock icon visible)
- [ ] No sensitive files exposed
- [ ] Admin password secure (12+ chars)
- [ ] Database connection secure

---

## Common Issues During Upload

### 🚨 Issue: 404 Not Found
**Solution:**
- [ ] Check `.htaccess` file uploaded correctly
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Try private/incognito window

### 🚨 Issue: White Screen
**Solution:**
- [ ] Check `index.html` uploaded
- [ ] Check `assets/` folder uploaded with files
- [ ] Check console for JavaScript errors (F12)
- [ ] Verify Supabase connection

### 🚨 Issue: Styles Not Loading
**Solution:**
- [ ] Check `assets/` folder uploaded
- [ ] Check CSS file names in console
- [ ] Clear cache and reload

### 🚨 Issue: Installation Page Not Found
**Solution:**
- [ ] Check `.htaccess` is configured
- [ ] Verify `public/api/` folder (if using PHP backend)
- [ ] Check database connection

---

## Support Information to Collect

**যদি issue হয় তখন এই তথ্য রাখুন:**

- [ ] Domain: ________________
- [ ] SiteGround Account: ________________
- [ ] Upload Date/Time: ________________
- [ ] Error Message: ________________
- [ ] Console Error (F12): ________________
- [ ] Browser: ________________
- [ ] OS: ________________

---

## ✨ Success Indicators

🎉 **সব কিছু ঠিক থাকলে:**

✅ Website accessible and loading  
✅ Admin dashboard working  
✅ Database connected  
✅ Products displaying  
✅ Admin can create/edit content  
✅ HTTPS secure (🔒 icon visible)  
✅ No JavaScript errors  

---

## 📅 Post-Deployment Maintenance

- [ ] Daily: Check admin dashboard, monitor for errors
- [ ] Weekly: Review analytics and orders
- [ ] Monthly: Backup database (SiteGround auto-backup)
- [ ] As needed: Update products, blog posts, settings

---

**Deployment Completed Date: ____________**

**Deployed By: ____________**

**Notes:**
```
_______________________________________________________

_______________________________________________________

_______________________________________________________
```

---

**Ready to deploy? Let's go! 🚀**

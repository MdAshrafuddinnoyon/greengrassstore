# Google Account Login Integration Guide (Supabase + React)

This guide explains how to enable and integrate Google Account login (OAuth) in your Green Grass Store application using Supabase and React.

---

## 1. Google OAuth Setup (Google Cloud Console)

1. Go to https://console.cloud.google.com/
2. Select or create a Project.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth client ID**.
5. Application type: **Web application**
6. Add an Authorized redirect URI:
   ```
   https://<your-supabase-project-ref>.supabase.co/auth/v1/callback
   ```
7. Save and copy the **Client ID** and **Client Secret**.

---

## 2. Enable Google Provider in Supabase

1. Go to your Supabase Project Dashboard.
2. Navigate to **Authentication > Providers > Google**.
3. Paste the **Client ID** and **Client Secret** from Google Cloud.
4. Enable the Google provider and save.

---

## 3. Required Information for Integration

If you want to automate or get help with code/configuration, you (or your developer) should have:
- Supabase Project URL (ref)
- Supabase anon/public API key
- Google OAuth Client ID
- Google OAuth Client Secret
- (Optional) Your domain/localhost URL for custom redirect

---

## 4. React Frontend: Google Login Button Example

```tsx
import { supabase } from "@/integrations/supabase/client";

function handleGoogleLogin() {
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin, // or a custom redirect URL
    },
  });
}

// Usage in a button:
// <button onClick={handleGoogleLogin}>Sign in with Google</button>
```

---

## 5. Summary of Steps

1. Create OAuth client in Google Cloud Console.
2. Enable Google provider in Supabase Auth settings.
3. Add the login button and logic in your React app.
4. Test login flow—users can now sign in with Google.

---

## 6. Troubleshooting
- Ensure redirect URIs match exactly in Google Cloud and Supabase.
- Make sure Google provider is enabled in Supabase.
- Check browser console for errors if login fails.

---

**For further help, provide the required credentials and project info to your developer or support team.**

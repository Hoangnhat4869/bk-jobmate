# Google Authentication Setup for BKJobmate

This guide will help you set up Google Authentication for the BKJobmate app with the new cyese.me API backend.

## Prerequisites

- Expo CLI installed
- Google Cloud Console account
- App running on Expo
- Backend API running on https://api.cyese.me/

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "OAuth consent screen"
4. Configure the OAuth consent screen:
   - Choose "External" for public apps
   - Fill in required fields:
     - App name: BKJobmate
     - User support email
     - Developer contact information
5. Add necessary scopes:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
6. Add test users if in testing phase

## 2. Enable Required APIs

1. Navigate to "APIs & Services" > "Library"
2. Search for and enable:
   - Google+ API (or People API)
   - Google OAuth2 API

## 3. Create OAuth 2.0 Client IDs

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Create client IDs for each platform:

### For Backend API Integration

**Web Client ID (For Backend)**

- Application type: Web application
- Name: BKJobmate API Backend
- Authorized JavaScript origins:
  - `https://api.cyese.me`
- Authorized redirect URIs:
  - `https://api.cyese.me/auth/google/callback`

### For Development (Expo Go)

**Web Client ID (Required for Expo)**

- Application type: Web application
- Name: BKJobmate Web
- Authorized JavaScript origins:
  - `https://auth.expo.io`
- Authorized redirect URIs:
  - `https://auth.expo.io/@your-expo-username/bk-jobmate`
  - Replace `your-expo-username` with your actual Expo username

### For Production (Standalone Apps)

**Android**

- Application type: Android
- Name: BKJobmate Android
- Package name: `com.hoangnhat4869.bkjobmate` (from your app.json)
- SHA-1 certificate fingerprint: (Generate this - see section 4)

**iOS**

- Application type: iOS
- Name: BKJobmate iOS
- Bundle ID: `com.hoangnhat4869.bkjobmate` (from your app.json)

## 4. Generate SHA-1 Certificate Fingerprint (Android Only)

### For Development (Debug)

```bash
# Windows (PowerShell)
keytool -list -v -keystore $env:USERPROFILE\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android

# macOS/Linux
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

### For Production

```bash
# Use your production keystore
keytool -list -v -keystore path/to/your/production.keystore -alias your-alias
```

## 5. Configure Environment Variables

1. Create or update your `.env` file in the project root:

```env
EXPO_PUBLIC_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
EXPO_PUBLIC_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
EXPO_PUBLIC_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

2. The AuthContext.tsx is already configured to use these environment variables.

## 6. Update app.json (if needed)

Ensure your `app.json` has the correct bundle identifier:

```json
{
  "expo": {
    "slug": "bk-jobmate",
    "ios": {
      "bundleIdentifier": "com.hoangnhat4869.bkjobmate"
    },
    "android": {
      "package": "com.hoangnhat4869.bkjobmate"
    }
  }
}
```

## 7. Testing

### Development (Expo Go)

1. Start your development server: `npm start`
2. Open the app in Expo Go
3. Navigate to the Login screen
4. Tap "Đăng nhập với Google"
5. You should be redirected to Google sign-in
6. After signing in, you should return to the app

### Production (Standalone App)

1. Build and install the standalone app
2. Test Google authentication
3. Verify that the redirect works correctly

## Current Configuration

The app is currently configured with:

- Bundle ID: `com.hoangnhat4869.bkjobmate`
- Redirect URI pattern: Uses Expo's default handling
- Scopes: `openid`, `profile`, `email`

## Troubleshooting

### Common Issues:

1. **"OAuth client not found" error**

   - Verify client IDs in `.env` file
   - Ensure client IDs match the platform you're testing on

2. **Redirect URI mismatch**

   - For Expo Go: Use web client ID and check redirect URI in Google Console
   - For standalone: Ensure bundle ID/package name matches

3. **"Access blocked" error**

   - Check OAuth consent screen configuration
   - Verify app is published or user is added as test user

4. **Network/Connection issues**
   - Ensure device has internet connection
   - Check if Google services are accessible

### Debug Steps:

1. Check console logs for detailed error messages
2. Verify environment variables are loaded correctly
3. Test with a different Google account
4. Try on different devices/emulators

### Getting Help:

- Check [Expo documentation](https://docs.expo.dev/guides/authentication/#google)
- Review [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2)
- Check the AuthContext.tsx implementation for any additional debug logs

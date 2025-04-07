# Google Authentication Setup for BKJobmate

This guide will help you set up Google Authentication for the BKJobmate app.

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "OAuth consent screen"
4. Configure the OAuth consent screen (External or Internal)
5. Add necessary scopes (email, profile)
6. Add test users if needed

## 2. Create OAuth 2.0 Client IDs

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Create client IDs for each platform:

### Android
- Application type: Android
- Name: BKJobmate Android
- Package name: `com.bkjobmate.app`
- SHA-1 certificate fingerprint: (Generate this from your keystore)

### iOS
- Application type: iOS
- Name: BKJobmate iOS
- Bundle ID: `com.bkjobmate.app`

### Web
- Application type: Web application
- Name: BKJobmate Web
- Authorized JavaScript origins: `https://auth.expo.io`
- Authorized redirect URIs: `https://auth.expo.io/@your-expo-username/bk-jobmate`

## 3. Update the AuthContext.tsx file

Open `src/Context/AuthContext.tsx` and update the following lines with your client IDs:

```typescript
// Initialize Google Auth
const [_, response, promptAsync] = Google.useAuthRequest({
  androidClientId: "YOUR_ANDROID_CLIENT_ID", // Replace with your Android client ID
  iosClientId: "YOUR_IOS_CLIENT_ID", // Replace with your iOS client ID
  webClientId: "YOUR_WEB_CLIENT_ID", // Replace with your Web client ID
});
```

## 4. Generate SHA-1 Certificate Fingerprint

For Android, you need to provide a SHA-1 certificate fingerprint. You can generate this using the following command:

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

## 5. Testing

1. Run the app on your device or emulator
2. Navigate to the Login screen
3. Tap "Sign in with Google"
4. You should be redirected to the Google sign-in page
5. After signing in, you should be redirected back to the app

## Troubleshooting

- Make sure the package name in app.json matches the one you used in Google Cloud Console
- Verify that all client IDs are correctly entered in the AuthContext.tsx file
- Check that you have the correct SHA-1 fingerprint for Android
- Ensure that you have added the necessary scopes in the OAuth consent screen

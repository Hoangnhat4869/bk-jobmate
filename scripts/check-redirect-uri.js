#!/usr/bin/env node

/**
 * Script to check and display current redirect URI configuration
 */

const fs = require("fs");
const path = require("path");

// Colors for console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getCurrentRedirectURIs() {
  log("\n🔍 Current Redirect URI Configuration:", "blue");
  log("=".repeat(50), "blue");

  // Load .env file
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    log("❌ .env file not found!", "red");
    return;
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const envVars = {};

  envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });

  // Get base URL
  const baseUrl =
    envVars["EXPO_PUBLIC_BASE_URL"] || "http://localhost:3000/api/";

  log(
    "\n📍 Redirect URIs you need to configure in Google Cloud Console:",
    "bold"
  );
  log("", "reset");

  // Web redirect URIs
  log("🌐 WEB CLIENT ID:", "green");
  log("   • http://localhost:8081/", "yellow");
  log("   • http://localhost:3000/", "yellow");
  log("   • https://yourdomain.com/", "yellow");
  log("   • https://www.yourdomain.com/", "yellow");

  // Android redirect URIs
  log("\n📱 ANDROID CLIENT ID:", "green");
  log("   • com.bkjobmate://auth/google", "yellow");
  log("   • com.bkjobmate.app://auth/google", "yellow");

  // iOS redirect URIs
  log("\n🍎 IOS CLIENT ID:", "green");
  log("   • com.bkjobmate://auth/google", "yellow");
  log("   • com.bkjobmate.app://auth/google", "yellow");

  log("\n📋 Current Environment Variables:", "blue");
  const webClientId = envVars["EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID"] || "Not set";
  const androidClientId =
    envVars["EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID"] || "Not set";
  const iosClientId = envVars["EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID"] || "Not set";

  log(`   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: ${webClientId}`, "yellow");
  log(`   EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID: ${androidClientId}`, "yellow");
  log(`   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: ${iosClientId}`, "yellow");
}

function showGoogleCloudConsoleSteps() {
  log("\n🛠️  How to configure Redirect URIs in Google Cloud Console:", "bold");
  log("=".repeat(60), "blue");

  log("\n1️⃣  Go to Google Cloud Console:", "green");
  log("   https://console.cloud.google.com/", "yellow");

  log("\n2️⃣  Navigate to APIs & Services > Credentials", "green");

  log("\n3️⃣  For WEB CLIENT ID:", "green");
  log("   • Click on your Web Client ID", "yellow");
  log('   • In "Authorized JavaScript origins" add:', "yellow");
  log("     - http://localhost:8081", "yellow");
  log("     - http://localhost:3000", "yellow");
  log("     - https://yourdomain.com (production)", "yellow");
  log('   • In "Authorized redirect URIs" add:', "yellow");
  log("     - http://localhost:8081/", "yellow");
  log("     - http://localhost:3000/", "yellow");
  log("     - https://yourdomain.com/ (production)", "yellow");

  log("\n4️⃣  For ANDROID CLIENT ID:", "green");
  log("   • No redirect URI needed for Android", "yellow");
  log("   • Make sure package name matches: com.bkjobmate.app", "yellow");
  log("   • Add SHA-1 fingerprint from your keystore", "yellow");

  log("\n5️⃣  For iOS CLIENT ID:", "green");
  log("   • No redirect URI needed for iOS", "yellow");
  log("   • Make sure bundle ID matches: com.bkjobmate.app", "yellow");

  log("\n6️⃣  Save all changes", "green");
}

function showCommonIssues() {
  log("\n⚠️  Common Issues and Solutions:", "bold");
  log("=".repeat(40), "blue");

  log('\n❌ "redirect_uri_mismatch" error:', "red");
  log(
    "   ✅ Make sure redirect URI in Google Console exactly matches what your app sends",
    "green"
  );
  log("   ✅ Include trailing slash: http://localhost:8081/", "green");
  log("   ✅ Check for typos in domain names", "green");

  log('\n❌ "invalid_client" error:', "red");
  log("   ✅ Check if client ID is correct", "green");
  log(
    "   ✅ Make sure you're using the right client ID for the platform",
    "green"
  );

  log('\n❌ "access_denied" error:', "red");
  log("   ✅ User cancelled the authentication", "green");
  log(
    "   ✅ Check if your app is in testing mode and user is added as test user",
    "green"
  );

  log("\n❌ No redirect after authentication:", "red");
  log("   ✅ Check if redirect URI is configured correctly", "green");
  log("   ✅ Make sure your app is listening on the correct port", "green");
  log("   ✅ Check browser console for errors", "green");
}

function showTestingSteps() {
  log("\n🧪 Testing Steps:", "bold");
  log("=".repeat(20), "blue");

  log("\n1. Start your development server:", "green");
  log("   npm run web", "yellow");

  log("\n2. Open browser and go to:", "green");
  log("   http://localhost:8081/login", "yellow");

  log('\n3. Click "Đăng nhập với Google"', "green");

  log("\n4. Check browser console for errors", "green");

  log("\n5. If successful, you should be redirected back to your app", "green");
}

// Run all checks
function main() {
  log("🔧 Google OAuth Redirect URI Configuration Helper", "bold");
  log("=".repeat(60), "blue");

  getCurrentRedirectURIs();
  showGoogleCloudConsoleSteps();
  showCommonIssues();
  showTestingSteps();

  log("\n✨ Good luck with your Google OAuth setup!", "green");
}

main();

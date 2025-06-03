const fs = require('fs');
const path = require('path');

console.log('🔧 Google OAuth Setup Guide for BK Jobmate\n');

// Check current google-services.json
const googleServicesPath = path.join(__dirname, '..', 'google-services.json');
const envPath = path.join(__dirname, '..', '.env');

console.log('📋 Current Configuration Status:\n');

// Check google-services.json
if (fs.existsSync(googleServicesPath)) {
  const googleServices = JSON.parse(fs.readFileSync(googleServicesPath, 'utf8'));
  const isPlaceholder = googleServices.project_info.project_id === 'placeholder-project';
  
  console.log(`📄 google-services.json: ${isPlaceholder ? '❌ PLACEHOLDER' : '✅ CONFIGURED'}`);
  console.log(`   Project ID: ${googleServices.project_info.project_id}`);
  console.log(`   Package Name: ${googleServices.client[0].client_info.android_client_info.package_name}\n`);
  
  if (isPlaceholder) {
    console.log('⚠️  WARNING: google-services.json is still using placeholder data!');
    console.log('   Google Authentication will NOT work until you replace this file.\n');
  }
} else {
  console.log('📄 google-services.json: ❌ NOT FOUND\n');
}

// Check .env configuration
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const webClientId = envContent.match(/EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=(.+)/)?.[1];
  const androidClientId = envContent.match(/EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=(.+)/)?.[1];
  
  console.log('🔑 Environment Variables:');
  console.log(`   Web Client ID: ${webClientId ? '✅ SET' : '❌ MISSING'}`);
  console.log(`   Android Client ID: ${androidClientId ? '✅ SET' : '❌ MISSING'}`);
  console.log(`   API URL: ${envContent.match(/EXPO_PUBLIC_BASE_URL=(.+)/)?.[1] || 'NOT SET'}\n`);
} else {
  console.log('🔑 .env file: ❌ NOT FOUND\n');
}

console.log('🚀 SETUP STEPS:\n');

console.log('1️⃣  GET SHA-1 FINGERPRINT:');
console.log('   Run: npm run get-sha1');
console.log('   Copy the SHA-1 fingerprint for next step\n');

console.log('2️⃣  CREATE FIREBASE PROJECT:');
console.log('   • Go to: https://console.firebase.google.com/');
console.log('   • Create new project or select existing');
console.log('   • Add Android app with package: com.bkjobmate.app');
console.log('   • Download google-services.json\n');

console.log('3️⃣  SETUP GOOGLE CLOUD OAUTH:');
console.log('   • Go to: https://console.cloud.google.com/apis/credentials');
console.log('   • Create OAuth 2.0 Client ID');
console.log('   • Application type: Android');
console.log('   • Package name: com.bkjobmate.app');
console.log('   • Add SHA-1 fingerprint from step 1\n');

console.log('4️⃣  UPDATE FILES:');
console.log('   • Replace google-services.json with downloaded file');
console.log('   • Update .env with new Client IDs:');
console.log('     EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your_android_client_id');
console.log('     EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id\n');

console.log('5️⃣  REBUILD APK:');
console.log('   Run: npm run build:apk\n');

console.log('🔗 Quick Links:');
console.log('   Firebase Console: https://console.firebase.google.com/');
console.log('   Google Cloud Console: https://console.cloud.google.com/apis/credentials');
console.log('   Package Name: com.bkjobmate.app\n');

console.log('💡 Need help? Check the detailed guide in GOOGLE_AUTH_SETUP.md');

// Generate template google-services.json if needed
const generateTemplate = () => {
  const template = {
    "project_info": {
      "project_number": "YOUR_PROJECT_NUMBER",
      "project_id": "your-firebase-project-id",
      "storage_bucket": "your-firebase-project-id.appspot.com"
    },
    "client": [
      {
        "client_info": {
          "mobilesdk_app_id": "1:YOUR_PROJECT_NUMBER:android:YOUR_APP_ID",
          "android_client_info": {
            "package_name": "com.bkjobmate.app"
          }
        },
        "oauth_client": [
          {
            "client_id": "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
            "client_type": 1,
            "android_info": {
              "package_name": "com.bkjobmate.app",
              "certificate_hash": "YOUR_SHA1_FINGERPRINT"
            }
          }
        ],
        "api_key": [
          {
            "current_key": "YOUR_API_KEY"
          }
        ],
        "services": {
          "appinvite_service": {
            "other_platform_oauth_client": [
              {
                "client_id": "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
                "client_type": 3
              }
            ]
          }
        }
      }
    ],
    "configuration_version": "1"
  };
  
  const templatePath = path.join(__dirname, '..', 'google-services.template.json');
  fs.writeFileSync(templatePath, JSON.stringify(template, null, 2));
  console.log(`📝 Template created: google-services.template.json`);
};

// Uncomment to generate template
// generateTemplate();

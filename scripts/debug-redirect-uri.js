#!/usr/bin/env node

/**
 * Debug script to show exact redirect URI configuration needed
 */

const fs = require('fs');
const path = require('path');

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function showExactConfiguration() {
  log('🔍 EXACT Google Cloud Console Configuration Needed', 'bold');
  log('='.repeat(60), 'blue');
  
  log('\n📍 Your app is running on: http://localhost:8081', 'green');
  log('📍 Redirect URI being sent: http://localhost:8081/', 'green');
  
  log('\n🛠️  EXACT steps to fix in Google Cloud Console:', 'bold');
  log('', 'reset');
  
  log('1️⃣  Go to: https://console.cloud.google.com/', 'yellow');
  log('2️⃣  Select your project', 'yellow');
  log('3️⃣  Navigate to: APIs & Services > Credentials', 'yellow');
  log('4️⃣  Find your WEB Client ID and click EDIT (pencil icon)', 'yellow');
  
  log('\n📝 In the "Authorized JavaScript origins" section:', 'blue');
  log('   Click "ADD URI" and add EXACTLY:', 'yellow');
  log('   ┌─────────────────────────────────┐', 'green');
  log('   │ http://localhost:8081           │', 'green');
  log('   └─────────────────────────────────┘', 'green');
  
  log('\n📝 In the "Authorized redirect URIs" section:', 'blue');
  log('   Click "ADD URI" and add EXACTLY:', 'yellow');
  log('   ┌─────────────────────────────────┐', 'green');
  log('   │ http://localhost:8081/          │', 'green');
  log('   └─────────────────────────────────┘', 'green');
  log('   ⚠️  Note the trailing slash (/) - this is REQUIRED!', 'red');
  
  log('\n5️⃣  Click SAVE', 'yellow');
  log('6️⃣  Wait 5-10 minutes for changes to propagate', 'yellow');
  
  log('\n🔄 Alternative ports to also add (optional):', 'blue');
  log('   JavaScript origins:', 'yellow');
  log('   • http://localhost:3000', 'yellow');
  log('   • http://localhost:19006', 'yellow');
  log('   Redirect URIs:', 'yellow');
  log('   • http://localhost:3000/', 'yellow');
  log('   • http://localhost:19006/', 'yellow');
}

function showCurrentClientId() {
  log('\n🔑 Current Client ID Check:', 'blue');
  log('='.repeat(30), 'blue');
  
  // Load .env file
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    log('❌ .env file not found!', 'red');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });

  const webClientId = envVars['EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID'];
  
  if (!webClientId || webClientId.includes('your_web_client_id_here')) {
    log('❌ Web Client ID not configured in .env file', 'red');
    log('   Please update EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID', 'yellow');
  } else {
    log(`✅ Web Client ID: ${webClientId}`, 'green');
    log('   Make sure this matches the Client ID in Google Console', 'yellow');
  }
}

function showTestingSteps() {
  log('\n🧪 Testing Steps:', 'blue');
  log('='.repeat(20), 'blue');
  
  log('\n1. After configuring Google Console, restart your app:', 'green');
  log('   Ctrl+C to stop, then: npm run web', 'yellow');
  
  log('\n2. Open browser console (F12) before testing', 'green');
  
  log('\n3. Go to: http://localhost:8081/login', 'green');
  
  log('\n4. Click "Đăng nhập với Google"', 'green');
  
  log('\n5. Check console logs for:', 'green');
  log('   • "Redirect URI being sent: ..."', 'yellow');
  log('   • Any error messages', 'yellow');
  
  log('\n6. If still getting redirect_uri_mismatch:', 'green');
  log('   • Double-check the URI in Google Console', 'yellow');
  log('   • Wait 5-10 minutes for changes to propagate', 'yellow');
  log('   • Try in incognito mode', 'yellow');
}

function showCommonMistakes() {
  log('\n⚠️  Common Mistakes to Avoid:', 'red');
  log('='.repeat(35), 'blue');
  
  log('\n❌ Missing trailing slash:', 'red');
  log('   Wrong: http://localhost:8081', 'red');
  log('   Right: http://localhost:8081/', 'green');
  
  log('\n❌ Wrong protocol:', 'red');
  log('   Wrong: https://localhost:8081/', 'red');
  log('   Right: http://localhost:8081/', 'green');
  
  log('\n❌ Wrong port:', 'red');
  log('   Wrong: http://localhost:3000/', 'red');
  log('   Right: http://localhost:8081/', 'green');
  
  log('\n❌ Using Android/iOS Client ID for web:', 'red');
  log('   Make sure you\'re editing the WEB Client ID', 'yellow');
  
  log('\n❌ Not waiting for changes to propagate:', 'red');
  log('   Google can take 5-10 minutes to update', 'yellow');
}

function main() {
  showExactConfiguration();
  showCurrentClientId();
  showTestingSteps();
  showCommonMistakes();
  
  log('\n✨ Summary:', 'bold');
  log('Add exactly "http://localhost:8081/" to redirect URIs', 'green');
  log('Wait 5-10 minutes, then test again', 'green');
  log('Check browser console for detailed logs', 'green');
}

main();

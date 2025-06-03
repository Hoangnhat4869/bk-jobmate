#!/usr/bin/env node

/**
 * Script to test Google OAuth redirect URI configuration
 */

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

function testRedirectURI() {
  log('🧪 Testing Google OAuth Redirect URI', 'bold');
  log('='.repeat(50), 'blue');
  
  // Simulate what the app will send to Google
  const currentPort = 8081; // Expo web default port
  const expectedRedirectURI = `http://localhost:${currentPort}/`;
  
  log('\n📤 What your app will send to Google:', 'blue');
  log(`   Redirect URI: ${expectedRedirectURI}`, 'yellow');
  
  log('\n✅ What you need to configure in Google Cloud Console:', 'green');
  log('   1. Go to Google Cloud Console > APIs & Services > Credentials', 'yellow');
  log('   2. Click on your WEB Client ID', 'yellow');
  log('   3. In "Authorized JavaScript origins" add:', 'yellow');
  log(`      - http://localhost:${currentPort}`, 'yellow');
  log('   4. In "Authorized redirect URIs" add:', 'yellow');
  log(`      - ${expectedRedirectURI}`, 'yellow');
  log('   5. Save the changes', 'yellow');
  
  log('\n⚠️  Important Notes:', 'red');
  log('   • The redirect URI must match EXACTLY (including trailing slash)', 'yellow');
  log('   • Use different Client IDs for Web, Android, and iOS', 'yellow');
  log('   • Make sure your app is running on the correct port', 'yellow');
  
  log('\n🔧 Quick Test:', 'blue');
  log('   1. Start your app: npm run web', 'yellow');
  log('   2. Open: http://localhost:8081/login', 'yellow');
  log('   3. Click "Đăng nhập với Google"', 'yellow');
  log('   4. Check if you get redirected back after authentication', 'yellow');
  
  log('\n📋 Common Error Messages:', 'red');
  log('   • "redirect_uri_mismatch" = URI not configured in Google Console', 'yellow');
  log('   • "invalid_client" = Wrong Client ID', 'yellow');
  log('   • "access_denied" = User cancelled or app not approved', 'yellow');
}

function showCurrentConfig() {
  log('\n🔍 Current Configuration Check:', 'blue');
  log('='.repeat(40), 'blue');
  
  // Check if running on correct port
  const expectedPort = 8081;
  log(`\n📡 Expected Port: ${expectedPort}`, 'green');
  log('   Make sure your Expo web server is running on this port', 'yellow');
  
  // Show what redirect URI will be used
  log('\n🔗 Redirect URI that will be sent:', 'green');
  log(`   http://localhost:${expectedPort}/`, 'yellow');
  
  log('\n💡 Pro Tips:', 'blue');
  log('   • Test in incognito mode to avoid cached auth', 'yellow');
  log('   • Check browser console for detailed error messages', 'yellow');
  log('   • Make sure you\'re using the WEB Client ID for web testing', 'yellow');
}

function main() {
  testRedirectURI();
  showCurrentConfig();
  
  log('\n🎯 Next Steps:', 'bold');
  log('1. Configure redirect URIs in Google Cloud Console', 'green');
  log('2. Update your .env file with correct Client IDs', 'green');
  log('3. Test the authentication flow', 'green');
  log('4. Check browser console for any errors', 'green');
  
  log('\n✨ Good luck!', 'green');
}

main();

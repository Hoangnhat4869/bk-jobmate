#!/usr/bin/env node

/**
 * Script to help debug navigation flow after Google authentication
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

function showNavigationFlow() {
  log('🔄 Navigation Flow Debug Guide', 'bold');
  log('='.repeat(40), 'blue');
  
  log('\n📋 Expected Flow for Google Authentication:', 'green');
  log('1. User clicks "Đăng nhập với Google"', 'yellow');
  log('2. Google OAuth popup/redirect', 'yellow');
  log('3. User authenticates with Google', 'yellow');
  log('4. App receives Google tokens', 'yellow');
  log('5. App sends tokens to backend', 'yellow');
  log('6. Backend returns user data', 'yellow');
  log('7. AuthContext sets user with authMethod: "google"', 'yellow');
  log('8. AuthGuard detects Google user', 'yellow');
  log('9. Navigate to ONBOARDING screen', 'yellow');
  
  log('\n🔍 Debug Steps:', 'blue');
  log('1. Open browser console (F12)', 'yellow');
  log('2. Go to: http://localhost:8081/login', 'yellow');
  log('3. Click "Đăng nhập với Google"', 'yellow');
  log('4. Complete Google authentication', 'yellow');
  log('5. Check console logs for:', 'yellow');
  log('   • "Google authentication successful"', 'yellow');
  log('   • "AuthGuard: User authenticated" with user details', 'yellow');
  log('   • "AuthGuard: Navigating Google user to ONBOARDING"', 'yellow');
  
  log('\n🐛 If you see "Navigating email user to MAIN":', 'red');
  log('   → authMethod is not set to "google"', 'yellow');
  log('   → Check backend response', 'yellow');
  log('   → User object should have authMethod: "google"', 'yellow');
  
  log('\n🐛 If you don\'t see AuthGuard logs:', 'red');
  log('   → AuthGuard might not be triggering', 'yellow');
  log('   → Check if user is being set correctly', 'yellow');
  log('   → Check isAuthenticated state', 'yellow');
}

function showConsoleCommands() {
  log('\n💻 Browser Console Commands to Test:', 'blue');
  log('='.repeat(45), 'blue');
  
  log('\n// Check current user state', 'green');
  log('localStorage.getItem("user")', 'yellow');
  
  log('\n// Check if user is stored correctly', 'green');
  log('JSON.parse(localStorage.getItem("user") || "{}")', 'yellow');
  
  log('\n// Clear user data (for testing)', 'green');
  log('localStorage.removeItem("user")', 'yellow');
  log('localStorage.removeItem("token")', 'yellow');
  log('localStorage.removeItem("refreshToken")', 'yellow');
  
  log('\n// Check current URL', 'green');
  log('window.location.href', 'yellow');
}

function showTroubleshooting() {
  log('\n🔧 Troubleshooting:', 'blue');
  log('='.repeat(20), 'blue');
  
  log('\n❌ Problem: Goes to Main instead of Onboarding', 'red');
  log('✅ Solution:', 'green');
  log('   1. Check console logs for user.authMethod', 'yellow');
  log('   2. Should be "google", not "email"', 'yellow');
  log('   3. Backend might not be setting authMethod correctly', 'yellow');
  log('   4. We\'ve added a fix to force authMethod: "google"', 'yellow');
  
  log('\n❌ Problem: No navigation happens', 'red');
  log('✅ Solution:', 'green');
  log('   1. Check if AuthGuard useEffect is running', 'yellow');
  log('   2. Check isAuthenticated and user states', 'yellow');
  log('   3. Look for any JavaScript errors', 'yellow');
  
  log('\n❌ Problem: Stuck on loading screen', 'red');
  log('✅ Solution:', 'green');
  log('   1. Check if isLoading is stuck on true', 'yellow');
  log('   2. Look for errors in authentication flow', 'yellow');
  log('   3. Check network tab for failed API calls', 'yellow');
}

function showTestingChecklist() {
  log('\n✅ Testing Checklist:', 'blue');
  log('='.repeat(25), 'blue');
  
  log('\n□ Browser console is open (F12)', 'yellow');
  log('□ Clear localStorage before testing', 'yellow');
  log('□ Go to http://localhost:8081/login', 'yellow');
  log('□ Click "Đăng nhập với Google"', 'yellow');
  log('□ Complete Google authentication', 'yellow');
  log('□ Check console logs for navigation flow', 'yellow');
  log('□ Verify final screen is ONBOARDING', 'yellow');
  
  log('\n📝 Expected Console Logs:', 'green');
  log('✓ "Starting Google sign in..."', 'yellow');
  log('✓ "Google auth result: {type: \'success\'}"', 'yellow');
  log('✓ "Google authentication successful"', 'yellow');
  log('✓ "AuthGuard: User authenticated" with authMethod: "google"', 'yellow');
  log('✓ "AuthGuard: Navigating Google user to ONBOARDING"', 'yellow');
}

function main() {
  showNavigationFlow();
  showConsoleCommands();
  showTroubleshooting();
  showTestingChecklist();
  
  log('\n🎯 Quick Test:', 'bold');
  log('1. Clear browser data: localStorage.clear()', 'green');
  log('2. Refresh page', 'green');
  log('3. Login with Google', 'green');
  log('4. Check console logs', 'green');
  log('5. Should navigate to Onboarding screen', 'green');
  
  log('\n✨ Good luck debugging!', 'green');
}

main();

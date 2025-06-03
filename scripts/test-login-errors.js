#!/usr/bin/env node

/**
 * Script to help test login error scenarios
 */

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function showTestCases() {
  log('🧪 Login Error Test Cases', 'bold');
  log('='.repeat(50), 'blue');
  
  log('\n📋 Test Cases to Try:', 'green');
  
  log('\n1️⃣ Empty Fields Test:', 'yellow');
  log('   Email: (empty)', 'cyan');
  log('   Password: (empty)', 'cyan');
  log('   Expected: "Email và mật khẩu không được để trống"', 'magenta');
  
  log('\n2️⃣ Invalid Email Format Test:', 'yellow');
  log('   Email: "invalid-email"', 'cyan');
  log('   Password: "123456"', 'cyan');
  log('   Expected: "Định dạng email không hợp lệ"', 'magenta');
  
  log('\n3️⃣ Short Password Test:', 'yellow');
  log('   Email: "test@example.com"', 'cyan');
  log('   Password: "123"', 'cyan');
  log('   Expected: "Mật khẩu phải có ít nhất 6 ký tự"', 'magenta');
  
  log('\n4️⃣ Wrong Credentials Test:', 'yellow');
  log('   Email: "wrong@example.com"', 'cyan');
  log('   Password: "wrongpass"', 'cyan');
  log('   Expected: "Email hoặc mật khẩu không chính xác"', 'magenta');
  
  log('\n5️⃣ Valid Credentials Test:', 'yellow');
  log('   Email: "test@example.com"', 'cyan');
  log('   Password: "123456"', 'cyan');
  log('   Expected: Login successful ✅', 'green');
  
  log('\n6️⃣ Alternative Valid Credentials:', 'yellow');
  log('   Email: "user@gmail.com"', 'cyan');
  log('   Password: "password"', 'cyan');
  log('   Expected: Login successful ✅', 'green');
  
  log('\n7️⃣ Admin Credentials:', 'yellow');
  log('   Email: "admin@bkjobmate.com"', 'cyan');
  log('   Password: "admin123"', 'cyan');
  log('   Expected: Login successful ✅', 'green');
}

function showTestingSteps() {
  log('\n🔍 Testing Steps:', 'blue');
  log('='.repeat(20), 'blue');
  
  log('\n1. Open browser and go to: http://localhost:8082/login', 'yellow');
  log('2. Open browser console (F12) to see logs', 'yellow');
  log('3. Try each test case above', 'yellow');
  log('4. Verify error messages appear correctly', 'yellow');
  log('5. Check that errors have animation and proper styling', 'yellow');
  log('6. Test that errors clear when typing new input', 'yellow');
  log('7. Test dismiss button (X) functionality', 'yellow');
}

function showExpectedBehavior() {
  log('\n✅ Expected Error Message Behavior:', 'blue');
  log('='.repeat(40), 'blue');
  
  log('\n🎨 Visual Features:', 'green');
  log('   • Red background with border', 'yellow');
  log('   • Alert icon on the left', 'yellow');
  log('   • Dismiss button (X) on the right', 'yellow');
  log('   • Smooth fade-in animation', 'yellow');
  log('   • Subtle shadow effect', 'yellow');
  
  log('\n⚡ Interactive Features:', 'green');
  log('   • Error clears when user starts typing', 'yellow');
  log('   • Click X button to dismiss manually', 'yellow');
  log('   • New errors replace old ones', 'yellow');
  log('   • Loading state during API calls', 'yellow');
  
  log('\n🔄 Error Flow:', 'green');
  log('   1. User submits form with invalid data', 'yellow');
  log('   2. Error message appears with animation', 'yellow');
  log('   3. User starts typing → error disappears', 'yellow');
  log('   4. User submits again → new error or success', 'yellow');
}

function showDebuggingTips() {
  log('\n🐛 Debugging Tips:', 'blue');
  log('='.repeat(20), 'blue');
  
  log('\n📝 Console Logs to Watch:', 'green');
  log('   • "MockAPI: Login called with: {email, password: \'***\'}"', 'yellow');
  log('   • "Backend not available, using mock API for: auth/login"', 'yellow');
  log('   • Error response from mock API', 'yellow');
  log('   • "Login error: [error object]"', 'yellow');
  
  log('\n🔧 If Errors Don\'t Show:', 'red');
  log('   • Check browser console for JavaScript errors', 'yellow');
  log('   • Verify ErrorMessage component is imported', 'yellow');
  log('   • Check that error state is being set in AuthContext', 'yellow');
  log('   • Ensure mock API is returning error responses', 'yellow');
  
  log('\n🎯 If Styling Looks Wrong:', 'red');
  log('   • Check that COLORS.error is defined', 'yellow');
  log('   • Verify Ionicons are loading properly', 'yellow');
  log('   • Check for CSS conflicts in web version', 'yellow');
  log('   • Test on different screen sizes', 'yellow');
}

function showQuickTest() {
  log('\n⚡ Quick Test Sequence:', 'bold');
  log('='.repeat(25), 'blue');
  
  log('\n1. Empty form test:', 'green');
  log('   → Leave both fields empty → Click "Đăng nhập"', 'cyan');
  
  log('\n2. Invalid email test:', 'green');
  log('   → Type "abc" in email → Type "123456" in password → Submit', 'cyan');
  
  log('\n3. Wrong password test:', 'green');
  log('   → Type "test@example.com" → Type "wrong" → Submit', 'cyan');
  
  log('\n4. Success test:', 'green');
  log('   → Type "test@example.com" → Type "123456" → Submit', 'cyan');
  
  log('\n✨ Each step should show appropriate error or success!', 'green');
}

function main() {
  showTestCases();
  showTestingSteps();
  showExpectedBehavior();
  showDebuggingTips();
  showQuickTest();
  
  log('\n🎯 Ready to test login errors!', 'bold');
  log('Go to: http://localhost:8082/login', 'green');
}

main();

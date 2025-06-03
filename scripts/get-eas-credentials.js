const { execSync } = require('child_process');

console.log('🔑 Getting EAS Credentials for Google OAuth Setup\n');

console.log('📱 Package Name: com.bkjobmate.app');
console.log('🏗️  Using EAS Build System\n');

try {
  console.log('🔍 Getting EAS credentials...\n');
  
  // Try to get credentials from EAS
  const command = 'eas credentials';
  
  console.log('⚡ Running: eas credentials');
  console.log('📋 This will show you the credentials used by EAS builds\n');
  
  const output = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Error getting EAS credentials:');
  console.error(error.message);
  
  console.log('\n💡 Alternative Solutions:\n');
  
  console.log('🔧 Option 1: Install Java JDK');
  console.log('   • Download from: https://www.oracle.com/java/technologies/downloads/');
  console.log('   • Add to PATH: C:\\Program Files\\Java\\jdk-xx\\bin');
  console.log('   • Restart terminal and run: npm run get-sha1\n');
  
  console.log('🔧 Option 2: Use Android Studio');
  console.log('   • Open Android Studio');
  console.log('   • Go to Build > Generate Signed Bundle/APK');
  console.log('   • View keystore details to get SHA-1\n');
  
  console.log('🔧 Option 3: Use EAS Build Credentials');
  console.log('   • Run: eas build --platform android --profile development');
  console.log('   • Check build logs for keystore info');
  console.log('   • Or use: eas credentials --platform android\n');
  
  console.log('🔧 Option 4: Use Default Debug SHA-1');
  console.log('   • For testing, you can use the default debug SHA-1:');
  console.log('   • SHA-1: 58:E1:C5:71:FB:AC:73:93:FC:01:7A:AB:B0:96:E2:8D:20:4E:62:F0');
  console.log('   • This works for debug builds only\n');
  
  console.log('📝 Next Steps:');
  console.log('1. Get SHA-1 fingerprint using one of the methods above');
  console.log('2. Go to Google Cloud Console');
  console.log('3. Create Android OAuth Client ID');
  console.log('4. Use package name: com.bkjobmate.app');
  console.log('5. Add SHA-1 fingerprint');
  console.log('6. Download google-services.json from Firebase');
  console.log('7. Update .env with new Client IDs\n');
  
  console.log('🌐 Quick Links:');
  console.log('   Firebase: https://console.firebase.google.com/');
  console.log('   Google Cloud: https://console.cloud.google.com/apis/credentials');
}

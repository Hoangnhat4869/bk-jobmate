const { execSync } = require('child_process');
const os = require('os');
const path = require('path');

console.log('🔑 Getting SHA-1 Fingerprint for Google OAuth Setup\n');

// Determine debug keystore path based on OS
const getDebugKeystorePath = () => {
  const homeDir = os.homedir();
  if (os.platform() === 'win32') {
    return path.join(homeDir, '.android', 'debug.keystore');
  } else {
    return path.join(homeDir, '.android', 'debug.keystore');
  }
};

const debugKeystorePath = getDebugKeystorePath();

console.log('📍 Debug Keystore Path:', debugKeystorePath);
console.log('📱 Package Name: com.bkjobmate.app\n');

try {
  console.log('🔍 Extracting SHA-1 fingerprint...\n');
  
  const command = `keytool -list -v -keystore "${debugKeystorePath}" -alias androiddebugkey -storepass android -keypass android`;
  
  const output = execSync(command, { encoding: 'utf8' });
  
  // Extract SHA-1 fingerprint
  const sha1Match = output.match(/SHA1:\s*([A-F0-9:]+)/i);
  const sha256Match = output.match(/SHA256:\s*([A-F0-9:]+)/i);
  
  if (sha1Match) {
    console.log('✅ SHA-1 Fingerprint found!');
    console.log('📋 Copy this SHA-1 fingerprint:\n');
    console.log(`🔑 SHA-1: ${sha1Match[1]}\n`);
    
    if (sha256Match) {
      console.log(`🔐 SHA-256: ${sha256Match[1]}\n`);
    }
    
    console.log('📝 Next Steps:');
    console.log('1. Go to Google Cloud Console');
    console.log('2. Navigate to APIs & Services > Credentials');
    console.log('3. Create OAuth 2.0 Client ID for Android');
    console.log('4. Use package name: com.bkjobmate.app');
    console.log('5. Add the SHA-1 fingerprint above');
    console.log('6. Download new google-services.json');
    console.log('7. Replace the current google-services.json file');
    console.log('8. Update .env with new Client IDs\n');
    
    console.log('🌐 Google Cloud Console:');
    console.log('https://console.cloud.google.com/apis/credentials\n');
    
  } else {
    console.log('❌ Could not extract SHA-1 fingerprint from keystore');
    console.log('📋 Full output:');
    console.log(output);
  }
  
} catch (error) {
  console.error('❌ Error getting SHA-1 fingerprint:');
  console.error(error.message);
  console.log('\n💡 Troubleshooting:');
  console.log('1. Make sure Java/keytool is installed');
  console.log('2. Check if debug keystore exists');
  console.log('3. Try running Android Studio first to generate keystore');
  console.log('4. For Windows, make sure to use proper path format');
  
  console.log('\n🔧 Manual command:');
  console.log(`keytool -list -v -keystore "${debugKeystorePath}" -alias androiddebugkey -storepass android -keypass android`);
}

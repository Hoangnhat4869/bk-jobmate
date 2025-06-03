#!/usr/bin/env node

/**
 * Test script to verify Google OAuth configuration
 * This script checks if all required environment variables are set
 * and validates the Google OAuth client IDs
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
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

function checkEnvironmentVariables() {
  log('\n🔍 Checking Environment Variables...', 'blue');
  
  // Load .env file
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    log('❌ .env file not found!', 'red');
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });

  const requiredVars = [
    'EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID',
    'EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID',
    'EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID'
  ];

  let allValid = true;

  requiredVars.forEach(varName => {
    const value = envVars[varName];
    if (!value || value === 'your_client_id_here' || value === '') {
      log(`❌ ${varName}: Not configured`, 'red');
      allValid = false;
    } else if (value.includes('.apps.googleusercontent.com')) {
      log(`✅ ${varName}: Configured`, 'green');
    } else {
      log(`⚠️  ${varName}: Invalid format (should end with .apps.googleusercontent.com)`, 'yellow');
      allValid = false;
    }
  });

  return allValid;
}

function checkGoogleServicesFile() {
  log('\n🔍 Checking google-services.json...', 'blue');
  
  const googleServicesPath = path.join(process.cwd(), 'google-services.json');
  if (!fs.existsSync(googleServicesPath)) {
    log('❌ google-services.json not found!', 'red');
    return false;
  }

  try {
    const googleServices = JSON.parse(fs.readFileSync(googleServicesPath, 'utf8'));
    
    if (googleServices.project_info?.project_id === 'placeholder-project') {
      log('⚠️  google-services.json contains placeholder data', 'yellow');
      return false;
    }
    
    log('✅ google-services.json exists and appears configured', 'green');
    return true;
  } catch (error) {
    log('❌ google-services.json is invalid JSON', 'red');
    return false;
  }
}

function checkAppConfig() {
  log('\n🔍 Checking app.json configuration...', 'blue');
  
  const appConfigPath = path.join(process.cwd(), 'app.json');
  if (!fs.existsSync(appConfigPath)) {
    log('❌ app.json not found!', 'red');
    return false;
  }

  try {
    const appConfig = JSON.parse(fs.readFileSync(appConfigPath, 'utf8'));
    
    // Check Android package name
    const androidPackage = appConfig.expo?.android?.package;
    if (!androidPackage) {
      log('❌ Android package name not configured in app.json', 'red');
      return false;
    }
    
    log(`✅ Android package: ${androidPackage}`, 'green');
    
    // Check if Google Services file is referenced
    const googleServicesFile = appConfig.expo?.android?.googleServicesFile;
    if (!googleServicesFile) {
      log('⚠️  Google Services file not referenced in app.json', 'yellow');
    } else {
      log(`✅ Google Services file: ${googleServicesFile}`, 'green');
    }
    
    return true;
  } catch (error) {
    log('❌ app.json is invalid JSON', 'red');
    return false;
  }
}

function checkConfigFile() {
  log('\n🔍 Checking Config/index.ts...', 'blue');
  
  const configPath = path.join(process.cwd(), 'src', 'Config', 'index.ts');
  if (!fs.existsSync(configPath)) {
    log('❌ Config/index.ts not found!', 'red');
    return false;
  }

  const configContent = fs.readFileSync(configPath, 'utf8');
  
  // Check if the correct environment variable names are used
  const correctVars = [
    'EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID',
    'EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID',
    'EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID'
  ];
  
  let allFound = true;
  correctVars.forEach(varName => {
    if (configContent.includes(varName)) {
      log(`✅ ${varName} referenced in config`, 'green');
    } else {
      log(`❌ ${varName} not found in config`, 'red');
      allFound = false;
    }
  });
  
  return allFound;
}

function printSummary(envValid, googleServicesValid, appConfigValid, configValid) {
  log('\n📋 Summary:', 'bold');
  log('='.repeat(50), 'blue');
  
  const checks = [
    { name: 'Environment Variables', valid: envValid },
    { name: 'Google Services File', valid: googleServicesValid },
    { name: 'App Configuration', valid: appConfigValid },
    { name: 'Config File', valid: configValid }
  ];
  
  checks.forEach(check => {
    const status = check.valid ? '✅ PASS' : '❌ FAIL';
    const color = check.valid ? 'green' : 'red';
    log(`${check.name}: ${status}`, color);
  });
  
  const allValid = checks.every(check => check.valid);
  
  log('\n' + '='.repeat(50), 'blue');
  if (allValid) {
    log('🎉 All checks passed! Google OAuth should work correctly.', 'green');
  } else {
    log('⚠️  Some checks failed. Please fix the issues above.', 'yellow');
    log('\n💡 Next steps:', 'blue');
    log('1. Set up proper Google OAuth client IDs in Google Cloud Console', 'yellow');
    log('2. Update your .env file with the correct client IDs', 'yellow');
    log('3. Replace google-services.json with your actual project file', 'yellow');
    log('4. Test Google authentication in your app', 'yellow');
  }
}

// Run all checks
function main() {
  log('🚀 Google OAuth Configuration Test', 'bold');
  log('='.repeat(50), 'blue');
  
  const envValid = checkEnvironmentVariables();
  const googleServicesValid = checkGoogleServicesFile();
  const appConfigValid = checkAppConfig();
  const configValid = checkConfigFile();
  
  printSummary(envValid, googleServicesValid, appConfigValid, configValid);
}

main();

@echo off
echo Starting Android development environment...

echo 1. Checking ADB status...
adb devices

echo 2. Setting environment variables...
set RCT_METRO_PORT=8088
set REACT_NATIVE_PACKAGER_HOSTNAME=localhost
set EXPO_DEBUG=true

echo 3. Clearing cache...
rd /s /q node_modules\.cache 2>nul
rd /s /q .expo 2>nul

echo 4. Starting Metro bundler with custom port...
npx expo start --android --dev --clear

echo Done!
pause

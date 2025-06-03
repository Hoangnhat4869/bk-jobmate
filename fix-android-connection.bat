@echo off
echo Fixing Android connection issues...

echo 1. Checking ADB status...
adb devices

echo 2. Killing ADB server...
adb kill-server

echo 3. Starting ADB server...
adb start-server

echo 4. Checking available devices...
adb devices

echo 5. Checking TCP ports...
netstat -ano | findstr "5554"
netstat -ano | findstr "3000"

echo 6. Trying to connect to emulator...
adb connect 127.0.0.1:5554

echo 7. Restarting Metro bundler...
set RCT_METRO_PORT=8088
npx expo start --android --clear

echo Done!
pause

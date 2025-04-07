@echo off
echo Restarting Android development environment...

echo 1. Killing ADB server...
adb kill-server

echo 2. Starting ADB server...
adb start-server

echo 3. Waiting for devices...
adb devices

echo 4. Setting environment variables...
set RCT_METRO_PORT=8088
set REACT_NATIVE_PACKAGER_HOSTNAME=localhost

echo 5. Starting Metro bundler with custom port...
npx expo start --android --clear

echo Done!
pause

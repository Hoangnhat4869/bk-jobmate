# 🔑 Lấy SHA-1 Fingerprint cho Google OAuth

## 📋 **Các cách lấy SHA-1 Fingerprint:**

### **Method 1: Debug Keystore (Development)**

```bash
# Windows
keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android

# macOS/Linux
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

### **Method 2: Expo Development Build**

```bash
# Lấy từ Expo development build
eas credentials
```

### **Method 3: Production Keystore (nếu có)**

```bash
# Thay đổi path và alias theo keystore của bạn
keytool -list -v -keystore path/to/your/production.keystore -alias your-alias
```

### **Method 4: Từ APK đã build**

```bash
# Extract SHA-1 từ APK
unzip -p your-app.apk META-INF/CERT.RSA | keytool -printcert | grep SHA1
```

## 🎯 **Kết quả mong đợi:**

Bạn sẽ thấy output như này:
```
Certificate fingerprints:
         MD5:  XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
         SHA1: XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
         SHA256: XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
```

**Copy SHA1 value** (dạng: `XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX`)

## 📝 **Lưu ý:**

1. **Debug keystore** - dùng cho development/testing
2. **Production keystore** - dùng cho release build
3. **Expo managed** - Expo tự động tạo keystore

## 🔄 **Next Steps:**

Sau khi có SHA-1:
1. Cấu hình Google Cloud Console
2. Tạo Android Client ID
3. Download google-services.json mới
4. Rebuild APK

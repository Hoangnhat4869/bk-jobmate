# 📱 Hướng dẫn Build APK cho BK Jobmate

## 🚀 **QUICK BUILD - Test APK**

### **Bước 1: Chuẩn bị**

```bash
# Đảm bảo đã cài EAS CLI
npm install -g eas-cli

# Kiểm tra version
eas --version
```

### **Bước 2: Build APK**

```bash
# Build APK với profile production-apk
eas build --platform android --profile production-apk

# Hoặc build local (nếu có Android SDK)
eas build --platform android --profile production-apk --local
```

### **Bước 3: Download APK**

1. Sau khi build xong, EAS sẽ cung cấp link download
2. Tải APK về máy
3. Cài đặt trên thiết bị Android

## 🔧 **TROUBLESHOOTING**

### **Lỗi Google Services**

Nếu gặp lỗi Google Services, tạm thời:

1. **Comment Google Auth button** trong `SimpleLogin.tsx`
2. **Sử dụng Mock Login** để test app
3. **Kiểm tra API connection**

### **Lỗi API Connection**

```bash
# Test API
curl https://api.cyese.me/health

# Nếu API không hoạt động, đổi về localhost
# Trong .env:
EXPO_PUBLIC_BASE_URL=http://10.0.2.2:3000/api/
```

### **Lỗi Build**

```bash
# Clear cache và rebuild
eas build --platform android --profile production-apk --clear-cache
```

## 📋 **BUILD PROFILES**

### **development** - Development APK
```json
{
  "developmentClient": true,
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```

### **preview** - Preview APK
```json
{
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```

### **production-apk** - Production APK
```json
{
  "android": {
    "buildType": "apk"
  }
}
```

## 🧪 **TEST FEATURES**

Sau khi cài APK, test:

1. **✅ App mở được**
2. **✅ Navigation hoạt động**
3. **✅ Login với Mock User**
4. **✅ Truy cập các tab (Home, Study, Forum, Chat, Profile)**
5. **✅ Quiz system hoạt động**
6. **⚠️ Google Auth** (cần cấu hình thêm)
7. **⚠️ API calls** (cần server hoạt động)

## 🔄 **NEXT STEPS**

Sau khi APK hoạt động cơ bản:

1. **Cấu hình Google Services đúng**
2. **Setup production API**
3. **Test Google Authentication**
4. **Optimize performance**
5. **Add app signing**

## 📞 **SUPPORT**

Nếu cần hỗ trợ:
1. Check build logs trong EAS
2. Test trên emulator trước
3. Verify environment variables
4. Check package.json dependencies

## 🎯 **EXPECTED RESULT**

APK sẽ:
- ✅ Mở được app
- ✅ Hiển thị Welcome screen
- ✅ Navigate được giữa các screens
- ✅ Login với Mock User
- ✅ Truy cập được tất cả features
- ⚠️ Google Auth cần setup thêm
- ⚠️ API calls cần server

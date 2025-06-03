# 🔐 Complete Google OAuth Setup for BK Jobmate APK

## 🎯 **OVERVIEW**

Để Google Authentication hoạt động trên APK, bạn cần:
1. ✅ **google-services.json thực tế** (đã cập nhật)
2. ✅ **Client IDs đúng** (đã có trong .env)
3. ⚠️ **SHA-1 fingerprint** (cần setup)
4. ⚠️ **Google Cloud Console config** (cần setup)

## 🚀 **QUICK SETUP (5 phút)**

### **Bước 1: Lấy SHA-1 Fingerprint**

**Option A: Sử dụng Default Debug SHA-1**
```
SHA-1: 58:E1:C5:71:FB:AC:73:93:FC:01:7A:AB:B0:96:E2:8D:20:4E:62:F0
```
*Dùng cho testing/development builds*

**Option B: Lấy từ EAS Build**
```bash
eas credentials --platform android
```

### **Bước 2: Setup Google Cloud Console**

1. **Truy cập**: https://console.cloud.google.com/apis/credentials
2. **Create Credentials** → **OAuth client ID**
3. **Application type**: Android
4. **Package name**: `com.bkjobmate.app`
5. **SHA-1 certificate fingerprint**: Paste SHA-1 từ bước 1
6. **Create** và copy **Client ID**

### **Bước 3: Setup Firebase (Optional)**

1. **Truy cập**: https://console.firebase.google.com/
2. **Add project** hoặc chọn project có sẵn
3. **Add app** → **Android**
4. **Package name**: `com.bkjobmate.app`
5. **Download google-services.json**
6. **Replace** file hiện tại

### **Bước 4: Update Environment Variables**

Cập nhật `.env` với Client ID mới:
```env
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your_new_android_client_id.apps.googleusercontent.com
```

### **Bước 5: Rebuild APK**

```bash
npm run build:apk
```

## 🔧 **CURRENT STATUS**

### ✅ **Đã hoàn thành:**
- google-services.json với cấu trúc đúng
- Client IDs trong .env
- Error handling cải thiện
- Package name: com.bkjobmate.app

### ⚠️ **Cần setup:**
- SHA-1 fingerprint trong Google Cloud Console
- Android OAuth Client ID mới (nếu cần)

## 🧪 **TESTING**

### **Test trên APK:**
1. Cài APK trên thiết bị
2. Mở app → Login
3. Tap "Đăng nhập với Google"
4. Kiểm tra:
   - ✅ Google sign-in popup xuất hiện
   - ✅ Có thể chọn tài khoản Google
   - ✅ Redirect về app thành công
   - ✅ User được authenticate

### **Debug Issues:**

**Lỗi "Client ID not configured":**
- Kiểm tra .env có đúng Client ID
- Verify package name: com.bkjobmate.app

**Lỗi "Sign in failed":**
- Kiểm tra SHA-1 fingerprint
- Verify Google Cloud Console setup

**Lỗi "Network error":**
- Kiểm tra internet connection
- Verify API URL: https://api.cyese.me/

## 📱 **PRODUCTION SETUP**

Cho production build:
1. **Generate production keystore**
2. **Get production SHA-1**
3. **Create production OAuth Client ID**
4. **Update google-services.json**
5. **Build signed APK**

## 🆘 **TROUBLESHOOTING**

### **Common Issues:**

**Google sign-in không mở:**
```bash
# Check logs
adb logcat | grep -i google
```

**Authentication failed:**
- Verify Client IDs match
- Check SHA-1 fingerprint
- Ensure package name consistency

**App crashes after Google auth:**
- Check API endpoint
- Verify backend integration
- Check token handling

## 🎯 **EXPECTED RESULT**

Sau khi setup đúng:
- ✅ Google sign-in button hoạt động
- ✅ Google popup xuất hiện
- ✅ User có thể chọn tài khoản
- ✅ Redirect về app thành công
- ✅ User được đăng nhập vào app
- ✅ Navigate đến Home screen

## 📞 **SUPPORT**

Nếu vẫn gặp vấn đề:
1. Run: `npm run setup-google` để xem status
2. Check build logs trong EAS
3. Verify tất cả URLs và IDs
4. Test trên emulator trước khi test APK

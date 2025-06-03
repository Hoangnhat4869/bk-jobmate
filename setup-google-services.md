# 🔧 Hướng dẫn cấu hình Google Services cho APK

## ⚠️ **VẤN ĐỀ HIỆN TẠI**

1. **google-services.json là placeholder** → Google Auth không hoạt động
2. **API URL trỏ localhost** → App không kết nối được server
3. **Thiếu cấu hình production** → App crash khi mở

## 🚀 **GIẢI PHÁP**

### **Bước 1: Tạo Firebase Project**

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Thêm Android app:
   - **Package name**: `com.bkjobmate.app`
   - **App nickname**: `BK Jobmate`
   - **Debug signing certificate SHA-1**: (tùy chọn)

### **Bước 2: Tải google-services.json**

1. Sau khi tạo app, tải file `google-services.json`
2. Thay thế file hiện tại trong project
3. Đảm bảo package name khớp: `com.bkjobmate.app`

### **Bước 3: Cấu hình Google OAuth**

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project Firebase vừa tạo
3. Vào **APIs & Services > Credentials**
4. Tạo OAuth 2.0 Client IDs:

#### **Android Client ID**
- Application type: Android
- Package name: `com.bkjobmate.app`
- SHA-1 certificate fingerprint: (từ keystore production)

#### **Web Client ID** 
- Application type: Web application
- Authorized redirect URIs:
  - `https://api.cyese.me/auth/google/callback`

### **Bước 4: Cập nhật Environment Variables**

Cập nhật file `.env` với Client IDs thực tế:

```env
# Google OAuth Client IDs (Production)
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_real_web_client_id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your_real_android_client_id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your_real_ios_client_id.apps.googleusercontent.com
```

### **Bước 5: Lấy SHA-1 Fingerprint**

Để lấy SHA-1 fingerprint cho production:

```bash
# Nếu sử dụng debug keystore
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Nếu có production keystore
keytool -list -v -keystore path/to/your/production.keystore -alias your-alias
```

### **Bước 6: Test API Connection**

Kiểm tra API có hoạt động:

```bash
curl https://api.cyese.me/health
```

## 🔧 **QUICK FIX - Tạm thời**

Nếu muốn test nhanh, có thể:

1. **Tắt Google Auth tạm thời**
2. **Sử dụng mock authentication**
3. **Test với API production**

### **Tắt Google Auth**

Trong `src/Screens/Login/SimpleLogin.tsx`, comment dòng Google button:

```tsx
{/* <TouchableOpacity
  style={styles.googleButton}
  onPress={signInWithGoogle}
  disabled={isLoading}
>
  // Google button content
</TouchableOpacity> */}
```

### **Mock Authentication**

Tạo function mock login:

```tsx
const mockLogin = async () => {
  const mockUser = {
    id: "mock-user-id",
    email: "test@example.com",
    displayName: "Test User",
    authMethod: "email" as const
  };
  
  // Store mock user
  await AsyncStorage.setItem("user", JSON.stringify(mockUser));
  setUser(mockUser);
};
```

## 📱 **BUILD APK**

Sau khi cấu hình xong:

```bash
# Build APK
eas build --platform android --profile production-apk

# Hoặc build local
eas build --platform android --profile production-apk --local
```

## ✅ **CHECKLIST**

- [ ] Tạo Firebase project
- [ ] Tải google-services.json thực tế
- [ ] Cấu hình Google OAuth credentials
- [ ] Cập nhật environment variables
- [ ] Test API connection
- [ ] Build và test APK

## 🆘 **SUPPORT**

Nếu cần hỗ trợ:
1. Kiểm tra logs trong `eas build`
2. Test API với Postman/curl
3. Verify Google OAuth setup
4. Check package name consistency

# 🔧 Hướng dẫn Setup Google OAuth Redirect URI

## 🚨 **Vấn đề hiện tại**

Bạn đang gặp lỗi redirect khi đăng nhập Google vì:
1. **Sử dụng cùng Client ID cho tất cả platform** (Web, Android, iOS)
2. **Chưa cấu hình Redirect URI đúng** trong Google Cloud Console
3. **Redirect URI không khớp** với những gì app gửi đến Google

## ✅ **Giải pháp chi tiết**

### **Bước 1: Tạo các Client ID riêng biệt**

#### 🌐 **Web Client ID**
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project của bạn
3. Đi tới **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Chọn **Application type: Web application**
6. **Name:** `BKJobmate Web`
7. **Authorized JavaScript origins:**
   ```
   http://localhost:8081
   http://localhost:3000
   https://yourdomain.com
   ```
8. **Authorized redirect URIs:**
   ```
   http://localhost:8081/
   http://localhost:3000/
   https://yourdomain.com/
   ```
9. Click **Create** và copy Client ID

#### 📱 **Android Client ID**
1. **Create Credentials > OAuth client ID**
2. **Application type: Android**
3. **Name:** `BKJobmate Android`
4. **Package name:** `com.bkjobmate.app`
5. **SHA-1 certificate fingerprint:** 
   ```bash
   # Development keystore
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   
   # Production keystore
   keytool -list -v -keystore path/to/your/production.keystore -alias your-alias
   ```
6. Click **Create** và copy Client ID

#### 🍎 **iOS Client ID**
1. **Create Credentials > OAuth client ID**
2. **Application type: iOS**
3. **Name:** `BKJobmate iOS`
4. **Bundle ID:** `com.bkjobmate.app`
5. Click **Create** và copy Client ID

### **Bước 2: Cập nhật Environment Variables**

Cập nhật file `.env` với các Client ID mới:

```env
# Google OAuth Client IDs (Development)
# Web Client ID - for web authentication
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id_here.apps.googleusercontent.com
# Android Client ID - for Android app authentication
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your_android_client_id_here.apps.googleusercontent.com
# iOS Client ID - for iOS app authentication
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your_ios_client_id_here.apps.googleusercontent.com
```

### **Bước 3: Kiểm tra cấu hình**

Chạy script kiểm tra:
```bash
npm run test:redirect
```

### **Bước 4: Test authentication**

1. **Start development server:**
   ```bash
   npm run web
   ```

2. **Mở browser và truy cập:**
   ```
   http://localhost:8081/login
   ```

3. **Click "Đăng nhập với Google"**

4. **Kiểm tra browser console** để xem có lỗi không

## 🔍 **Troubleshooting**

### ❌ **Lỗi "redirect_uri_mismatch"**
**Nguyên nhân:** Redirect URI trong Google Console không khớp với URI mà app gửi

**Giải pháp:**
- Đảm bảo có thêm `http://localhost:8081/` (có dấu `/` cuối)
- Kiểm tra port đúng (8081 cho Expo web)
- Xóa cache browser và thử lại

### ❌ **Lỗi "invalid_client"**
**Nguyên nhân:** Client ID không đúng hoặc không tồn tại

**Giải pháp:**
- Kiểm tra Client ID trong `.env` file
- Đảm bảo sử dụng **Web Client ID** cho web testing
- Restart development server sau khi thay đổi `.env`

### ❌ **Lỗi "access_denied"**
**Nguyên nhân:** User từ chối hoặc app chưa được approve

**Giải pháp:**
- Kiểm tra OAuth consent screen
- Thêm email test user nếu app đang ở testing mode
- Kiểm tra scope permissions

### ❌ **Không redirect sau authentication**
**Nguyên nhân:** Redirect URI không được handle đúng

**Giải pháp:**
- Kiểm tra app có đang chạy trên đúng port
- Xem browser console có lỗi JavaScript không
- Kiểm tra network tab để xem request/response

## 🧪 **Testing Commands**

```bash
# Kiểm tra cấu hình Google OAuth
npm run test:google-oauth

# Kiểm tra redirect URI setup
npm run check:redirect-uri

# Test redirect configuration
npm run test:redirect

# Start web development server
npm run web
```

## 📋 **Checklist**

- [ ] Tạo Web Client ID riêng biệt
- [ ] Tạo Android Client ID riêng biệt  
- [ ] Tạo iOS Client ID riêng biệt
- [ ] Cấu hình Authorized JavaScript origins
- [ ] Cấu hình Authorized redirect URIs
- [ ] Cập nhật `.env` file với Client IDs mới
- [ ] Test trên web browser
- [ ] Kiểm tra browser console không có lỗi
- [ ] Test redirect flow hoàn chỉnh

## 🎯 **Expected Results**

Sau khi setup đúng:
1. ✅ Click "Đăng nhập với Google" sẽ mở popup/redirect đến Google
2. ✅ Sau khi đăng nhập thành công, sẽ redirect về app
3. ✅ User được authenticate và navigate đến main screen
4. ✅ Không có lỗi trong browser console

## 📞 **Cần hỗ trợ thêm?**

Nếu vẫn gặp vấn đề, hãy:
1. Chạy `npm run test:redirect` và gửi kết quả
2. Kiểm tra browser console và gửi error messages
3. Xác nhận đã cấu hình đúng redirect URIs trong Google Console
4. Đảm bảo đang sử dụng đúng Client ID cho từng platform

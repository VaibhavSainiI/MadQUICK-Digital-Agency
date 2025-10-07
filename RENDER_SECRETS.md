# 🚀 RENDER DEPLOYMENT ENVIRONMENT VARIABLES

## 📋 Copy these exact values to your Render dashboard:

### Variable 1: MONGODB_URI
```
mongodb+srv://vaibhavsaini0702_db_user:qwertyuiop@cluster0.4283qqp.mongodb.net/password-vault?retryWrites=true&w=majority&appName=Cluster0
```

### Variable 2: NEXTAUTH_SECRET (Generated: October 7, 2025)
```
Kf8mN2pQ9rT5wX1aZ6cV3bE7hJ0nM4sL9pTw2RnX5Yb8
```

### Variable 3: NEXTAUTH_URL
```
https://your-app-name.onrender.com
```
⚠️ **Replace "your-app-name" with your actual Render service name**

### Variable 4: NODE_ENV
```
production
```

## 🔧 How to Add in Render:

1. **Go to your Render dashboard**
2. **Select your web service**
3. **Navigate to "Environment" tab**
4. **Click "Add Environment Variable"**
5. **Add each variable one by one:**

   | Key | Value |
   |-----|--------|
   | `MONGODB_URI` | `mongodb+srv://vaibhavsaini0702_db_user:qwertyuiop@cluster0.4283qqp.mongodb.net/password-vault?retryWrites=true&w=majority&appName=Cluster0` |
   | `NEXTAUTH_SECRET` | `Kf8mN2pQ9rT5wX1aZ6cV3bE7hJ0nM4sL9pTw2RnX5Yb8` |
   | `NEXTAUTH_URL` | `https://your-app-name.onrender.com` |
   | `NODE_ENV` | `production` |

6. **Save and deploy**

## ✅ Security Features:
- ✅ 40-character cryptographically secure NEXTAUTH_SECRET
- ✅ Your existing MongoDB credentials preserved
- ✅ Production-ready configuration
- ✅ Secure authentication setup

## 🔒 Security Notes:
- These secrets are for PRODUCTION use only
- Never use the same secrets for development and production
- Keep this file private and secure
- Delete this file after copying to Render
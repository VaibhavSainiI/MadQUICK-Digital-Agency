# Password Vault - Render Deployment

## 🚀 Deploy to Render

This Password Vault application is configured for easy deployment to Render.

### Prerequisites
- GitHub repository with your code
- MongoDB Atlas database (or other MongoDB instance)
- Render account

### Environment Variables Required

Add these environment variables in your Render dashboard:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js (32+ chars) | `your-super-secret-key-here-32-characters` |
| `NEXTAUTH_URL` | Your Render app URL | `https://your-app.onrender.com` |

### Deployment Steps

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Name:** `password-vault` (or your choice)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `master`
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`

3. **Set Environment Variables**
   - Add all required environment variables
   - Generate a strong NEXTAUTH_SECRET (32+ characters)
   - Set NEXTAUTH_URL to your Render app URL

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)

### Features Included
- ✅ User authentication
- ✅ Password generation
- ✅ Secure vault storage
- ✅ Dark theme UI
- ✅ Responsive design
- ✅ Client-side encryption

### Support
If you need help with deployment, check the Render documentation or contact support.
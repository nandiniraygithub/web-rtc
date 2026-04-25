# 🚀 Deployment Guide: Netlify + Vercel

## 📋 Overview
- **Frontend**: Netlify (React app)
- **Backend**: Vercel (Socket.IO API)

---

## 🎯 Step 1: Deploy Backend to Vercel

### 1. Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repo: `nandiniraygithub/web-rtc`
4. Configure:
   ```
   Framework Preset: Other
   Root Directory: ./
   Build Command: npm run build
   Output Directory: client/dist
   Install Command: cd client && npm install
   ```

### 2. Update Environment (if needed)
Vercel will automatically detect and deploy your API routes at `/api/socket`

### 3. Get Your Vercel URL
After deployment, you'll get a URL like:
`https://your-app.vercel.app`

---

## 🌐 Step 2: Deploy Frontend to Netlify

### 1. Build Frontend Locally
```bash
cd client
npm run build
```

### 2. Update Socket Connection
Edit `client/src/utils/socket.js`:

```javascript
// Replace the production URL with your Vercel backend URL
const getSocketUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000'
  }
  
  // Use your Vercel backend URL
  return 'https://your-app.vercel.app/api/socket'
}
```

### 3. Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)

### 4. Deploy to Netlify

#### Option A: Drag & Drop (Easiest)
1. Go to `client/dist` folder
2. Drag the entire `dist` folder to Netlify
3. Get your Netlify URL: `https://your-app.netlify.app`

#### Option B: Git Integration
1. Connect your GitHub repo to Netlify
2. Set:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

---

## 🔗 Step 3: Connect Frontend to Backend

### Update Frontend Socket URL
In `client/src/utils/socket.js`, make sure it points to your Vercel backend:

```javascript
const getSocketUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000'
  }
  
  // Your Vercel backend URL
  return 'https://your-app-name.vercel.app/api/socket'
}
```

### Rebuild and Redeploy Frontend
```bash
cd client
npm run build
# Redeploy the dist folder to Netlify
```

---

## ✅ Step 4: Test Your App

1. **Visit your Netlify URL**: `https://your-app.netlify.app`
2. **Create a meeting**
3. **Open another tab** or share the link
4. **Test video connection**

---

## 🛠️ Troubleshooting

### CORS Issues
If you get CORS errors, make sure your Vercel API allows your Netlify domain:

In `api/socket.js`, update the CORS:
```javascript
cors: {
  origin: ["https://your-app.netlify.app", "https://localhost:5173"],
  methods: ["GET", "POST"]
}
```

### Socket Connection Issues
1. Check browser console for errors
2. Verify the socket URL is correct
3. Make sure both frontend and backend are deployed

### Build Errors
1. Clear node_modules and reinstall
2. Check all dependencies are installed
3. Verify build commands work locally

---

## 🌟 Final URLs

Your app will work like this:
- **Frontend**: `https://your-app.netlify.app`
- **Backend API**: `https://your-app.vercel.app/api/socket`
- **Socket Connection**: Frontend connects to Vercel backend

This setup gives you:
- ✅ Fast static hosting (Netlify)
- ✅ Serverless API (Vercel)
- ✅ Global CDN for both
- ✅ Free hosting for both services

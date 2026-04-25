# 🚀 Deployment Guide

## 🌐 Why You're Getting 404 Error

Netlify/Vercel are **static hosting** services. They can only host frontend files (HTML, CSS, JS), **NOT** backend servers (Node.js).

Your app needs:
- ✅ **Frontend** (React) - Can go to Netlify/Vercel  
- ❌ **Backend** (Node.js server) - Needs a server environment

## 🔧 Solution Options

### Option 1: Separate Deployment (Recommended)

#### Frontend: Netlify/Vercel
```bash
# Build for production
cd client
npm run build

# Deploy dist/ folder to Netlify
```

#### Backend: Railway/Render/Heroku
```bash
# Deploy server folder to Railway
# Or use Render free tier
# Or Heroku (paid now)
```

### Option 2: Full-Stack Platforms

#### Vercel (API Routes)
Convert server to Vercel API routes:
```javascript
// pages/api/socket.js
import { Server } from 'socket.io'
import { Server as NetServer } from 'http'

export default function handler(req, res) {
  // Socket.IO logic here
}
```

#### Railway (Full Stack)
Deploy entire app together:
```bash
# Root package.json with scripts
{
  "scripts": {
    "start": "cd server && node server.js",
    "build": "cd client && npm run build"
  }
}
```

### Option 3: Self-Hosting

#### DigitalOcean/Vultr
```bash
# Rent a VPS ($5/month)
# Install Node.js
# Run both frontend and backend
```

#### Home Server
```bash
# Use your own computer
# Dynamic DNS for public access
```

## 🏗️ Recommended Setup

### For Production:
1. **Frontend**: Netlify (free)
2. **Backend**: Railway ($5/month or free tier)
3. **Domain**: Custom domain pointing to both

### For Development:
1. **Frontend**: Vercel dev
2. **Backend**: Your computer
3. **Testing**: Local network only

## 🔧 Quick Fix for Now

### Update Socket Connection
Change client to use production backend URL:

```javascript
// client/src/utils/socket.js
const socket = io('https://your-backend-url.com')
```

### Environment Variables
```javascript
// .env.production
VITE_SOCKET_URL=https://your-backend-url.com
```

## 📱 Free Deployment Options

| Service | What it hosts | Cost | Good for |
|---------|---------------|------|----------|
| Netlify | Frontend only | Free | React apps |
| Vercel | Frontend + API | Free | Full-stack |
| Railway | Backend only | $5/mo | Node.js servers |
| Render | Backend only | Free tier | Node.js servers |
| GitHub Pages | Frontend only | Free | Static sites |

## 🚀 Step-by-Step Railway Deployment

1. **Push to GitHub** ✅ (Already done!)

2. **Go to [railway.app](https://railway.app)**

3. **Connect GitHub repo**

4. **Configure deployment:**
   ```
   Root Directory: /server
   Build Command: npm install
   Start Command: node server.js
   ```

5. **Get your Railway URL** (e.g., `your-app.up.railway.app`)

6. **Update frontend socket URL** to point to Railway

7. **Deploy frontend to Netlify**

## 🎯 Fastest Solution

For now, **use Railway for backend** and **Netlify for frontend**. This gives you:
- ✅ Working video calls
- ✅ Global access
- ✅ Free/cheap hosting
- ✅ Professional setup

## 📞 Need Help?

- Railway docs: https://docs.railway.app
- Netlify docs: https://docs.netlify.com
- Vercel docs: https://vercel.com/docs

# 🔗 ByteLink

A full-stack URL shortener app with analytics support built using **React.js** and **Node.js**. Users can shorten URLs, track performance (clicks, devices), and view detailed analytics.

## 🚀 Live Demo

- 🌐 Frontend: [https://bytelink-app.vercel.app](https://bytelink-app.vercel.app)
- 🛠️ Backend API: [https://bytelink-server.onrender.com](https://bytelink-server.onrender.com)

---

## 👤 Test Credentials

Use the credentials below to explore the app:

- **Email**: `user@bytelink.com`  
- **Password**: `Test123`

---

## 🚀 Features

- ✅ JWT-based authentication  
- ✅ Create short links with optional custom alias & expiry date  
- ✅ Analytics dashboard with:
  - Total clicks
  - Device & browser stats
  - Clicks over time (chart)
  - Expiration status
- ✅ Async click logging (IP, timestamp, device type)
- ✅ Charts & visual breakdown
- ✅ Search & pagination support for the analytics
- ✅ QR Code for generated short link

---

## 💻 Tech Stack

- **Frontend**: React, Recharts, TailwindCSS, Context API  
- **Backend**: Node.js, Express  
- **Database**: MongoDB 
- **Auth**: JWT Authentication


---

## 🧩 Environment Variables for Testing in local

### Backend `.env`

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend `.env`
```
VITE_SERVER_API=https://bytelink-server.onrender.com
VITE_CLIENT_URL=https://bytelink-app.vercel.app
```

---

## 🛠️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/bytelink.git
cd bytelink
```
```bash
cd backend
npm install
touch .env  # Add your Mongo URL and JWT secret
node.index.js
```
```bash
cd frontend
npm install
touch .env  # Add VITE_SERVER_API and VITE_CLIENT_URL
npm run dev
```

---
📬 **Built by Subhash**

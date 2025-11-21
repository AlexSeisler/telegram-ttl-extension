# 🕒 Telegram TTL Sender (Chrome Extension + Backend)

## 🎥 Demo  
<p align="center">
  <a href="https://youtu.be/xUtk6-6y2aE" target="_blank">
    <img src="https://img.youtube.com/vi/xUtk6-6y2aE/hqdefault.jpg" width="600" />
  </a>
  <br />
  <a href="https://youtu.be/xUtk6-6y2aE" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Watch%20Demo-YouTube-red?style=for-the-badge&logo=youtube" />
  </a>
</p>

---

## 🚀 Overview

Telegram TTL Sender is a **Chrome Extension + Node.js backend integration** that allows users to send **self-destructing photos (TTL)** directly via Telegram.  
It leverages the **GramJS MTProto client** and provides a simple web-based frontend for interaction.

---

## 🧩 Features

- Chrome Extension popup to upload an image and set TTL seconds  
- Secure backend built with **Express.js** + **GramJS**  
- Supports Telegram username or phone number  
- Automatically deletes photos after TTL expires on Telegram  
- Fully CORS-enabled API for local testing  

---

## 🏗️ Architecture

```
telegram-ttl-extension/
├── telegram-ttl-validation/
│   ├── backend/
│   │   ├── server.js          # Express API endpoint
│   │   ├── sendTTLTest.js     # Telegram TTL logic using GramJS
│   │   ├── .env               # API_ID, API_HASH, etc.
│   │   ├── session.txt        # Auth session for Telegram client
│   └── extension/
│       ├── manifest.json
│       ├── popup.html
│       ├── popup.js
│       ├── style.css
│       └── background.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/AlexSeisler/telegram-ttl-extension.git
cd telegram-ttl-validation/backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment
Create a `.env` file:
```
API_ID=your_telegram_api_id
API_HASH=your_telegram_api_hash
PORT=5050
```
Ensure `session.txt` exists (generated via GramJS login).

### 4️⃣ Start Backend
```bash
node server.js
```
Backend available at:  
➡️ **http://localhost:5050**

---

## 🧠 Chrome Extension Setup

1. Open **chrome://extensions**  
2. Enable **Developer Mode**  
3. Click **Load unpacked** → select `telegram-ttl-validation/extension`  
4. Open popup and send a test TTL photo  

---

## ✅ Demo Flow

1. Enter **@username** or **phone number**  
2. Set TTL duration (e.g., 10)  
3. Upload an image → click **Send**  
4. Telegram displays TTL message → expires automatically  
5. Chrome popup updates:
   - "📤 Sending…"
   - "✅ Sent!"
   - "💨 Expired (message self-destructed)"

---

## 🧰 Tech Stack

- **Node.js / Express**  
- **GramJS (Telegram MTProto Client)**  
- **Chrome Extension (Manifest v3)**  
- **CORS-enabled JSON API**  
- **dotenv** for secure configuration  

---

## 🧑‍💻 Developer

**Alex Seisler**  
Full-stack engineer & AI innovator  
📦 **Repo:** [telegram-ttl-extension](https://github.com/AlexSeisler/telegram-ttl-extension)


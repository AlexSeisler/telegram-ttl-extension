# 🕒 Telegram TTL Sender (Chrome Extension + Backend)

## 🚀 Overview

Telegram TTL Sender is a **Chrome Extension + Node.js backend integration** that allows users to send **self-destructing photos (TTL)** directly via Telegram.
It leverages the **GramJS MTProto client** for Telegram and provides a simple web-based frontend for interaction.

---

## 🧩 Features

- Chrome Extension popup to upload an image and set TTL (time-to-live) in seconds  
- Secure backend built with **Express.js** and **GramJS**  
- Supports Telegram username or phone number as recipient  
- Automatically deletes photos after TTL expires on Telegram  
- Full CORS-enabled integration for local testing  

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
Make sure `session.txt` exists (generated via GramJS login).

### 4️⃣ Start Backend
```bash
node server.js
```
Backend will start at:  
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


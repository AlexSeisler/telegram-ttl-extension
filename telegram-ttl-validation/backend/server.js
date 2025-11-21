const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // 👈 add this line
const { sendTTL } = require("./sendTTLTest.js");

dotenv.config();
const app = express();

// Enable CORS for all origins (or specify the extension ID if you want stricter security)
app.use(cors());

// Optional: for debugging, confirm requests
app.use((req, res, next) => {
  console.log("🔗 Request from:", req.headers.origin);
  next();
});

app.use(bodyParser.json({ limit: "20mb" }));

app.post("/sendTTL", async (req, res) => {
  try {
    const { peer, ttl, image } = req.body;
    console.log(`📩 Received TTL request for ${peer} (${ttl}s)`);

    const result = await sendTTL(peer, ttl, image);
    res.json({ success: true, messageId: result.id });
  } catch (err) {
    console.error("❌ Error sending TTL:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Backend listening on port ${PORT}`));

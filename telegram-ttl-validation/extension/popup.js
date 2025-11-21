// Enhanced popup.js — persistent TTL, presets, and improved UI feedback

// Load saved peer/TTL on startup
window.addEventListener("load", async () => {
  const { lastPeer, lastTTL } = await chrome.storage.local.get(["lastPeer", "lastTTL"]);
  if (lastPeer) document.getElementById("peer").value = lastPeer;
  if (lastTTL) document.getElementById("ttl").value = lastTTL;
});

// Handle Send button click
document.getElementById("send").addEventListener("click", async () => {
  const peer = document.getElementById("peer").value.trim();
  const ttl = parseInt(document.getElementById("ttl").value, 10);
  const file = document.getElementById("file").files[0];
  const status = document.getElementById("status");

  if (!peer || !ttl || !file) {
    status.textContent = "⚠️ Missing input.";
    status.style.color = "orange";
    return;
  }

  // Persist the last-used inputs
  await chrome.storage.local.set({ lastPeer: peer, lastTTL: ttl });

  status.textContent = "📤 Sending...";
  status.style.color = "#007bff";

  const base64 = await toBase64(file);

  try {
    const resp = await fetch("http://localhost:5050/sendTTL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ peer, ttl, image: base64 }),
    });

    const data = await resp.json();
    if (data.success) {
      status.textContent = `✅ Sent! (Message ID: ${data.messageId})`;
      status.style.color = "green";

      // Show TTL expiry visually
      setTimeout(() => {
        status.textContent = "💨 Expired (message self-destructed)";
        status.style.color = "gray";
      }, ttl * 1000);
    } else {
      status.textContent = `❌ Error: ${data.error}`;
      status.style.color = "red";
    }
  } catch (err) {
    status.textContent = "❌ Backend not reachable.";
    status.style.color = "red";
  }
});

// Utility to convert files to base64 strings
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

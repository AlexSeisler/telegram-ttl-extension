// Content script: bridge popup → background
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SEND_TTL_PHOTO" || msg.type === "INIT_CLIENT") {
    chrome.runtime.sendMessage(msg);
  }
});

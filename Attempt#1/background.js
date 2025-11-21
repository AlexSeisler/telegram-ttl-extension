// Background: Load GramJS library (PLACEHOLDER)
// User must add gramjs.min.js to the extension folder and import here.

importScripts('gramjs.min.js'); // Ensure this file exists in the extension

const { TelegramClient } = gramjs;
const { StringSession } = gramjs.sessions;

let client = null;

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === "INIT_CLIENT") {
    const apiId = msg.apiId;
    const apiHash = msg.apiHash;

    client = new TelegramClient(new StringSession(""), apiId, apiHash, { connectionRetries: 5 });
    await client.start({
      qrCode: (code) => {
        chrome.storage.local.set({ qr: code });
      },
    });
    sendResponse({ ok: true });
  }

  if (msg.type === "SEND_TTL_PHOTO") {
    const { blobUrl, ttl } = msg;
    const res = await fetch(blobUrl);
    const blob = await res.arrayBuffer();

    const inputFile = await client.uploadFile({ file: new Uint8Array(blob), workers: 1 });

    await client.invoke(
      new gramjs.Api.messages.SendMedia({
        peer: await client.getInputEntity("me"),
        media: new gramjs.Api.InputMediaUploadedPhoto({
          file: inputFile,
          ttlSeconds: ttl
        }),
        message: "",
        randomId: BigInt(Date.now())
      })
    );

    sendResponse({ ok: true });
  }

  return true;
});

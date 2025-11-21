const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { Api } = require('telegram');
const { CustomFile } = require('telegram/client/uploads');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const apiId = +process.env.API_ID;
const apiHash = process.env.API_HASH;
const session = new StringSession(fs.readFileSync('session.txt', 'utf8'));

async function sendTTL(peer, ttlSeconds, base64Image) {
  const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });
  await client.connect();

  // 🧩 Stop update loop safely depending on version
  if (client._updates?.stop) client._updates.stop();
  else if (client._updateManager?.stop) client._updateManager.stop();

  console.log('✅ Session loaded');

  try {
    // Decode base64 image from frontend into a temporary file
    const tempPath = path.resolve(__dirname, `temp_${Date.now()}.jpg`);
    fs.writeFileSync(tempPath, Buffer.from(base64Image, 'base64'));

    console.log(`🧩 Received TTL send request for ${peer} (${ttlSeconds}s)`);

    const entity = await client.getEntity(peer);
    console.log('🎯 Target resolved:', entity.id);

    const fileStats = fs.statSync(tempPath);
    const fileToUpload = new CustomFile('photo.jpg', fileStats.size, tempPath);

    const uploaded = await client.uploadFile({
      file: fileToUpload,
      workers: 1,
    });

    const result = await client.invoke(
      new Api.messages.SendMedia({
        peer: entity,
        media: new Api.InputMediaUploadedPhoto({
          file: uploaded,
          ttlSeconds,
        }),
        message: '',
      })
    );

    console.log('⏱️ TTL photo sent successfully!', result);
    fs.unlinkSync(tempPath); // 🧹 Clean up temp file after upload

    return result;
  } catch (err) {
    console.error('❌ Error sending TTL photo:', err);
    throw err;
  } finally {
    try {
      await client.disconnect();
    } catch (err) {
      if (err.message.includes('TIMEOUT')) {
        console.warn('⚠️ Ignored harmless timeout on disconnect.');
      } else {
        console.error('Unexpected error during disconnect:', err);
      }
    }
  }
}

module.exports = { sendTTL };

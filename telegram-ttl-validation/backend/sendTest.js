const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
require('dotenv').config();
const fs = require('fs');

const apiId = +process.env.API_ID;
const apiHash = process.env.API_HASH;
const session = new StringSession(fs.readFileSync('session.txt', 'utf8'));

(async () => {
  const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });
  await client.connect();
  console.log('✅ Session loaded');

  try {
    const entity = await client.getEntity(8529140154); // TTL_RETEST internal ID

    await client.sendMessage(entity, { message: 'Hello from backend test!' });
    console.log('💬 Text message sent');

    await client.sendFile(entity, { file: './test.jpg', caption: 'Photo from GramJS backend' });
    console.log('📸 Image sent successfully');
  } catch (err) {
    console.error('❌ Error sending message:', err);
  }

  process.exit(0);
})();

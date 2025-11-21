const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');
require('dotenv').config();
const fs = require('fs');

const apiId = +process.env.API_ID;
const apiHash = process.env.API_HASH;
const session = new StringSession('');

(async () => {
  console.log('[*] Starting manual phone-code login');
  const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });
  await client.connect();

  // ask for your phone and login code
  await client.start({
    phoneNumber: async () => await input.text('Enter your phone number (with country code): '),
    password: async () => await input.text('2-step password (if enabled, else leave blank): '),
    phoneCode: async () => await input.text('Enter the code Telegram sent you: '),
    onError: (err) => console.error('Login error:', err)
  });

  console.log('✅ Logged in successfully!');
  const saved = client.session.save();
  fs.writeFileSync('session.txt', saved);
  console.log('Session saved to session.txt');
  process.exit(0);
})();

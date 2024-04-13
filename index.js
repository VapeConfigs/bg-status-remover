const config = require('./config.js')
const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((i) => {
    return GatewayIntentBits[i];
  }),
});

/**
 * DISCORD : aisgege
 * BY AISGEGE 
 * SILAHKAN PAKAI SEPUASNYA
 */

let statusIndex = 0;

function update() {
  let currentStatus = config.statusMessage[statusIndex];
  if(!currentStatus) {
    currentStatus = config.statusMessage[0]
    statusIndex = 0
  }

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom}],
    status: config.status,
  });

  statusIndex += 1
}

client.once('ready', () => {
  console.log(`✅ ${client.user.tag} sudah siap!`);
  update();

  setInterval(() => {
      update()
  }, config.statusInterval);
});

client.login(config.token);
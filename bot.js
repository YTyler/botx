const { Client, IntentsBitField } = require("discord.js");
const CONFIG = require("./config.json");
const data = require("emojibase-data/en/compact.json");
const cron = require("node-cron");

const myIntents = new IntentsBitField([IntentsBitField.Flags.GuildMessages]); //bot permissions
const client = new Client({ intents: myIntents });

client.login(CONFIG.BOT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  cron.schedule(
    "* * * * *",
    () => {
      const bannedCategories = [8, 9];
      const randomEmojis = [];

      while (randomEmojis.length < 3) {
        //Choose an emoji
        let randomIndex = Math.floor(Math.random() * data.length);
        let emoji = data.at(randomIndex);

        //repick if emoji from previous or banned category
        while (bannedCategories.includes(emoji.group)) {
          randomIndex = Math.floor(Math.random() * data.length);
          emoji = data.at(randomIndex);
        }
        //add final emoji info to arrays
        bannedCategories.push(emoji.group);
        randomEmojis.push(emoji.unicode);
      }
      // send emoji message
      client.channels
        .fetch(CONFIG.CHANNEL_ID)
        .then((channel) => {
          channel.send("**Doodlebot says draw this!**");
          channel.send(randomEmojis.join(" "));
        })
        .catch(() => console.error);
    },
    {
      timezone: "America/New_York",
    }
  );
});

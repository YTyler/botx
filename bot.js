const { Client, IntentsBitField } = require("discord.js");
const CONFIG = require("./config.json");
const data = require("./lib-emoji.json");
const cron = require("node-cron");

const myIntents = new IntentsBitField([IntentsBitField.Flags.GuildMessages]); //bot permissions
const client = new Client({ intents: myIntents });

client.login(CONFIG.BOT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const EMOJI_LIBRARY = data.emojiDefinitions;

  cron.schedule(
    "0 0 * * *",
    () => {
      const bannedCategories = ["flags", "symbols"];
      const randomEmojis = [];

      while (randomEmojis.length < 3) {
        //Choose an emoji
        let randomIndex = Math.floor(Math.random() * EMOJI_LIBRARY.length);
        let emoji = EMOJI_LIBRARY.at(randomIndex);

        //repick if emoji from previous or banned category
        while (bannedCategories.includes(emoji.category)) {
          randomIndex = Math.floor(Math.random() * EMOJI_LIBRARY.length);
          emoji = EMOJI_LIBRARY.at(randomIndex);
        }
        //add final emoji info to arrays
        bannedCategories.push(emoji.category);
        randomEmojis.push(emoji.primaryNameWithColons);
      }
      // send emoji message
      client.channels
        .fetch(CONFIG.CHANNEL_ID)
        .then((channel) => {
          channel.send("**DoodleBot says draw this, coward!**");
          channel.send(randomEmojis.join(" "));
        })
        .catch(() => console.error);
    },
    {
      timezone: "America/New_York",
    }
  );
});

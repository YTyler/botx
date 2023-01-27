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
  let lastMessage = null;
  cron.schedule(
    "0 0 * * *",
    () => {
      const bannedCategories = ["people", "flags", "symbols"];
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
          channel.send("**DoodleBot says draw this!**");
          channel
            .send(randomEmojis.join(" "))
            .then((message) => {
              //pin emoji message
              message
                .pin("Today's DoodleBot Prompt")
                .then(() => {
                  if (lastMessage) {
                    lastMessage.unpin();
                  }
                  lastMessage = message;
                })
                .catch(console.error);
            })
            .catch(console.error);
        })
        .catch(() => console.error);
    },
    {
      timezone: "America/Los_Angeles",
    }
  );
});

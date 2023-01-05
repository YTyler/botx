const { Client, Intents, IntentsBitField } = require("discord.js");
const CONFIG = require("./config.json");

const myIntents = new IntentsBitField([IntentsBitField.Flags.GuildMessages]); //bot permissions

const client = new Client({ intents: myIntents });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //categories of emojis from discord
  const categories = [
    "people",
    "nature",
    "food",
    "activity",
    "travel",
    "objects",
  ];
  const usedCategories = new Set();
  const randomEmojis = [];

  while (randomEmojis.length < 3) {
    let randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    //reselect a category if it has been chosen already
    while (usedCategories.has(randomCategory)) {
      randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
    }
    usedCategories.add(randomCategory);

    //Choose an emoji from the category
    const emojis = client.emojis.filter((emoji) =>
      emoji.name.includes(randomCategory)
    );
    const randomIndex = Math.floor(Math.random() * emojis.size);
    randomEmojis.push(emojis.array()[randomIndex]);
  }
  //send emoji message
  client.channels.get(CONFIG.CHANNEL_ID).send(randomEmojis.join(" "));
});

client.login(CONFIG.BOT_TOKEN);

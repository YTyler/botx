const { Client, Intents } = require("discord.js");

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_MESSAGES);

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
  client.channels.get("YOUR_CHANNEL_ID").send(randomEmojis.join(" "));
});

client.login("YOUR_BOT_TOKEN");

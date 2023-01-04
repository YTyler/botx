const { Client, Intents } = require("discord.js");

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: myIntents });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(() => {
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
      while (usedCategories.has(randomCategory)) {
        randomCategory =
          categories[Math.floor(Math.random() * categories.length)];
      }
      usedCategories.add(randomCategory);

      const emojis = client.emojis.filter((emoji) =>
        emoji.name.includes(randomCategory)
      );
      const randomIndex = Math.floor(Math.random() * emojis.size);
      randomEmojis.push(emojis.array()[randomIndex]);
    }

    client.channels.get("YOUR_CHANNEL_ID").send(randomEmojis.join(" "));
  }); // send message every 24 hours
});

client.login("YOUR_BOT_TOKEN");

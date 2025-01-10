const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const fs = require("node:fs");
// const { getClientData } = require("../src/utils/getClientData");

// const clientData = await getClientData();
const guildId = process.env.DISCORD_GUILD_ID;

const commands = [];
const commandFiles = fs.readdirSync(`${__dirname}/../src/Commands`).filter((file) => file.endsWith("auction.js"));

for (const file of commandFiles) {
  const command = require(`${__dirname}/../src/Commands/${file}`);
  commands.push(command.builder);
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();

// vim: tabstop=2 expandtab shiftwidth=2 sts=2

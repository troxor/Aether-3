const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdir } = require("fs");
const path = require("path");
const config = require("./config.json");

const directoryPath = path.join(__dirname, 'Commands');

readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log("Unable to scan directory: " + err)
    }

    const commands = [];

    files.forEach((file) => {
        if(file.endsWith(".js")){
            const cmd = require(`./Commands/${file}`)
            commands.push(
                cmd.builder
            );
        }
    });

    commands.map(command => command.toJSON());
    const rest = new REST({ version: '9' }).setToken(config.bot.token);

    rest.put(Routes.applicationGuildCommands(config.bot.id, config.bot.serverid), { body: commands })
        .then(console.log(`Deployed commands: [ ${commands.map(command => command.name).join(", ")} ]`))
        .catch(console.error);
});
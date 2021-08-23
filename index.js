'use strict'

if (Number(process.version.slice(1).split(".")[0]) < 16 ) throw new Error("Node 16.6.0 or higher is required. Update Node on your system.");

require('dotenv').config()

const fs = require('fs');

const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});
client.commands = new Collection();

const logger = require('./modules/logger');
client.logger = logger;

const TOKEN = process.env.TOKEN;

const { REST } =  require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '611657983956484221';
const guildId = '877337067158392863';

logger.log(`Initializing events...`, 'log');

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    logger.log(`Loaded event: '${event.name}' with once=${event.once}`);
}

logger.log(`Initializing commands...`, 'log');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
    logger.log(`Loaded command: ${command.data.name}`, 'log');
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
	try {
		logger.log('Started refreshing application (/) commands.', "log");

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		logger.log('Successfully reloaded application (/) commands.', 'log');
	} catch (error) {
		logger.log(error, "error");
	}
})();

client.on('interactionCreate', async interaction =>{
    if (interaction.isCommand()) await runCommand(interaction);
    if (interaction.isButton()) await runButton(interaction);
});

async function runCommand(interaction){
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        logger.log(error, "error");
        await interaction.reply({ content: 'There was an error while executing this command!'});
    }
}

client.login(process.env.TOKEN);
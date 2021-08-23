const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require('../modules/logger');
const boop = ["https://c.tenor.com/HZWeNnmcbBYAAAAC/cat-boop.gif", "https://c.tenor.com/G5u3bfszOPMAAAAC/anime-picking-nose.gif", "https://c.tenor.com/jNLEPcLWvO8AAAAC/anime-nose.gif", "https://c.tenor.com/fxIMcE41WpgAAAAd/anime-boop.gif", "https://c.tenor.com/4OHxyGd4qp0AAAAC/boop-nose.gif", ]
logger.log(`Loaded ${boop.length} boop gifs`, "debug");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boop')
        .setDescription("boop someone")
        .addUserOption( option => 
            option.setName('target')
            .setDescription('person you want to boop')
            .setRequired(true),
        ),
    async execute(interaction) {
        const author = interaction.user;
        const target = interaction.options.getUser('target');

        const file = boop[Math.floor(Math.random() * boop.length )]

        if (author == target) return interaction.reply({content: `${author} booped themself`, files: [file]});

        interaction.reply({content: `${author} booped ${target}`, files: [file]});
        
    },
}
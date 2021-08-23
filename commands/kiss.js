const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require('../modules/logger');
const fs = require('fs');

let kissGifs = ["https://c.tenor.com/0E_odieuKmwAAAAC/anime-zero.gif","https://c.tenor.com/Ct9yIxN5nE0AAAAM/kiss-anime.gif","https://c.tenor.com/16MBIsjDDYcAAAAC/love-cheek.gif", "https://c.tenor.com/_ttVgUDKJL0AAAAC/anime-couple.gif", "https://c.tenor.com/ErAPuiWY46QAAAAC/kiss-anime.gif"]
fs.readFile("./gifs/kiss.txt", 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    array = data.split(',');
    kissGifs = array;
});

logger.log(`Loaded ${kissGifs.length} kissing gifs`, "debug");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription("kiss someone")
        .addUserOption( option => 
            option.setName('target')
            .setDescription('person you want to kiss')
            .setRequired(true),
        ),
    async execute(interaction) {
        const author = interaction.user;
        const target = interaction.options.getUser('target');

        const file = kissGifs[Math.floor(Math.random() * kissGifs.length )]

        if (author == target) return interaction.reply({content: `${author} kissed themself`, files: [file]});

        interaction.reply({content: `${author} kissed ${target}`, files: [file]});
        
    },
}
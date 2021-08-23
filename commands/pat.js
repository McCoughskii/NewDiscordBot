const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require('../modules/logger');
const patGifs = ["https://c.tenor.com/4cE1PZZuPjkAAAAM/anime-cute.gif", "https://c.tenor.com/zBPha3hhm7QAAAAC/anime-girl.gif", "https://c.tenor.com/EYhRCNjiyIYAAAAC/momokuri-anime-pat.gif", "https://c.tenor.com/jEfC8cztigIAAAAC/anime-pat.gif", "https://c.tenor.com/8DaE6qzF0DwAAAAC/neet-anime.gif", "https://c.tenor.com/wLqFGYigJuIAAAAC/mai-sakurajima.gif", "https://c.tenor.com/rZRQ6gSf128AAAAC/anime-good-girl.gif", "https://c.tenor.com/dmYhPDHbbI4AAAAC/misha-misha-necron-anos-voldigoad-the-misfit-of-demon-king-academy-headpat-pat.gif" ]
logger.log(`Loaded ${patGifs.length} patting gifs`, "debug");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription("Pat someone")
        .addUserOption( option => 
            option.setName('target')
            .setDescription('person you want to pat')
            .setRequired(true),
        ),
    async execute(interaction) {
        const author = interaction.user;
        const target = interaction.options.getUser('target');

        const file = patGifs[Math.floor(Math.random() * patGifs.length )]

        if (author == target) return interaction.reply({content: `${author} gave pets to themselves`, files: [file]});

        interaction.reply({content: `${author} gave pats to ${target}`, files: [file]});
        
    },
}
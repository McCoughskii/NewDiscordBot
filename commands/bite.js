const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require('../modules/logger');
const biteGifs = ["https://c.tenor.com/MKjNSLL4dGoAAAAC/bite-cute.gif", "https://c.tenor.com/5FOgNEcoaYMAAAAM/neck-kisses.gif", "https://c.tenor.com/hwCVSWyji0QAAAAC/anime-bite.gif"]
logger.log(`Loaded ${biteGifs.length} biting gifs`, "debug");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bite')
        .setDescription("bite someone")
        .addUserOption( option => 
            option.setName('target')
            .setDescription('person you want to bite')
            .setRequired(true),
        ),
    async execute(interaction) {
        const author = interaction.user;
        const target = interaction.options.getUser('target');

        const file = biteGifs[Math.floor(Math.random() * biteGifs.length )]

        if (author == target) return interaction.reply({content: `${author} bit themself`, files: [file]});

        interaction.reply({content: `${author} bit ${target}`, files: [file]});
        
    },
}
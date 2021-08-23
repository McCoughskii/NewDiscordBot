const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require('../modules/logger');
const killGifs = ["https://c.tenor.com/IelwsI6Ev-kAAAAC/anime-attack.gif", "https://c.tenor.com/vqxuHP75AsAAAAAC/kou-hanako.gif", "https://c.tenor.com/DROo0V6Va3wAAAAC/shion-stab.gif","https://c.tenor.com/qbpa54U5_GsAAAAC/alba-ross-senyuu.gif"]
logger.log(`Loaded ${killGifs.length} kill gifs`, "debug");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription("kill someone")
        .addUserOption( option => 
            option.setName('target')
            .setDescription('person you want to kill')
            .setRequired(true),
        ),
    async execute(interaction) {
        const author = interaction.user;
        const target = interaction.options.getUser('target');

        const file = killGifs[Math.floor(Math.random() * killGifs.length )]

        if (author == target) return interaction.reply({content: `${author} killed themself`, files: [file]});

        interaction.reply({content: `${author} killed ${target}`, files: [file]});
        
    },
}
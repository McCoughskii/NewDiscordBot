const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require('../modules/logger');
const slapGifs = ["https://c.tenor.com/iDdGxlZZfGoAAAAM/powerful-head-slap.gif", "https://c.tenor.com/Ws6Dm1ZW_vMAAAAM/girl-slap.gif", "https://c.tenor.com/wOCOTBGZJyEAAAAM/chikku-neesan-girl-hit-wall.gif", "https://c.tenor.com/E3OW-MYYum0AAAAM/no-angry.gif", "https://c.tenor.com/UDo0WPttiRsAAAAM/bunny-girl-slap.gif", "https://c.tenor.com/PeJyQRCSHHkAAAAM/saki-saki-mukai-naoya.gif", "https://c.tenor.com/noSQI-GitQMAAAAM/mm-emu-emu.gif"]
logger.log(`Loaded ${slapGifs.length} slapping gifs`, "debug");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription("Slap someone")
        .addUserOption( option => 
            option.setName('target')
            .setDescription('person you want to slap')
            .setRequired(true),
        ),
    async execute(interaction) {
        const author = interaction.user;
        const target = interaction.options.getUser('target');

        const file = slapGifs[Math.floor(Math.random() * slapGifs.length )]

        if (author == target) return interaction.reply({content: `${author} slapped themself`, files: [file]});

        interaction.reply({content: `${author} slapped ${target}`, files: [file]});
        
    },
}
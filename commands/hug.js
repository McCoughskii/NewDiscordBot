const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require('../modules/logger');
const hugGifs = ["https://c.tenor.com/ItpTQW2UKPYAAAAM/cuddle-hug.gif", "https://c.tenor.com/1T1B8HcWalQAAAAC/anime-hug.gif", "https://c.tenor.com/ztEJgrjFe54AAAAC/hug-anime.gif", "https://c.tenor.com/OXCV_qL-V60AAAAC/mochi-peachcat-mochi.gif", "https://c.tenor.com/fklZNDaU9NMAAAAM/hideri-hideri-kanzaki.gif", "https://c.tenor.com/5iyMxIjFxhcAAAAC/hug-k-on.gif", "https://c.tenor.com/I6YEqtV4gv8AAAAC/anime-hug-hug.gif", "https://c.tenor.com/X5nBTYuoKpoAAAAC/anime-cheeks.gif" ]
logger.log(`Loaded ${hugGifs.length} hugging gifs`, "debug");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription("hug someone")
        .addUserOption( option => 
            option.setName('target')
            .setDescription('person you want to hug')
            .setRequired(true),
        ),
    async execute(interaction) {
        const author = interaction.user;
        const target = interaction.options.getUser('target');

        const file = hugGifs[Math.floor(Math.random() * hugGifs.length )]

        if (author == target) return interaction.reply({content: `${author} hugged themself`, files: [file]});

        interaction.reply({content: `${author} hugged ${target}`, files: [file]});
        
    },
}
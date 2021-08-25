const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("Anime slap", "slap");

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

        const file = await Tenor.random("slap");

        if (author == target) return interaction.reply({content: `${author} slapped themself`, files: [file]});

        interaction.reply({content: `${author} slapped ${target}`, files: [file]});
        
    },
}
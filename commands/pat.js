const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("Anime Pat", "pat");

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

        const file = await Tenor.random("pat");

        if (author == target) return interaction.reply({content: `${author} gave pets to themselves`, files: [file]});

        interaction.reply({content: `${author} gave pats to ${target}`, files: [file]});
        
    },
}
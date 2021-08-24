const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("Anime Kill", "kill");

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

        const file = await Tenor.random("kill");

        if (author == target) return interaction.reply({content: `${author} killed themself`, files: [file]});

        interaction.reply({content: `${author} killed ${target}`, files: [file]});
        
    },
}
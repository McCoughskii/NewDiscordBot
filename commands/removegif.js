const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("removegif")
		.setDescription("remove a gif for a specific command.")
		.addStringOption((option) =>
			option
				.setName("command")
				.setDescription("The command the gif will be removed from.")
				.setRequired(true)
		)
        .addStringOption((option) => 
            option
                .setName("gif_link")
                .setDescription("The link to the gif (must be Tenor link).")
                .setRequired(true)    
        )
		.setDefaultPermission(true),
	async execute(interaction) {
		// const author = interaction.user;
		const command = interaction.options.getString("command");
        const gif = interaction.options.getString("gif_link");

        let url;

        try { 
            url = new URL(gif);
        
        } catch (_) {
            return interaction.reply({content: "The link you provided is invalid"});
        }

        if (url.host !== "tenor.com") {
            return interaction.reply({content: "The link to the gif is invalid. (must be a Tenor link)"});
        }

		let response = Tenor.remove(command, gif).catch((err) => {
			return interaction.reply({content: err.message});
		});

		interaction.reply({content: await response || "An error occurred while trying to remove this gif"});
	},
};
const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("anime romantic bite", "bite");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("bite")
		.setDescription("bite someone")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("person you want to bite")
				.setRequired(true)
		),
	async execute(interaction) {
		const author = interaction.user;
		const target = interaction.options.getUser("target");

		const file = await Tenor.random("bite");

		if (author == target)
			return interaction.reply({
				content: `${author} bit themself`,
				files: [file],
			});

		interaction.reply({
			content: `${author} bit ${target}`,
			files: [file],
		});
	},
};

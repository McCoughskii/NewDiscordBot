const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("anime kissing", "kiss");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kiss")
		.setDescription("kiss someone")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("person you want to kiss")
				.setRequired(true)
		),
	async execute(interaction) {
		const author = interaction.user;
		const target = interaction.options.getUser("target");

		const file = await Tenor.random("kiss");

		if (author == target)
			return interaction.reply({
				content: `${author} kissed themself`,
				files: [file],
			});

		await interaction.reply({
			content: `${author} kissed ${target}`,
			files: [file],
		});
	},
};

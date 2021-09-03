const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("Anime nose poke", "boop");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("boop")
		.setDescription("boop someone")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("person you want to boop")
				.setRequired(true)
		),
	async execute(interaction) {
		const author = interaction.user;
		const target = interaction.options.getUser("target");

		const file = await Tenor.random("boop");

		if (author == target)
			return interaction.reply({
				content: `${author} booped themself`,
				files: [file],
			});

		await interaction.reply({
			content: `${author} booped ${target}`,
			files: [file],
		});
	},
};

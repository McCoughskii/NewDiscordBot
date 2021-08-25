const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("Anime Hugging", "hug");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hug")
		.setDescription("hug someone")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("person you want to hug")
				.setRequired(true)
		),
	async execute(interaction) {
		const author = interaction.user;
		const target = interaction.options.getUser("target");

		const file = await Tenor.random("hug");

		if (author == target)
			return interaction.reply({
				content: `${author} hugged themself`,
				files: [file],
			});

		interaction.reply({
			content: `${author} hugged ${target}`,
			files: [file],
		});
	},
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("anime bite", "bite");

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
		let content = "";

		const file = await Tenor.random("bite");

		if (author == target) {
			content = `${author} bit themself`;
		} else {
			content = `${author} bit ${target}`;
		}

		await interaction.reply({ content: `${content}` });
		await interaction.channel.send({ content: await file });
	},
};

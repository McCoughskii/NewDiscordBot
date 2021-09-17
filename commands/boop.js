const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("Anime nose boop", "boop");

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
		let content = "";

		const file = await Tenor.random("boop");

		if (author == target) {
			content = `${author} booped themself`;
		} else {
			content = `${author} booped ${target}`;
		}

		await interaction.reply({ content: `${content}` }).catch((err) => {console.log(err)});
		await interaction.channel.send({ content: await file});

	},
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("Anime Pat", "pat");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pat")
		.setDescription("Pat someone")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("person you want to pat")
				.setRequired(true)
		),
	async execute(interaction) {
		const author = interaction.user;
		const target = interaction.options.getUser("target");
		let content = "";

		const file = await Tenor.random("pat");

		if (author == target) {
			content = `${author} pat themself`;
		} else {
			content = `${author} pat ${target}`;
		}

		interaction.reply({ content: `${content}` }).catch((err) => {console.log(err)});
		interaction.channel.send({ content: await file });
	},
};

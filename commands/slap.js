const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("Anime slap", "slap");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("slap")
		.setDescription("Slap someone")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("person you want to slap")
				.setRequired(true)
		),
	async execute(interaction) {
		const author = interaction.user;
		const target = interaction.options.getUser("target");
		let content = "";

		const file = await Tenor.random("slap");

		if (author == target) {
			content = `${author} slapped themself`;
		} else {
			content = `${author} slapped ${target}`;
		}

		interaction.reply({ content: `${content}` }).catch((err) => {console.log(err)});
		interaction.channel.send({ content: await file });
	},
};

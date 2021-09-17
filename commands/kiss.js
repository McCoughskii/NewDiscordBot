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
			let content = "";
	
			const file = await Tenor.random("kiss");
	
			if (author == target) {
				content = `${author} kissed themself`;
			} else {
				content = `${author} kissed ${target}`;
			}
	
			await interaction.reply({ content: `${content}` }).catch((err) => {console.log(err);});
			await interaction.channel.send({ content: await file });
		},
};

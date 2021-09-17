const { SlashCommandBuilder } = require("@discordjs/builders");
const Tenor = require("../modules/search");

Tenor.startup("Anime murder","kill");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kill")
		.setDescription("kill someone")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("person you want to kill")
				.setRequired(true)
		),
		async execute(interaction) {
			const author = interaction.user;
			const target = interaction.options.getUser("target");
			let content = "";
	
			const file = await Tenor.random("kill");
	
			if (author == target) {
				content = `${author} killed themself`;
			} else {
				content = `${author} killed ${target}`;
			}
	
			await interaction.reply({ content: `${content}` }).catch((err) => {console.log(err);});
			await interaction.channel.send({ content: await file });
		},
};

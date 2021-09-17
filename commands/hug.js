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
			let content = "";
	
			const file = await Tenor.random("hug");
	
			if (author == target) {
				content = `${author} hugged themself`;
			} else {
				content = `${author} hugged ${target}`;
			}
	
			await interaction.reply({ content: `${content}` }).catch((err) => {console.log(err);});
			await interaction.channel.send({ content: await file });
		},
};

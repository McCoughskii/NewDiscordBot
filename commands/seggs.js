const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("seggs")
		.setDescription("seggs someone")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("person you want to seggs")
				.setRequired(true)
		),
		async execute(interaction) {
			const author = interaction.user;
			const target = interaction.options.getUser("target");

			file = "https://tenor.com/view/horny-jail-bonk-dog-hit-head-stop-being-horny-gif-17298755"

	
			await interaction.reply({ content: `go to horny jail ${author}` }).catch((err) => {console.log(err);});
			await interaction.channel.send({ content: await file });
		},
};

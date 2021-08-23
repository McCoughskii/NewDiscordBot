const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { roles, roleChannel, roleMessage } = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("deploy")
		.setDescription("creates role buttons"),
	async execute(interaction) {
		await interaction.reply("Creating role buttons...");
		const row = new MessageActionRow();
		for (const roleButton of roles) {
			const button = new MessageButton()
				.setCustomId(roleButton.uniqueID)
				.setLabel(roleButton.buttonName)
				.setStyle(roleButton.style);
			if (roleButton.Emoji != "") {
				button.setEmoji(roleButton.Emoji);
			}
			row.addComponents(button);
		}
		await interaction.channel.send({
			content: roleMessage,
			components: [row],
		});
		await interaction.editReply("Buttons deployed");
	},
};

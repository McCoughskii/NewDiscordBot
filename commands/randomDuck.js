const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require("request");
const logger = require("../modules/logger");

let url = "https://random-d.uk/api/v2/random?json";
let timeout = 10 * 1000;
let opts = {
	url: url,
	json: true,
	timeout: timeout,
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName("duck")
		.setDescription("get a random duck pic!"),
	async execute(interaction) {
		const duckFiles = [];

		request(opts, async function (err, _, body) {
			if (err) {
				logger.log(err, "error");
				interaction.reply("There was an error gathering the images");
			}
			duckFiles.push(body.url);
			await interaction.reply({ files: duckFiles });
		});
	},
};

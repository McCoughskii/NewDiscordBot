const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require("request");
const logger = require("../modules/logger");

let url = "https://random.dog/woof.json";
let timeout = 10 * 1000;
let opts = {
	url: url,
	json: true,
	timeout: timeout,
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dog")
		.setDescription("get a random dog pic!"),
	async execute(interaction) {
		const dogFiles = [];

		request(opts, async function (err, _, body) {
			if (err) {
				logger.log(err, "error");
				interaction.reply("There was an error gathering the images");
			}
			dogFiles.push(body.url);
			await interaction.reply({ files: dogFiles });
		});
	},
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require("request");
const logger = require("../modules/logger");

let url = "https://api.thecatapi.com/v1/images/search";
let timeout = 10 * 1000;
let opts = {
	url: url,
	json: true,
	timeout: timeout,
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName("cat")
		.setDescription("get a random cat pic!"),
	async execute(interaction) {
		const catFiles = [];

		request(opts, async function (err, _, body) {
            if (err) {
                logger.log(err, "error");
                interaction.reply("There was an error gathering the images");
            }
            catFiles.push(body[0].url);
            await interaction.reply({ files: catFiles });
        });
	},
};

const logger = require("../modules/logger");
const Tenor = require("tenorjs").client({
	Key: process.env.TENOR_KEY,
	Filter: "off",
	Locale: "en_US",
	MediaFilter: "basic",
	DateFormat: "D/MM/YYYY - H:mm:ss A",
});

const gifs = new Array();

exports.startup = async (query, command) => {
	try {
		gifs[command] = new Array();
		await Tenor.Search.Query(query, 50).then((Results) => {
			for (const post of Results) {
				gifs[command].push(post.media[0].gif.url);
			}
			logger.debug(`Loaded ${gifs[command].length} gifs for command: ${command}`);
		});
	} catch (error) {
		logger.error(error);
	}
};

exports.random = async (command) => {
	try {
		let index = Math.floor(Math.random() * 50);
		return await gifs[command][index];
	} catch (error) {
		logger.error(error);
		return null;
	}
};
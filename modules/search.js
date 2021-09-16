const logger = require("../modules/logger");
const fs = require("fs");
const Tenor = require("tenorjs").client({
	Key: process.env.TENOR_KEY,
	Filter: "off",
	Locale: "en_US",
	MediaFilter: "basic",
	DateFormat: "D/MM/YYYY - H:mm:ss A",
});

const gifs = new Array();

try {fs.mkdirSync('./data/');} catch (e){}

exports.startup = async (query, command) => {

	let data = fs.readFileSync(`./data/${command}.json`,{ encoding:"utf8", flag:'a+'});

	if (data === "") {
		findGifs(query, command);
	} else {
		gifs[command] = JSON.parse(data);
	}

	logger.debug(`Loaded ${gifs[command].length} gifs for the command ${command}`);
};

async function findGifs(query, command) {
	try {
		gifs[command] = [];
		await Tenor.Search.Query(query, 50).then((Results) => {
			for (const post of Results) {
				gifs[command].push(post.itemurl);
			}
		});
		saveGifs(command);
	} catch (error) {
		logger.error(error);
	}
}

exports.random = async (command) => {
	try {
		let index = Math.floor(Math.random() * 50);
		return await gifs[command][index];
	} catch (error) {
		logger.error(error);
		return null;
	}
};

exports.add = async (command, gif) => {

	if (gifs[command].indexOf(gif) !== -1) return `That gif has already been added to this command`;

	if (gifs[command] === undefined) {
		logger.warn(`No gif list for command ${command}, Creating one now`);
		gifs[command] = [];
	}

	logger.log(`Adding gif to command "${command}" ${gif}`);
	gifs[command].push(gif);

	saveGifs(command);

	return `Your gif, ${gif}, has been added to command, ${command}`;
};

exports.remove = async (command, gif) => {

	const index = gifs[command].indexOf(gif);
	if (index == -1) return `That gif does not exist for the command ${command}`;

	gifs[command].splice(index, 1);

	saveGifs(command);
	
	return `gif, ${gif}, has been removed from command, ${command}`;
};

exports.debug = async () => {
	console.log(gifs);
};

function saveGifs(command) {
	fs.writeFile(`./data/${command}.json`, JSON.stringify(gifs[command]), function (err) {
			if (err) throw err;
		}
	);
}

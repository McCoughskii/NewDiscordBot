const {ready} = require('../modules/logger');
module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		ready(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
	},
};

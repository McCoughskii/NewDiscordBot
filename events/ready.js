module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready");
    }
}
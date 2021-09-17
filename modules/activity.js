const fetch = require("node-fetch");

exports.activityInvite = async (ApplicationID, channel) => {
	return new Promise((res) => {
		let fetched = fetch(
			`https://discord.com/api/v8/channels/${channel.id}/invites`,
			{
				method: "POST",
				body: JSON.stringify({
					max_age: 86400,
					max_uses: 0,
					target_application_id: ApplicationID,
					target_type: 2,
					temporary: false,
					validate: null,
				}),
				headers: {
					Authorization: `Bot ${process.env.TOKEN}`,
					"Content-Type": "application/json",
				},
			}
		).then((response) => response.json());
		res(fetched);
	});
};

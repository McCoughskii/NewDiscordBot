const { SlashCommandBuilder } = require("@discordjs/builders");
const { activityInvite } = require("../modules/activity");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("activity")
		.setDescription("Start an activity")
        .addChannelOption(option => 
            option.setName("channel")
            .setDescription("Voice channel to start the activity in")
            .setRequired(true)    
        )
        .addStringOption(option => 
            option.setName("activity")
            .setDescription("Activity you want to play")
            .setRequired(true)
            .addChoices([
                ["Youtube Together", "youtube-togehter"],
                ["Poker Night", "poker-night"],
                ["Chess in the park", "chess-in-the-park"],
                ["Betrayal.io", "betrayal-io"],
                ["Fishington.io", "fishington-io"],
            ])
        ),
	async execute(interaction) {
        const VoiceChannel = interaction.options.getChannel("channel");
        const activity = interaction.options.getString("activity");
        let game;
        let invite;

        if(!VoiceChannel.isVoice()) return interaction.reply({content: `The channel must be a voice channel`});

        switch (activity) {
            case "youtube-togehter":
                game = "755600276941176913";
                break;
            case "poker-night":
                game = "755827207812677713";
                break;
            case "chess-in-the-park":
                game = "832012774040141894";
                break;
            case "betrayal-io":
                game = "773336526917861400";
                break;
            case "fishington-io":
                game = "814288819477020702";
                break;
            default:
                break;
        }

        invite = await activityInvite(game, VoiceChannel);

        interaction.reply({ content: `https://discord.com/invite/${await invite.code}`});
	},
};

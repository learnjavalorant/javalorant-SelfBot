const { WebEmbed } = require("discord.js-selfbot-v13");
const { command } = require("@dank074/discord-video-stream");
const { SetStreaming, GetStreaming } = require("../Utils/Status");
const config = require("../assets/config.json");
module.exports = {
    name: 'stop',
    async execute(msg, args, streamer) {
        if (msg.content.startsWith("!stop")) {
            if (!GetStreaming()) {
                const Embed = new WebEmbed()
                    .setColor('BLUE')
                    .setDescription('🔴 Không có đang stream!!! bớt đi!!');

                const message = await msg.channel.send({
                    content: `${WebEmbed.hiddenEmbed}${Embed}`,
                });

                setTimeout(() => {
                    message.delete();
                }, config.MessageTimeOut);

                return;
            }

            await streamer.stopStream();
            command?.kill("SIGINT");
            streamer.leaveVoice();
            SetStreaming(false);

            const Embed = new WebEmbed()
                .setColor('BLUE')
                .setDescription('🔴 Cưỡng Chế Dừng stream');

            const message = await msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${Embed}`,
            });

            setTimeout(() => {
                message.delete();
            }, config.MessageTimeOut);
        }
    },
};

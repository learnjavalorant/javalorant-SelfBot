const { WebEmbed, StageChannel } = require("discord.js-selfbot-v13");
const { PlayVideo, YTBRegex } = require("../Utils/Utils");
const ytdl = require('ytdl-core');
const config = require("../assets/config.json");
const { SetStreaming, GetStreaming } = require("../Utils/Status");

module.exports = {
    name: 'cam',
    async execute(msg, args, streamer) {
        if (msg.author.bot) return;

        if (GetStreaming()) {
            const embed = new WebEmbed()
                .setColor('RED')
                .setDescription('Giỡn mặt hả??? Đang có người dùng rồi! 💢');

            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
            return;
        }

        if (!args || !args.length || !args[0]) {
            const embed = new WebEmbed()
                .setColor('RED')
                .setDescription('Thiếu URL💢! Bớt giỡn mặt!!!');

            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
            return;
        }

        const channel = msg.member.voice.channel;

        if (!channel) {
            const embed = new WebEmbed()
                .setColor('RED')
                .setDescription('Không tham gia voice mà đòi chạy lệnh à!! Hả???');

            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
            return;
        }

        if (!YTBRegex(args[0])) {
            const embed = new WebEmbed()
                .setColor('RED')
                .setDescription('URL không hợp lệ 💢!');

            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
            return;
        }
        if (channel instanceof StageChannel) {
            await streamer.client.user.voice.setSuppressed(false);
        }
        
        let message;

        try {
            console.log(`Bot đã tham gia ${msg.guildId}/${channel.id}`);

            const vc = await streamer.joinVoice(msg.guildId, channel.id, {
                width: config.streamOpts.width,
                height: config.streamOpts.height,
                fps: config.streamOpts.fps,
                bitrateKbps: config.streamOpts.bitrateKbps,
                maxBitrateKbps: config.streamOpts.maxBitrateKbps,
                hardwareAcceleratedDecoding: config.streamOpts.hardware_acceleration,
                videoCodec: config.streamOpts.videoCodec === 'H264' ? 'H264' : 'VP8'
            });

            streamer.signalVideo(msg.guildId, channel.id, true);

            const videoStream = ytdl(args[0], {
                filter: 'audioandvideo',
                quality: 'highest',
                highWaterMark: 1 << 25
            });
            const embed = new WebEmbed()
                .setColor('BLUE')
                .setDescription('🟢 Đang phát trực tiếp');

                message = await msg.channel.send({
                    content: `${WebEmbed.hiddenEmbed}${embed}`,
                });
            SetStreaming(true);

            await PlayVideo(videoStream, vc, streamer, message);

            SetStreaming(false);

            await streamer.stopStream();

        } catch (error) {
            console.error(error);

            const embed = new WebEmbed()
                .setColor('RED')
                .setDescription('Đã gặp lỗi!! Vui lòng thử lại sau.');

            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
        }
    },
};

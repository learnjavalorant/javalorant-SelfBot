const { WebEmbed, MessageAttachment } = require("discord.js-selfbot-v13");
const { ScanPorts } = require("../Utils/Utils");

module.exports = {
    name: 'portscan',
    async execute(msg, args) {
        try {
            if (!args || !args.length || !args[0]) {
                const embed = new WebEmbed()
                    .setColor('RED')
                    .setTitle('Port Scanner BOT')
                    .setURL('https://discord.com/users/921245954923987005')
                    .setDescription('Giỡn mặt hả???💢 Dùng !portscan [IP/HOSTNAME]!')
                    .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255084359464124439/3ae51dcd831643b62cb47bc26538b3e7.gif');
                msg.channel.send({
                    content: `${WebEmbed.hiddenEmbed}${embed}`,
                });
                return;
            }

            const query = args[0];

            const { embedInProgress, attachment } = await ScanPorts(query);

            let messageInProgress = await msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embedInProgress}`,
            });

            setTimeout(async () => {
                const embedResult = new WebEmbed()
                    .setColor('BLUE')
                    .setTitle('Port Scanner BOT')
                    .setDescription(`🌍 Scan Port Thành công: ${query}\n`)
                    .setURL('https://discord.com/users/921245954923987005')
                    .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255091928740139060/79341d69c524acffe6c8882b34ea7294.gif')
                    .setAuthor({ name: '127.0.0.3107/javalorant', url: 'https://discord.com/users/921245954923987005' });

                await messageInProgress.edit({
                    content: `${WebEmbed.hiddenEmbed}${embedResult}`,
                    files: [attachment],
                });
            }, 3000);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin Port:', error);
            const embedError = new WebEmbed()
                .setColor('RED')
                .setTitle('Port Scanner BOT')
                .setURL('https://discord.com/users/921245954923987005')
                .setDescription('Có lỗi xảy ra khi lấy thông tin Port! Vui lòng thử lại sau.')
                .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255091928740139060/79341d69c524acffe6c8882b34ea7294.gif');

            await msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embedError}`,
            });
    }
    },
};

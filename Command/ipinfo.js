const { WebEmbed } = require("discord.js-selfbot-v13");
const { GetIPInfo } = require("../Utils/Utils");

module.exports = {
    name: 'ipinfo',
    async execute(msg, args) {
            if (!args || !args.length || !args[0]) {
                const embed = new WebEmbed()
                    .setColor('RED')
                    .setTitle('IP Info BOT')
                    .setURL('https://discord.com/users/921245954923987005')
                    .setDescription('Giỡn mặt hả???💢 Dùng !ipinfo [IP/HOSTNAME]!')
                    .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255084359464124439/3ae51dcd831643b62cb47bc26538b3e7.gif');
                msg.channel.send({
                    content: `${WebEmbed.hiddenEmbed}${embed}`,
                });
                return;
            }

            const query = args[0];

            try {
                const embed = await GetIPInfo(query);
                msg.channel.send({
                    content: `${WebEmbed.hiddenEmbed}${embed}`,
                });

            } catch (error) {
                console.error('Lỗi khi lấy IPInfo:', error);
                const embed = new WebEmbed()
                    .setColor('RED')
                    .setTitle('IP Info BOT')
                    .setURL('https://discord.com/users/921245954923987005')
                    .setDescription('Có lỗi xảy ra khi lấy IPInfo! Vui lòng thử lại sau.')
                    .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255091928740139060/79341d69c524acffe6c8882b34ea7294.gif');
                msg.channel.send({
                    content: `${WebEmbed.hiddenEmbed}${embed}`,
                });
            }
    },
};

const { WebEmbed } = require("discord.js-selfbot-v13");
const axios = require("axios").default;
const config = require("../assets/config.json");

module.exports = {
    name: 'mcping',
    async execute(msg, args) {
        if (!args || !args.length || !args[0]) {
            const embed = new WebEmbed()
                .setColor('RED')
                .setTitle('MCPING BOT')
                .setURL('https://discord.com/users/921245954923987005')
                .setDescription('Giỡn mặt hả???💢 Dùng !mcping [IP:PORT/DOMAIN]!')
                .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255084359464124439/3ae51dcd831643b62cb47bc26538b3e7.gif');
            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
            return;
        }

        const serverIp = args[0];
        try {
            const response = await axios.get(`https://api.mcsrvstat.us/2/${serverIp}`);
            const geo = response.data;

            if (!geo.online) {
                const embed = new WebEmbed()
                    .setColor('RED')
                    .setDescription(`❌ **ERROR**\n**🚫 Server Đã tắt ${serverIp}.**`);

                return await msg.channel.send({
                    content: `${WebEmbed.hiddenEmbed}${embed}`,
                });
            }

            const status = "Server Online";
            const embed = new WebEmbed()
                .setColor('GREEN')
                .setColor('RED')
                .setTitle('MCPING BOT')
                .setURL('https://discord.com/users/921245954923987005')
                .setDescription(`🤡 MCPING:
                    IP ${geo.ip}
                    PORT: ${geo.port}
                    STATUS: ${status}`)
                .setImage(`http://status.mclive.eu/${serverIp}/${serverIp}/banner.png`);

            await msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });

        } catch (error) {
            console.error('Lỗi khi lấy INFO:', error);
            const embed = new WebEmbed()
                .setColor('RED')
                .setTitle('MCPING BOT')
                .setURL('https://discord.com/users/921245954923987005')
                .setDescription('Có lỗi xảy ra MCPING! Vui lòng thử lại sau.')
                .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255091928740139060/79341d69c524acffe6c8882b34ea7294.gif');
            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
        }
    },
};

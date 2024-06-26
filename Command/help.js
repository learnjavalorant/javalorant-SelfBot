const { WebEmbed } = require("discord.js-selfbot-v13");
const config = require("../assets/config.json");

module.exports = {
    name: 'help',
    async execute(msg) {
        const maxTags = config["rule34.xxx"].MaxTags || 5;
        const embed = new WebEmbed()
            .setColor('GREEN')
            .setTitle('JAVALORANT BOT')
            .setDescription(`🤡 Danh sách lệnh:
            !play [YTB URL]: Steaming Youtube video.
            !cam [YTB URL]:  Steaming Youtube video với camera mode.
            !stop: Dừng Streaming.
            !r34 <tags>: Tìm kiếm và Hiển thị NSFW từ Rule34.xxx (MAX TAGS: ${maxTags}).
            !ipinfo [IP] Lấy thông tin của ip.
            !portscan [IP] Tìm port của ip.`)

            .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255088272317616269/2e680ec8c80d2051d2c74357f3cdb983.gif')
            .setRedirect('https://discord.com/users/921245954923987005')
            .setAuthor({ name: '127.0.0.3107/javalorant', url: 'https://discord.com/users/921245954923987005' });

        msg.channel.send({
            content: `${WebEmbed.hiddenEmbed}${embed}`,
        });
    },
};

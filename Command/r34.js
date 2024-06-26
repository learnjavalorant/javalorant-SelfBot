
const { WebEmbed } = require("discord.js-selfbot-v13");
const { Rule34API } = require("../Utils/Utils");
const config = require("../assets/config.json");

module.exports = {
    name: 'r34',
    async execute(msg, args) {
        if (!msg.channel.nsfw) {
            const embed = new WebEmbed()
                .setColor('RED')
                .setTitle('NFSW BOT')
                .setURL('https://discord.com/users/921245954923987005')
                .setDescription(`Giỡn mặt hả???💢 Vào room NFSW mau!!!`)
                .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255084359464124439/3ae51dcd831643b62cb47bc26538b3e7.gif');
            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
            return;
        }

        const maxTags = config["rule34.xxx"].MaxTags || 5;
        const limitPerTags = config["rule34.xxx"].LimitPerTags || 5;

        const tags = args.slice(0, maxTags);

        if (tags.length === 0) {
            const embed = new WebEmbed()
                .setColor('RED')
                .setTitle('NFSW BOT')
                .setURL('https://discord.com/users/921245954923987005')
                .setDescription(`Giỡn mặt hả??? Xem hentai không tag💢! (Tối đa ${maxTags} tags`)
                .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255084359464124439/3ae51dcd831643b62cb47bc26538b3e7.gif');
            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
            return;
        }

        try {
            for (const tag of tags) {
                const images = await Rule34API(tag, limitPerTags);

                if (!images || images.length === 0) {
                    const embed = new WebEmbed()
                        .setColor('RED')
                        .setTitle('NFSW BOT')
                        .setURL('https://discord.com/users/921245954923987005')
                        .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255085848697897022/99f717481aba9088ddee4d98893016da.gif')
                        .setDescription(`🧱 Không tìm thấy '${tag}!! hihi thông cảm'!`);
                    msg.channel.send({
                        content: `${WebEmbed.hiddenEmbed}${embed}`,
                    });
                    continue;
                }

                for (const image of images) {
                    const embed = new WebEmbed()
                        .setColor('BLUE')
                        .setTitle('NFSW BOT')
                        .setURL('https://discord.com/users/921245954923987005')
                        .setDescription(`NSFW Rule34 - Tag: ${tag}`)
                        .setImage(image);
                    await msg.channel.send({
                        content: `${WebEmbed.hiddenEmbed}${embed}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching NSFW images from Rule34:', error);
            const embed = new WebEmbed()
                .setColor('RED')
                .setTitle('NFSW BOT')
                .setURL('https://discord.com/users/921245954923987005')
                .setDescription('Đã xảy ra lỗi khi lấy hình ảnh từ Rule34.')
                .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255085220827369543/8fe6d60bce21b9ab0f27cbbb295a7e8a.gif');
            msg.channel.send({
                content: `${WebEmbed.hiddenEmbed}${embed}`,
            });
        }
    },
};
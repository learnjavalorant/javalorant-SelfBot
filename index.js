const { Client, CustomStatus, SpotifyRPC, WebEmbed } = require("discord.js-selfbot-v13");
const { Streamer } = require("@dank074/discord-video-stream");
const fs = require('fs');
const path = require('path');
const config = require("./assets/config.json");

const client = new Client();
const streamer = new Streamer(client);

client.commands = new Map();

let CommandCount = 0;

function loadCommands(client, directory) {
    const commandFiles = fs.readdirSync(directory).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(__dirname, directory, file));
        if (command.name && typeof command.execute === 'function') {
            client.commands.set(command.name, command);
            CommandCount++;
        } else {
            console.warn(`Không load thành công command: ${file}`);
        }
    }
}

const commandsDir = './Command';
loadCommands(client, commandsDir);

client.on("ready", () => {
    console.log(`--- ${client.user.tag} is ready ---`);
    console.log(`Load ${CommandCount} command thành công.`);
    const custom = new CustomStatus(client).setEmoji(':anger:').setState('Đọc truyện, cày anime, làm việc 24/7');

    const spotify = new SpotifyRPC(client)
        .setAssetsLargeImage('spotify:ab67616d000048518b3db25a5d03beda6bb621c4') // Image ID
        .setAssetsSmallImage('spotify:ab67616d000048518b3db25a5d03beda6bb621c4') // Image ID
        .setAssetsLargeText("She is Feelin' Good") // Album Name
        .setState('Yuinishio') // Artists
        .setDetails('Drink, Pray, Love!') // Song name
        .setStartTimestamp(Date.now())
        .setEndTimestamp(Date.now() + 1_000 * (3 * 60 + 40)) // Song length = 3m40s
        .setSongId('7c15sMe2TvDDEvdrLMjIiP') // Song ID
        .setAlbumId('77jwLuWDCIVkws8IyXSvnT') // Album ID
        .setArtistIds('7zbYqEsExgXmsCHaOhXlnG'); // Artist IDs

    client.user.setPresence({ activities: [custom, spotify] });
});

const prefix = '!';

streamer.client.on("messageCreate", async (msg) => {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    let message;
    const userId = msg.author.id;
    if (!config.UsersWhiteList.includes(userId)) {
        console.log(`User ${msg.author.tag} (${userId}) đã cố cùng bot.`);
        const embed = new WebEmbed()
            .setColor('RED')
            .setTitle('JAVALORANT BOT')
            .setURL('https://discord.com/users/921245954923987005')
            .setDescription('Bạn không có quyền dùng bot!!')
            .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255085220827369543/8fe6d60bce21b9ab0f27cbbb295a7e8a.gif');
        message = await msg.reply({
            content: `${WebEmbed.hiddenEmbed}${embed}`,
        });
        setTimeout(() => {
            message.delete();
        }, config.MessageTimeOut);
        return;
    }

    try {
        const command = client.commands.get(commandName);
        await command.execute(msg, args, streamer);
    } catch (error) {
        console.error(error);
        const embed = new WebEmbed()
            .setColor('RED')
            .setTitle('JAVALORANT BOT')
            .setURL('https://discord.com/users/921245954923987005')
            .setDescription('Lỗi!! Vui lòng chờ fix!!!.')
            .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255085220827369543/8fe6d60bce21b9ab0f27cbbb295a7e8a.gif');
        message = await msg.reply({
            content: `${WebEmbed.hiddenEmbed}${embed}`,
        });
        setTimeout(() => {
            message.delete();
        }, config.MessageTimeOut);
    }
});

client.login(config.token);

module.exports = {
    client,
    streamer
};

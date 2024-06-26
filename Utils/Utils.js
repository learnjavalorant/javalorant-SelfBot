// utils.js
const axios = require('axios').default;
const { DOMParser } = require('xmldom');
const { WebEmbed, MessageAttachment  } = require("discord.js-selfbot-v13");
const { streamLivestreamVideo, getInputMetadata, inputHasAudio } = require("@dank074/discord-video-stream");
const config = require("../assets/config.json");
const Shodan = require('shodan-client');

async function ScanPorts(query) {
    try {
        const openPorts = await Shodan.ports(query); // Assuming ports() function returns an array of open ports

        const portsText = `Open ports for IP/Hostname: ${query}\nOpen Ports: ${openPorts.join(', ')}\nJavalorant/127.0.0.3107 - Shodan`;
        const buffer = Buffer.from(portsText, 'utf-8');

        const attachment = new MessageAttachment(buffer, 'ports.txt');

        const embedInProgress = new WebEmbed()
            .setColor('YELLOW')
            .setTitle('Port Scanner BOT')
            .setDescription(`🔍 Đang ScanPort cho IP/Hostname: ${query}...`)
            .setURL('https://discord.com/users/921245954923987005')
            .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255106097514156052/574bff8ef8356d7edb3b912f48e65774.gif')
            .setAuthor({ name: '127.0.0.3107/javalorant', url: 'https://discord.com/users/921245954923987005' });

        return { embedInProgress, attachment };
    } catch (error) {
        console.error('Error scanning ports:', error);
        throw error;
    }
}

function YTBRegex(url) {
    const YTBRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/).+$/;
    return YTBRegex.test(url);
}

async function PlayVideo(video, UDPConnection, streamer, msg) {
    let includeAudio = true;

    try {
        if (typeof video === 'string') {
            const metadata = await getInputMetadata(video);
            includeAudio = inputHasAudio(metadata);
        }
    } catch (e) {
        console.log(e);
        throw new Error('Error getting video metadata');
    }

    console.log("Bắt đầu Stream 🟢");

    UDPConnection.mediaConnection.setSpeaking(true);
    UDPConnection.mediaConnection.setVideoStatus(true);
    try {
        let res;

        if (typeof video === 'string') {
            res = await streamLivestreamVideo(video, UDPConnection, includeAudio);
        } else {
            res = await streamLivestreamVideo(video, UDPConnection, includeAudio);
        }
        isStreaming = false;
        streamer.leaveVoice();
        console.log("Stream đã dừng 🔴");

        const Embed = new WebEmbed()
            .setColor('BLUE')
            .setDescription('🔴 Dừng stream');

        await msg.edit({
            content: `${WebEmbed.hiddenEmbed}${Embed}`,
        });

    } catch (e) {
        console.log(e);
        throw new Error('Error streaming video');
    } finally {
        UDPConnection.mediaConnection.setSpeaking(false);
        UDPConnection.mediaConnection.setVideoStatus(false);
    }
}


async function Rule34API(tag, limit) {
    try {
        const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(tag)}`;
        const response = await axios.get(url);
        const xmlData = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const posts = xmlDoc.getElementsByTagName('post');

        let images = [];
        for (let i = 0; i < posts.length; i++) {
            images.push(posts[i].getAttribute('file_url'));
        }

        images = ShuffleArray(images);

        images = Array.from(new Set(images)).slice(0, limit);

        return images;
    } catch (error) {
        console.error('Error fetching data from Rule34:', error);
        throw error;
    }
}

async function GetIPInfo(query) {
    const APIKey = config.APIKey.IpInfoKey;
    try {
        const response = await axios.get(`https://ipinfo.io/${query}?token=${APIKey}`);

        const data = response.data;

        const embed = new WebEmbed()
            .setColor('BLUE')
            .setTitle('IP Info BOT')
            .setDescription(`🌍 Thông tin IP/Hostname:
                IP: ${data.ip}
                City: ${data.city}
                Region: ${data.region}
                Country: ${data.country}
                Location: ${data.loc}
                Organization: ${data.org}
                Postal: ${data.postal}
                Timezone: ${data.timezone}`)
            .setURL('https://discord.com/users/921245954923987005')
            .setImage('https://cdn.discordapp.com/attachments/1165893174649180230/1255091928740139060/79341d69c524acffe6c8882b34ea7294.gif')
            .setRedirect('https://discord.com/users/921245954923987005')
            .setAuthor({ name: '127.0.0.3107/javalorant', url: 'https://discord.com/users/921245954923987005' });

        return embed;
    } catch (error) {
        console.error('Error fetching IP information:', error);
        throw error;
    }
}

function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


module.exports = {
    ScanPorts,
    YTBRegex,
    PlayVideo,
    Rule34API,
    GetIPInfo,
    ShuffleArray
};

const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express'); 

const app = express();
app.get('/', (req, res) => res.send('บอท Meow24/7 ออนไลน์แล้ว!'));
app.listen(process.env.PORT || 8080); // Koyeb มักใช้ พอร์ต 8080

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.on('ready', () => {
    console.log(`${client.user.tag} พร้อมทำงานแล้ว!`);

    const channelId = '1529890741390807191'; 
    const guildId = '1509521288341885059';

    const channel = client.channels.cache.get(channelId);
    if (!channel) return console.error("หาห้องเสียงไม่เจอ กรุณาเช็ก ID อีกครั้ง");

    try {
        joinVoiceChannel({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: true,
        });
        console.log('บอทเข้าห้องเสียงสำเร็จแล้ว!');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเข้าห้องเสียง:', error);
    }
});

client.login(process.env.TOKEN);

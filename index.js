const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express'); 

const app = express();
// เว็บไซต์สำหรับให้ UptimeRobot ยิง Ping เข้ามาเลี้ยงไม่ให้บอทดับ
app.get('/', (req, res) => res.send('บอท Meow24/7 ออนไลน์แล้ว!'));
app.listen(process.env.PORT || 3000);

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
            selfDeaf: true, // ปิดเสียงบอทอัตโนมัติเพื่อลดการใช้ประมวลผล
        });
        console.log('บอทเข้าห้องเสียงสำเร็จแล้ว!');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเข้าห้องเสียง:', error);
    }
});

// ดึงรหัส Token จากระบบความลับของ Glitch
client.login(process.env.TOKEN);
            

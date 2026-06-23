const logger = require('../utils/logger');
const { EmbedBuilder } = require('discord.js');

async function sendNotification(client, guildId, channelId, streamData) {
    logger.info(`Sending notification for ${streamData.streamerName} to guild ${guildId}`);
    try {
        const guild = client.guilds.cache.get(guildId);
        if (!guild) return;
        
        const channel = guild.channels.cache.get(channelId);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle(`${streamData.streamerName} is now live!`)
            .setURL(streamData.url)
            .setDescription(streamData.title)
            .setColor(streamData.platform === 'twitch' ? 0x9146FF : 0xFF0000)
            .setTimestamp();

        await channel.send({ content: streamData.pingText || '', embeds: [embed] });
    } catch (err) {
        logger.error('Error sending notification', err);
    }
}

module.exports = { sendNotification };

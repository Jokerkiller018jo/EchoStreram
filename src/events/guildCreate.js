const { Events } = require('discord.js');
const prisma = require('../../database/prisma');
const logger = require('../utils/logger');

module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        logger.info(`Joined new guild: ${guild.name} (${guild.id})`);
        try {
            await prisma.guild.upsert({
                where: { guildId: guild.id },
                update: {},
                create: { guildId: guild.id },
            });
        } catch (error) {
            logger.error(`Error saving guild ${guild.id} to db`, error);
        }
    },
};

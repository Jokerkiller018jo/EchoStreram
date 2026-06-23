const { Events } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        logger.info(`New member joined: ${member.user.tag} in ${member.guild.name}`);
        // Can add welcome message logic here, e.g., finding a system channel.
    },
};

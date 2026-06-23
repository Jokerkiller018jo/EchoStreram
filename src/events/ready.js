const { Events } = require('discord.js');
const logger = require('../utils/logger');
const scheduler = require('../services/scheduler');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        logger.info(`Ready! Logged in as ${client.user.tag}`);
        scheduler.init();
    },
};

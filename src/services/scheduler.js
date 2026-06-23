const cron = require('node-cron');
const logger = require('../utils/logger');

function init() {
    // Check every 5 minutes
    cron.schedule('*/5 * * * *', () => {
        logger.info('Running scheduled checks for Twitch and YouTube streams...');
        // Implement checkers here
    });
}

module.exports = { init };

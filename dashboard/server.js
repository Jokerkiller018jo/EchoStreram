const express = require('express');
const path = require('path');
const logger = require('../src/utils/logger');

const app = express();
const PORT = process.env.DASHBOARD_PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Echostream Dashboard API</h1><p>The bot dashboard is running.</p>');
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'online', uptime: process.uptime() });
});

app.listen(PORT, () => {
    logger.info(`Dashboard API running on port ${PORT}`);
});

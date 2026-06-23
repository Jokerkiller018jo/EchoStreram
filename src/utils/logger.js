const logger = {
    info: (msg) => console.log(`[INFO] ${new Date().toISOString()}: ${msg}`),
    warn: (msg, error = "") => console.warn(`[WARN] ${new Date().toISOString()}: ${msg}`, error),
    error: (msg, error = "") => console.error(`[ERROR] ${new Date().toISOString()}: ${msg}`, error)
};

module.exports = logger;

const log = require("debug")("ia:database");

const sequelize = require("./sequelize");
require("./models");

async function initialize() {
    await sequelize.sync({ force: true });
}

async function close() {
    await sequelize.close();
}

module.exports = {
    initialize,
    close,
};

const log = require("debug")("ia:sequelize");
const { Sequelize } = require("sequelize");
console.log(process.env.DATABASE_URI);
module.exports = new Sequelize(process.env.DATABASE_URI);
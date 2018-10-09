const db = {};
const Sequelize = require('sequelize');
const logger = require('../utils/logger');

// Create connection
const connection = new Sequelize(process.env.DATABASE_FORUM_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'mysql',
  operatorsAliases: false,

  //  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test database connection
connection
  .authenticate()
  .then(() => {
    logger('server', `Connection to forum database has been established successfully (IP: '${process.env.DATABASE_HOST}').`, 'info');
  })
  .catch(err => {
    logger('server', `Unable to connect to the forum database! (Error: ${err})`, 'error');
  });

// Assign connection to 'db'
db.connection = connection;
db.Sequelize = Sequelize;

// Export module
module.exports = db;

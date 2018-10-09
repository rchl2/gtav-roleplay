const db = {};
const glob = require('glob');
const path = require('path');
const Sequelize = require('sequelize');
const logger = require('../utils/logger');

// Create connection
const connection = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'mysql',
  operatorsAliases: false,

  // logging: false,

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
    logger('server', `Connection to game database has been established successfully (IP: '${process.env.DATABASE_HOST}').`, 'info');
  })
  .catch(err => {
    logger('server', `Unable to connect to the game database! (Error: ${err})`, 'error');
  });

// Load models
glob.sync('./packages/LSOnline/models/*.js').forEach((file) => {
  file = path.parse(file);
  if (file.name !== 'Account') {
    db[file.name.toLowerCase()] = connection['import'](path.join(__dirname, '../../models', file.name));
  }
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Assign connection to 'db'
db.connection = connection;
db.Sequelize = Sequelize;

// Export module
module.exports = db;

const Sequelize = require('sequelize');
const { database, host, dialect, username, password } = require('./config').database;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = sequelize.import('./models/User');
const Tasks = sequelize.import('./models/Tasks');
Tasks.belongsTo(User);

module.exports = { sequelize, User, Tasks };
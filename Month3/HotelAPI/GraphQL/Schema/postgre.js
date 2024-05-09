const { Sequelize } = require('sequelize');

const dbConnection = new Sequelize('hotel_booking', 'db_user', 'db_password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = dbConnection;

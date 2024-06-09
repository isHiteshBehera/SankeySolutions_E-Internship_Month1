const sequelize = require('sequelize');
const database = require('../configuration/database');


const HotelModel = database.define('Reservation', {
    destination: {
        type: sequelize.STRING,
        allowNull: false
    },
    executive: {
        type: sequelize.STRING
    },
    accommodation: {
        type: sequelize.STRING
    },
    arrival: {
        type: sequelize.DATE
    },
    departure: {
        type: sequelize.DATE
    },
});

module.exports = HotelModel;
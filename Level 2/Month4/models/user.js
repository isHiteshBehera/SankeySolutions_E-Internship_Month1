const { Sequelize, DataTypes } = require('sequelize');
const database = require('../configuration/database');

const UserProfile = database.define('UserProfile', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    middleName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cardHolderName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    creditCardNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cardExpiryDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    cardCVV: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    residenceCountry: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = UserProfile;
const { DataTypes } = require('sequelize');
const db = require('../GraphQL/Schema/postgre');
const Hotel = require('../Models/hotel');
const Room = require('../Models/room');
const User = require('../Models/user');

const Booking = db.define('Booking',{
    bookingId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncreament:true
    },
    userId:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    roomId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    checkInDate: {
        type:DataTypes.DATE,
        allowNull:false
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull:false
    },
    totalPrice:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
});

User.hasMany(Booking, {foreignKey:'userId'});
Booking.belongsTo(User, { foreignKey: 'userId'});
Room.hasMany(Booking, {foreignKey:'roomId'});
Booking.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = Booking;

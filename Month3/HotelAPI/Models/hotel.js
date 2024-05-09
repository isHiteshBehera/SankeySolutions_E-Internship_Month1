const { DataTypes } = require('sequelize');
const db = require('../GraphQL/Schema/postgre');

const Hotel = db.define('Hotel',{
    hotelId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncreament:true
    },
    hotelName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    hotelLocation:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    hotelDescription: {
        type:DataTypes.STRING,
        allowNull:false,
    },

    hotelRating: {
        type: DataTypes.FLOAT,
        allowNull:false,
    }
});
module.exports = Hotel;

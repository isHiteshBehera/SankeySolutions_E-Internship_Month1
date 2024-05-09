const { DataTypes } = require('sequelize');
const db = require('../GraphQL/Schema/postgre');
const Accommodation = require('./accommodation');

const Room = db.define('Room',{
    roomId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncreament:true
    },
    accommodationId:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    roomNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    roomType: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    roomPrice: {
        type: DataTypes.FLOAT,
        allowNull:false,
    }
   
});
Accommodation.hasMany(Room, {foreignKey:'accommodationId'});
Room.belongsTo(Accommodation, { foreignKey: 'accommodationId' });
module.exports = Room;

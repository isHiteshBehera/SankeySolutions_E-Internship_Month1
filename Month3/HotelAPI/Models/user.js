const { DataTypes } = require('sequelize');
const db = require('../GraphQL/Schema/postgre');

const UserModel = db.define('User',{
    userId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncreament:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,
        get(){
            return'*********'
        }
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },

    role: {
        type: DataTypes.STRING,
        allowNull:false,
    }
});

module.exports = UserModel;

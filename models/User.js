const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require(`bcrypt`);

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Add other fields as necessary
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    hooks:{
      beforeCreate: userObj=>{
        userObj.password = bcrypt.hashSync(userObj.password,10);
        return userObj;
      }
    }
  }
);

module.exports = User;

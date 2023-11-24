const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Conversation extends Model {}

Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    is_group: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    conversation_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'conversation',
  }
);

module.exports = Conversation;
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.Chat_Room, {
        foreignKey: "chat_room_id",
      });
    }
  }
  Chat.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // required
        validate: {
          notNull: { message: "User ID is required." }, // required
          notEmpty: { message: "User ID is required." }, // required
        },
      },
      chat_room_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // required
        validate: {
          notNull: { message: "Chat room ID is required." }, // required
          notEmpty: { message: "Chat room ID is required." }, // required
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false, // required
        validate: {
          notNull: { message: "Message is required." }, // required
          notEmpty: { message: "Message is required." }, // required
        },
      },
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};

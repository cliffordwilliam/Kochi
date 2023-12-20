"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Chat extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.User_Chat_Room, {
        foreignKey: "user_chat_room_id",
      });
    }
  }
  User_Chat.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // required
        validate: {
          notNull: { message: "User ID is required." }, // required
          notEmpty: { message: "User ID is required." }, // required
        },
      },
      user_chat_room_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // required
        validate: {
          notNull: { message: "User chat room ID is required." }, // required
          notEmpty: { message: "User chat room ID is required." }, // required
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
      modelName: "User_Chat",
    }
  );
  return User_Chat;
};

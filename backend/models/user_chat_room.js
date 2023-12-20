"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Chat_Room extends Model {
    static associate(models) {
      this.hasMany(models.User_Chat, {
        foreignKey: "user_chat_room_id",
      });
    }
  }
  User_Chat_Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // required
        unique: { msg: "Name is already in use." }, // unique
        validate: {
          notNull: { message: "Name is required." }, // required
          notEmpty: { message: "Name is required." }, // required
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // required
        validate: {
          notNull: { message: "User ID is required." }, // required
          notEmpty: { message: "User ID is required." }, // required
        },
      },
    },
    {
      sequelize,
      modelName: "User_Chat_Room",
    }
  );
  return User_Chat_Room;
};

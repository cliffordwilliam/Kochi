"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat_Room extends Model {
    static associate(models) {
      this.hasMany(models.Chat, {
        foreignKey: "chat_room_id",
      });
    }
  }
  Chat_Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // required
        unique: { msg: "Name is already in use." }, // unique
        // validate: {
        //   notNull: { message: "Name is required." }, // required
        //   notEmpty: { message: "Name is required." }, // required
        // },
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Chat_Room",
    }
  );
  return Chat_Room;
};

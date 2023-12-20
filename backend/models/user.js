"use strict";
const { Model } = require("sequelize");
const Helper = require("../helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Chat_Room, {
        foreignKey: "user_id",
      });
      this.hasMany(models.User_Chat_Room, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false, // required
        unique: { msg: "Username is already in use." }, // unique
        validate: {
          notNull: { message: "Username is required." }, // required
          notEmpty: { message: "Username is required." }, // required
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // required
        validate: {
          notNull: { message: "Password is required." }, // required
          notEmpty: { message: "Password is required." }, // required
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  // before create hash
  User.beforeCreate(async (user) => {
    user.password = await Helper.hashPassword(user.password);
  });
  return User;
};

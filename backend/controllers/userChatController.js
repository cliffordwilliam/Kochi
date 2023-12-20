const { User_Chat } = require("../models");
const Helper = require("../helper");
const Utils = require("../utils");

module.exports = class UserChatController {
  static async post(req, res, next) {
    try {
      // get id loggedInUser
      const user_id = req.loggedInUser.id;
      // get body
      const { message, user_chat_room_id } = req.body;
      // POST
      const obj = await User_Chat.create({
        message,
        user_id,
        user_chat_room_id,
      });
      // res status
      res.status(201).json({
        status: 201,
        msg: `User_Chat successfully added.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req, res, next) {
    try {
      // get query
      // GET
      const obj = await User_Chat.findAll();
      // res status
      res.status(200).json({
        status: 200,
        msg: `Chats successfully retrieved.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      // get params
      const { id } = req.params; // userChat/id
      // del
      await User_Chat.destroy({ where: { id } });
      // res status
      res.status(200).json({
        status: 200,
        msg: `User_Chat successfully deleted.`,
      });
    } catch (error) {
      next(error);
    }
  }
};

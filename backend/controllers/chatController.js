const { Chat } = require("../models");
const Helper = require("../helper");
const Utils = require("../utils");

module.exports = class ChatController {
  static async post(req, res, next) {
    try {
      // get id loggedInUser
      const user_id = req.loggedInUser.id;
      // get body
      const { message, chat_room_id } = req.body;
      // POST
      const obj = await Chat.create({
        message,
        user_id,
        chat_room_id,
      });
      // res status
      res.status(201).json({
        status: 201,
        msg: `Chat successfully added.`,
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
      const obj = await Chat.findAll();
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
      const { id } = req.params; // chat/id
      // del
      await Chat.destroy({ where: { id } });
      // res status
      res.status(200).json({
        status: 200,
        msg: `Chat successfully deleted.`,
      });
    } catch (error) {
      next(error);
    }
  }
};

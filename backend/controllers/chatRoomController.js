const { Chat_Room } = require("../models");
const Helper = require("../helper");
const Utils = require("../utils");

module.exports = class ChatRoomController {
  static async get(req, res, next) {
    try {
      // GET
      const obj = await Chat_Room.findAll();
      // res status
      res.status(200).json({
        status: 200,
        msg: `User chat rooms successfully retrieved.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getId(req, res, next) {
    try {
      // get params
      const { id } = req.params; // userChatRoom/id
      // not int? throw
      if (!Helper.isInt(id)) {
        Helper.error("User chat room ID should be integer.");
      }
      // no Chat_Room? throw
      const obj = await Chat_Room.findByPk(id);
      if (!obj) {
        Helper.error("User chat room not found.", 404);
      }
      // res status
      res.status(200).json({
        status: 200,
        msg: `User chat room successfully retrieved.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
};

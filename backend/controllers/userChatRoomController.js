const { User_Chat_Room } = require("../models");
const Helper = require("../helper");
const Utils = require("../utils");

module.exports = class UserChatRoomController {
  static async post(req, res, next) {
    try {
      // get loggedInUser
      const user_id = req.loggedInUser.id;
      // get body
      const { name } = req.body;
      // POST
      const obj = await User_Chat_Room.create({
        name,
        user_id,
      });
      // res
      res.status(201).json({
        status: 201,
        msg: `User chat room successfully registered.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req, res, next) {
    try {
      // GET
      const obj = await User_Chat_Room.findAll();
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
      // no User_Chat_Room? throw
      const obj = await User_Chat_Room.findByPk(id);
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
  static async put(req, res, next) {
    try {
      // get params
      const { id } = req.params; // userChatRoom/id
      // get body
      let { name } = req.body;
      // UPDATE
      const [rowsUpdated, [obj]] = await User_Chat_Room.update(
        { name },
        { where: { id }, returning: true }
      );
      // res status
      res.status(200).json({
        status: 200,
        msg: `User chat room successfully updated.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      // get params
      const { id } = req.params; // userChatRoom/id
      // del
      await User_Chat_Room.destroy({ where: { id } });
      // res status
      res.status(200).json({
        status: 200,
        msg: `User chat room successfully deleted.`,
      });
    } catch (error) {
      next(error);
    }
  }
};

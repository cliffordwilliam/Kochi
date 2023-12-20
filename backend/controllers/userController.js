const { User } = require("../models");
const Helper = require("../helper");
const Utils = require("../utils");

module.exports = class UserController {
  static async post(req, res, next) {
    try {
      // get body
      const { username, password } = req.body;
      // POST
      const obj = await User.create({
        username,
        password,
      });
      // res
      res.status(201).json({
        status: 201,
        msg: `User successfully registered.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      // get body
      const { username, password } = req.body;
      // empty? throw
      if (!username) {
        Helper.error("Username is required.", 400);
      }
      if (!password) {
        Helper.error("Password is required.", 400);
      }
      // no user? throw
      const obj = await User.findOne({ where: { username } });
      if (!obj) {
        Helper.error(
          "User not found. Please check your email or register.",
          401
        );
      }
      // wrong password? throw
      if (!(await Helper.comparePassword(password, obj.password))) {
        Helper.error("Wrong password. Please try again.", 401);
      }
      // create payload
      const payload = { id: obj.id };
      // payload -> token
      const token = await Helper.payloadToToken(payload);
      // res status
      res.status(200).json({
        status: 200,
        msg: `User successfully logged in.`,
        token,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req, res, next) {
    try {
      // get query
      let { search, limit, page, sort, sortBy, searchBy } = req.query; // user/?username=
      // pagination
      const option = Helper.pagination(
        search,
        limit,
        page,
        sort,
        sortBy,
        searchBy,
        ["id", "username", "password", "createdAt", "updatedAt"] // cols
      );
      // GET
      const obj = await User.findAll({
        limit: option.limit,
        offset: option.offset,
        order: option.order,
        where: option.query,
      });
      // res status
      res.status(200).json({
        status: 200,
        msg: `Users successfully retrieved.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getId(req, res, next) {
    try {
      // get params
      const { id } = req.params; // user/id
      // not int? throw
      if (!Helper.isInt(id)) {
        Helper.error("User ID should be integer.");
      }
      // no user? throw
      const obj = await User.findByPk(id);
      if (!obj) {
        Helper.error("User not found.", 404);
      }
      // res status
      res.status(200).json({
        status: 200,
        msg: `User successfully retrieved.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async put(req, res, next) {
    try {
      // get id loggedInUser
      const { id } = req.loggedInUser;
      // unpack the body
      let { username, password } = req.body;
      // hash first
      password = await Helper.hashPassword(password);
      // UPDATE
      const [rowsUpdated, [obj]] = await User.update(
        { username, password },
        { where: { id }, returning: true }
      );
      // res status
      res.status(200).json({
        status: 200,
        msg: `User successfully updated.`,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async patch(req, res, next) {
    try {
      // get id loggedInUser
      const { id } = req.loggedInUser;
      // no file? throw (need middleware to have req.file)
      if (!req.file) {
        Helper.error("Profile picture image file is required.", 400);
      }
      // file -> base64
      const imgBase64 = req.file.buffer.toString("base64");
      // upload -> result
      const result = await Utils.imagekit.upload({
        file: imgBase64,
        fileName: req.file.originalname,
        tags: [`${req.file.originalname}`],
      });
      // result -> url
      const picture_url = result.url;
      // patch
      const [count, [obj]] = await User.update(
        { picture_url },
        { where: { id }, returning: true }
      );
      // res status
      res.status(200).json({
        status: 200,
        msg: "User profile picture successfully updated.",
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      // get id loggedInUser
      const { id } = req.loggedInUser;
      // del
      await User.destroy({ where: { id } });
      // res status
      res.status(200).json({
        status: 200,
        msg: `User successfully deleted.`,
      });
    } catch (error) {
      next(error);
    }
  }
};

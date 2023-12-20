const Helper = require("./helper.js");
const { User } = require("./models");

module.exports = class Middleware {
  static handleError(err, req, res, next) {
    process.env.NODE_ENV !== "production" && console.log(err);
    switch (err.name) {
      case "SequelizeValidationError":
        return res.status(400).json({ msg: err.errors[0].message });
      case "SequelizeUniqueConstraintError":
        return res.status(400).json({ msg: err.errors[0].message });
      case "JsonWebTokenError":
        return res.status(401).json({ msg: err.message });
      case "Error":
        return res.status(err.status).json({ msg: err.msg });
      default:
        return res.status(500).json({ msg: "Internal Server Error." });
    }
  }
  static async tokenGuard(req, res, next) {
    try {
      // no token? throw
      if (!req.headers.authorization) Helper.error("Unauthorized.", 401);
      // grab token
      const token = req.headers.authorization.split(" ")[1];
      // token -> payload
      const payload = await Helper.tokenToPayload(token);
      // payload user dont exist? throw
      const user = await User.findOne({
        where: { id: payload.id },
      });
      if (!user) Helper.error("Unauthorized.", 401);
      // save user data to req.loggedInUser
      req.loggedInUser = user;
      next();
    } catch (error) {
      next(error);
    }
  }
};

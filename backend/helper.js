const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = class Helper {
  static error(msg, status) {
    throw { name: "Error", msg, status };
  }
  static async hashPassword(value) {
    try {
      return await bcrypt.hash(value, 10);
    } catch (error) {
      throw error;
    }
  }
  static async comparePassword(receivedTypedPassword, databaseHashedPassword) {
    try {
      return await bcrypt.compare(
        receivedTypedPassword,
        databaseHashedPassword
      );
    } catch (error) {
      throw error;
    }
  }
  static payloadToToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
  static tokenToPayload(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  static isInt(input, name) {
    return !isNaN(parseInt(input)) && parseInt(input) === parseFloat(input);
  }
  static isStr(input, name) {
    return isNaN(parseInt(input));
  }
  static pagination(
    search,
    limit,
    page,
    sort,
    sortBy,
    searchBy,
    allowedFields
  ) {
    // limit + page -> offset
    limit = Math.max(parseInt(limit), 1) || 10; // default 10 if null or not a number (min 1)
    page = Math.max(parseInt(page), 1) || 1; // default 1 if null or not a number (min 1)
    const offset = (page - 1) * limit;
    // sort + sortBy -> order
    const order = [[sortBy || allowedFields[0], sort || "asc"]]; // default values
    if (!allowedFields.includes(order[0][0])) {
      // check valid
      Helper.error("Invalid sortby.", 400);
    }
    if (!["asc", "desc"].includes(order[0][1])) {
      // check valid
      Helper.error("Invalid sort.", 400);
    }
    // search -> query
    search = search || ""; // default values
    if (!allowedFields.includes(searchBy)) {
      // check valid
      Helper.error("Invalid searchBy.", 400);
    }
    let query = {};
    if (search) {
      query[searchBy] = { [Op.iLike]: `%${search}%` };
    }
    // return
    return { limit, offset, order, query };
  }
};

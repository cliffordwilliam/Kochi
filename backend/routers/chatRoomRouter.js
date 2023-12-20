const express = require("express");

// controller
const ChatRoomController = require("../controllers/chatRoomController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");

// create router
const userChatRoomRouter = express.Router();

// endpoints
userChatRoomRouter.get("/", ChatRoomController.get);
userChatRoomRouter.get("/:id", ChatRoomController.getId);

// exports
module.exports = userChatRoomRouter;

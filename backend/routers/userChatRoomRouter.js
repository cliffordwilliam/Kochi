const express = require("express");

// controller
const UserChatRoomController = require("../controllers/userChatRoomController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");

// create router
const userChatRoomRouter = express.Router();

// endpoints
userChatRoomRouter.post("/", UserChatRoomController.post);
userChatRoomRouter.get("/", UserChatRoomController.get);
userChatRoomRouter.delete("/:id", UserChatRoomController.delete);

// exports
module.exports = userChatRoomRouter;

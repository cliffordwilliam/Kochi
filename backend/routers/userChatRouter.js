const express = require("express");

// controller
const UserChatController = require("../controllers/userChatController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");

// create router
const userChatRouter = express.Router();

// endpoints
userChatRouter.post("/", UserChatController.post);
userChatRouter.get("/", UserChatController.get);
userChatRouter.delete("/:id", UserChatController.delete);

// exports
module.exports = userChatRouter;

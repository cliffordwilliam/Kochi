const express = require("express");

// controller
const ChatController = require("../controllers/chatController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");

// create router
const chatRouter = express.Router();

// endpoints
chatRouter.post("/", ChatController.post);
chatRouter.get("/", ChatController.get);
chatRouter.delete("/:id", ChatController.delete);

// exports
module.exports = chatRouter;

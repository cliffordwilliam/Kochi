const express = require("express");

//child router
const userRouter = require("./userRouter");
const chatRoomRouter = require("./chatRoomRouter");
const chatRouter = require("./chatRouter");
const userChatRoomRouter = require("./userChatRoomRouter");
const userChatRouter = require("./userChatRouter");

// guards
const Middleware = require("../middleware");

// get controllers
const UserController = require("../controllers/userController");

// craete router
const homeRouter = express.Router();

// free
homeRouter.post("/user/register", UserController.post);
homeRouter.post("/user/login", UserController.login);

// token guard
homeRouter.use(Middleware.tokenGuard);
homeRouter.use("/chatRoom", chatRoomRouter);
homeRouter.use("/chat", chatRouter);
homeRouter.use("/userChatRoom", userChatRoomRouter);
homeRouter.use("/userChat", userChatRouter);
homeRouter.use("/user", userRouter);

// exports
module.exports = homeRouter;

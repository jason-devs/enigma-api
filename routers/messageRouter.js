import express from "express";
import * as authController from "../controllers/authController.js";
import * as messageController from "../controllers/messageController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(messageController.getMessages)
  .post(messageController.newMessage)
  .delete(messageController.deleteMessages);

router
  .route("/:messageId")
  .get(messageController.getMessage)
  .delete(messageController.deleteMessage);

export default router;

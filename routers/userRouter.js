import express from "express";
import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/my-account")
  .get(userController.getMyAccount)
  .patch(userController.updateMyAccount)
  .delete(userController.deleteMyAccount);

router
  .route("/my-messages")
  .get(userController.getMyMessages)
  .delete(userController.deleteMyMessages);

router
  .route("/my-messages/:messageId")
  .get(userController.getMessage)
  .delete(userController.deleteMessage);

export default router;

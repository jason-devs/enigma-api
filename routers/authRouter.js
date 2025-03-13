import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:resetToken").post(authController.resetPassword);
router.use(authController.protect);
router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);

export default router;

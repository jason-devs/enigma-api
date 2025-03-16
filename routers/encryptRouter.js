import express from "express";
import getEncryptedText from "../controllers/encryptController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.keyProtect);

router.route("/").post(getEncryptedText);

export default router;

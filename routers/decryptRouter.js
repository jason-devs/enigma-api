import * as express from "express";
import getDecryptedText from "../controllers/decryptController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.keyProtect);

router.route("/").post(getDecryptedText);

export default router;

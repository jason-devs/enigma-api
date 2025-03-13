import express from "express";
import getEncryptedText from "../controllers/encryptController.js";

const router = express.Router();

router.route("/").post(getEncryptedText);

export default router;

import * as express from "express";
import getDecryptedText from "../controllers/decryptController.js";

const router = express.Router();

router.route("/").post(getDecryptedText);

export default router;

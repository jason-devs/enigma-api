import express from "express";
import * as enigmaController from "../controllers/enigmaController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.keyProtect);

router.route("/").post(enigmaController.sendOutput);

export default router;

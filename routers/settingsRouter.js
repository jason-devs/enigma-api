import express from "express";
import * as authController from "../controllers/authController.js";
import * as settingsController from "../controllers/settingsController.js";

const router = express.Router();

router.use(authController.userProtect);

router
  .route("/")
  .get(settingsController.getSettings)
  .post(settingsController.saveSetting)
  .delete(settingsController.deleteSettings);

router
  .route("/:settingId")
  .get(settingsController.getSetting)
  .delete(settingsController.deleteSetting);

export default router;

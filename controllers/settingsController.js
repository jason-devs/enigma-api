import { catchAsyncErrors } from "../utils/helpers.js";
import AppError from "../utils/appError.js";
import Settings from "../models/settingsModel.js";

export const saveSetting = catchAsyncErrors(async (req, res, next) => {
  const { rotors, reflector, plugboard, ringPositions, startRotations } =
    req.body;

  const settingsDetails = {
    rotors,
    reflector,
    plugboard,
    ringPositions,
    startRotations,
  };

  if (
    !rotors ||
    !reflector ||
    !plugboard ||
    !ringPositions ||
    !startRotations
  ) {
    return next(
      new AppError(
        `You have to provide all of the following properties: rotors, reflector, plugboard, ringPoitions, startRotations`,
        400,
      ),
    );
  }

  const { _id: user } = req.currentUser;

  const settings = await Settings.saveOrUpdateDocument(settingsDetails, user);

  settings.users = undefined;
  settings.__v = undefined;

  res.status(201).json({
    status: "success",
    data: {
      settings,
    },
  });
});

export const getSetting = catchAsyncErrors(async (req, res, next) => {
  const { settingId } = req.params;
  const { _id: userId } = req.currentUser;

  const setting = await Settings.findOne({
    _id: settingId,
    users: { $in: [userId] },
  });

  if (!setting) {
    return next(
      new AppError("Couldn't find those settings, please check!", 404),
    );
  }

  setting.users = undefined;

  res.status(200).json({
    status: "success",
    data: {
      setting,
    },
  });
});

export const getSettings = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId } = req.currentUser;

  const settings = await Settings.find({ users: { $in: [userId] } });

  // eslint-disable-next-line no-return-assign
  settings.forEach(setting => (setting.users = undefined));

  res.status(200).json({
    status: "success",
    results: settings.length,
    data: {
      settings,
    },
  });
});

export const deleteSettings = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId } = req.currentUser;

  await Settings.deleteOrUpdateDocuments(userId);

  res.status(204).json({
    status: "success",
  });
});

export const deleteSetting = catchAsyncErrors(async (req, res, next) => {
  const { settingId } = req.params;
  const { _id: userId } = req.currentUser;

  const setting = await Settings.deleteOrUpdateDocument(settingId, userId);

  if (!setting) {
    return next(
      new AppError("Couldn't find a those settings, please check!", 404),
    );
  }

  res.status(204).json({
    status: "success",
  });
});

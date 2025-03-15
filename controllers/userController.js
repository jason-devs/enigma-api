import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import { catchAsyncErrors } from "../utils/helpers.js";

export const getMyAccount = catchAsyncErrors(async (req, res, next) => {
  const { _id: id } = req.currentUser;
  const user = await User.findById(id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const updateMyAccount = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hey, from updateMyAccount.",
  });
};

export const deleteMyAccount = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hey, from deleteMyAccount.",
  });
};

export const getMyMessages = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hey, from getMyMessages.",
  });
};

export const getMessage = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hey, from getMessage.",
  });
};

export const deleteMessage = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hey, from deleteMessage.",
  });
};

export const deleteMyMessages = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hey, from deleteMyMessages.",
  });
};

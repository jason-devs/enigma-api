import User from "../models/userModel.js";

export const getMyAccount = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hey, from getMyAccount.",
  });
};

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

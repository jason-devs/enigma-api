import { catchAsyncErrors } from "../utils/helpers.js";
import Message from "../models/messageModel.js";
import AppError from "../utils/appError.js";

export const saveMessage = catchAsyncErrors(async (req, res, next) => {
  const { text, settings } = req.body;

  if (!text || !settings) {
    return next(
      new AppError(`We need both text and settings to save a message!`, 400),
    );
  }

  const { _id: user } = req.currentUser;

  const message = await Message.create({
    text,
    settings,
    user,
  });

  message.__v = undefined;

  res.status(201).json({
    status: "success",
    data: {
      message,
    },
  });
});

export const getMessage = catchAsyncErrors(async (req, res, next) => {
  const { messageId } = req.params;
  const { _id: userId } = req.currentUser;

  const message = await Message.findOne({ _id: messageId, user: userId });

  if (!message) {
    return next(
      new AppError("Couldn't find a message that message, please check!", 404),
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});

export const getMessages = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId } = req.currentUser;

  const messages = await Message.find({ user: userId });

  res.status(200).json({
    status: "success",
    results: messages.length,
    data: {
      messages,
    },
  });
});

export const deleteMessages = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId } = req.currentUser;

  await Message.deleteMany({ user: userId });

  res.status(204).json({
    status: "success",
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { messageId } = req.params;
  const { _id: userId } = req.currentUser;

  const message = await Message.findOneAndDelete({
    _id: messageId,
    user: userId,
  });

  if (!message) {
    return next(
      new AppError("Couldn't find a that message, please check!", 404),
    );
  }

  res.status(204).json({
    status: "success",
  });
});

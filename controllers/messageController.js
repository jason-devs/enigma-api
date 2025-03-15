import { catchAsyncErrors } from "../utils/helpers.js";
import Message from "../models/messageModel.js";
import AppError from "../utils/appError.js";

export const newMessage = catchAsyncErrors(async (req, res, next) => {
  const { plaintext, cyphertext, settings } = req.body;

  if (!plaintext && !cyphertext) {
    return next(new AppError(`We cannot save a message with no text.`, 400));
  }

  const { _id: user } = req.currentUser;

  const message = await Message.create({
    plaintext,
    cyphertext,
    settings,
    user,
  });

  const { _id: id } = message;

  const newMessage = await Message.findById(id).select("-__v");

  res.status(201).json({
    status: "success",
    data: {
      newMessage,
    },
  });
});

export const getMessage = catchAsyncErrors(async (req, res, next) => {
  const { messageId } = req.params;
  const { _id: userId } = req.currentUser;

  const message = await Message.findOne({ _id: messageId, user: userId });

  if (!message) {
    return next(
      new AppError("Couldn't find a message with that ID, please check!", 404),
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

  if (messages.length === 0) {
    return next(new AppError("Couldn't find any messages please check!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      messages,
    },
  });
});

export const deleteMessages = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId } = req.currentUser;

  const messages = await Message.deleteMany({ user: userId });

  if (messages.length === 0) {
    return next(new AppError("Couldn't find any messages please check!", 404));
  }

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
      new AppError("Couldn't find a message with that ID, please check!", 404),
    );
  }

  res.status(204).json({
    status: "success",
  });
});

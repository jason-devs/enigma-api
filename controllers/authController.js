import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "../utils/helpers.js";

const signJWT = id => {
  const { JWT_SECRET, JWT_EXPIRY } = process.env;
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
  return token;
};

const sendJWT = (user, token, res) => {
  const { NODE_ENV, JWT_COOKIE_EXPIRY } = process.env;

  const cookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const login = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "from login controller",
  });
};

export const logout = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "from logout controller",
  });
};

export const signup = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const { _id: id } = user;

  const token = signJWT(id);
  const newUser = await User.findById(id).select("-password -messages -role");

  sendJWT(newUser, token, res);
});

export const forgotPassword = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "from forgotPassword controller",
  });
};

export const resetPassword = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "from resetPassword controller",
  });
};

export const protect = (req, res, next) => {
  console.log("protecting");
  next();
};

export const restrict = (req, res, next) => {
  console.log("restricting");
  next();
};

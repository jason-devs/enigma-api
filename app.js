import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";

import enigmaRouter from "./routers/enigmaRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import messageRouter from "./routers/messageRouter.js";
import settingsRouter from "./routers/settingsRouter.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    "Too many requests from this IP address. Please try again in an hour.",
});

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", limiter);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json());

app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/user`, userRouter);
app.use(`/api/v1/message`, messageRouter);
app.use(`/api/v1/settings`, settingsRouter);
app.use(`/api/v1/enigma`, enigmaRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `No service was found at ${req.originalUrl} on this server!`,
    404,
  );

  next(error);
});

app.use(globalErrorHandler);

export default app;

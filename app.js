import express from "express";

import encryptRouter from "./routers/encryptRouter.js";
import decryptRouter from "./routers/decryptRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

const app = express();

app.use(express.json());

app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/user`, userRouter);
app.use(`/api/v1/encrypt`, encryptRouter);
app.use(`/api/v1/decrypt`, decryptRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `No service was found at ${req.originalUrl} on this server!`,
    404,
  );

  next(error);
});

app.use(globalErrorHandler);

export default app;

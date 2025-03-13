const respondDev = (err, res) => {
  const { status = "error", statusCode = 500, message, stack } = err;

  res.status(statusCode).json({
    status,
    message,
    stack,
    error: err,
  });
};

const respondProd = (err, res) => {
  const { status, statusCode, message, isOperational } = err;

  if (isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });
  } else {
    console.error("ERROR 🔴");

    res.status(500).json({
      status: "error",
      message:
        "Something unexpected happened our end. Apologies for the inconvenience.",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === "development") {
    respondDev(err, res);
  }

  if (NODE_ENV === "production") {
    respondProd(err, res);
  }
};

export default globalErrorHandler;

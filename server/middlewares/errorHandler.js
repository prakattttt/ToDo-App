import AppError from "../utils/AppError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (!(err instanceof AppError)) {
    statusCode = 500;
    message = "Something went wrong!";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;

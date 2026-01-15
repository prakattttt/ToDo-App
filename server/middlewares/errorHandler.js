import AppError from "../utils/AppError.js";
import util from "util";
import dotenv from "dotenv/config";

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log("ERROS: ");
    console.log(
      util.inspect(err, {
        showHidden: true,
        depth: null,
        colors: true,
      })
    );
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((el) => el.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists. Please use another one.`;
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;

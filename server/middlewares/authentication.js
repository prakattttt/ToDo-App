import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token)
    return next(new AppError("User not authenticated! Please login.", 401));

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(
          new AppError("Access token expired! Please use refresh token.", 401)
        );
      }

      return next(new AppError("Incorrect User Token!", 403));
    }

    req._id = payload._id;
    next();
  });
};

export default authenticateUser;

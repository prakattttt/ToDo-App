import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import Users from "../models/usersModel.js";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return next(
        new AppError("Please fill up all the required credentials!", 400)
      );

    await Users.createUser(username, email, password);

    res.status(201).json({ message: "Registration Successful!" });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return next(new AppError(`${field} already exists!`, 400));
    }
    console.log(error.name);
    console.log(error.message);
    console.log(error.errors);
    next(error);
  }
};

const loginUser = async (req, res, next) => {};

const logoutUser = async (req, res, next) => {};

export { loginUser, registerUser, logoutUser };

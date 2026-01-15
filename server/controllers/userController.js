import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import Users from "../models/usersModel.js";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password)
      return next(
        new AppError("Please fill up all the required credentials!", 400)
      );

    await Users.createUser(username, email, password);

    res
      .status(201)
      .json({ message: "Registration Successful!", success: true });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password)
      return next(
        new AppError("Please fill up all the required credentials!", 400)
      );

    const user = await Users.loginUser(email, password);

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await Users.addRefreshToken(user._id, refreshToken);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "Strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Login successful!", success: true });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await Users.removeRefreshToken(refreshToken);
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "Strict" });
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "Strict" });

    res.status(200).json({ message: "Logout Successful!" });
  } catch (error) {
    next(error);
  }
};

function generateAccessToken(userId) {
  return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(userId) {
  return jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5d",
  });
}

export { loginUser, registerUser, logoutUser };

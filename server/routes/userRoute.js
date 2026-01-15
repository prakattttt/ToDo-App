import express from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/userController.js";

const Router = express.Router();

Router.post("/register", registerUser);

Router.post("/login", loginUser);

Router.post("/refresh", refreshAccessToken);

Router.delete("/logout", logoutUser)

export default Router;
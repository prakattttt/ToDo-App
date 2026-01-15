import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";

const Router = express.Router();

Router.post("/register", registerUser);

Router.post("/login", loginUser);

Router.delete("/logout", logoutUser)

export default Router;
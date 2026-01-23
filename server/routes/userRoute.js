import express from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, getTodosUser } from "../controllers/userController.js";
import authenticateUser from "../middlewares/authentication.js";

const Router = express.Router();

Router.get("/getUser", authenticateUser, getTodosUser);

Router.post("/register", registerUser);

Router.post("/login", loginUser);

Router.post("/refresh", refreshAccessToken);

Router.delete("/logout", logoutUser)

export default Router;
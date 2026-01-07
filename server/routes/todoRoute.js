import express from "express";
import { getTodos } from "../controllers/todoController.js";

const Router = express.Router();

Router.get("/", getTodos);

export default Router;

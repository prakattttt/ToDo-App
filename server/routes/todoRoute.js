import express from "express";
import { getTodos, getActiveTodos, getInactiveTodos } from "../controllers/todoController.js";

const Router = express.Router();

Router.get("/", getTodos);

Router.get("/isActive", getActiveTodos);

Router.get("/isCompleted", getInactiveTodos);

export default Router;

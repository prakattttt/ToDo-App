import express from "express";
import { getTodos, getActiveTodos, getInactiveTodos, addTodos, deleteTodos, toggleActive } from "../controllers/todoController.js";

const Router = express.Router();

Router.get("/", getTodos);

Router.get("/isActive", getActiveTodos);

Router.get("/isCompleted", getInactiveTodos);

Router.post("/", addTodos);

Router.patch("/toggle/:id", toggleActive);

Router.delete("/:id", deleteTodos)

export default Router;

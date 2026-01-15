import express from "express";
import { getTodos, addTodos, deleteTodos, toggleActive } from "../controllers/todoController.js";
import authenticateUser from "../middlewares/authentication.js";

const Router = express.Router();

Router.get("/", authenticateUser, getTodos);

Router.post("/", addTodos);

Router.patch("/toggle/:id", toggleActive);

Router.delete("/:id", deleteTodos)

export default Router;

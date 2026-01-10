import Todos from "../models/todosModel.js";
import AppError from "../utils/AppError.js";

const getTodos = async (req, res, next) => {
  try {
    const data = await Todos.getAllTodos();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const addTodos = async (req, res, next) => {
  try {
    const { todos, isActive } = req.body;

    if (!todos) {
      throw new AppError("Todos must be a non-empty string", 400);
    }

    const newTodo = await Todos.addNewTodos(todos, isActive);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

const toggleActive = async (req, res, next) => {
  try {
    const id = req.params.id;
    const toggledTodo = await Todos.toggleTodo(id);
    res.status(200).json(toggledTodo);
  } catch (error) {
    next(error);
  }
}

const deleteTodos = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedData = await Todos.removeTodos(id);

    if (!deletedData) {
      throw new AppError("No todos found with this ID", 404);
    }

    res.status(200).json(deletedData);
  } catch (error) {
    next(error);
  }
};

export { getTodos, addTodos, deleteTodos, toggleActive };

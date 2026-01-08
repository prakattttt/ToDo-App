import Todos from "../models/todosModel.js";

const getTodos = async (req, res) => {
  try {
    const data = await Todos.getAllTodos();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const getActiveTodos = async (req, res) => {
  try {
    const data = await Todos.getActiveData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
const getInactiveTodos = async (req, res) => {
  try {
    const data = await Todos.getInactiveData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export { getTodos, getActiveTodos, getInactiveTodos };

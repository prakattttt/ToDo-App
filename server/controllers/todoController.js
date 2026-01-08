import Todos from "../models/todosModel.js";

const getTodos = async (req, res) => {
  try {
    const data = await Todos.getAllTodos();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong while getting all data!" });
  }
};

const getActiveTodos = async (req, res) => {
  try {
    const data = await Todos.getActiveData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while getting active data!" });
  }
};
const getInactiveTodos = async (req, res) => {
  try {
    const data = await Todos.getInactiveData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while getting inactive data!" });
  }
};

const addTodos = async (req, res) => {
  try {
    const { todos, isActive } = req.body;
    if (!Array.isArray(todos) || todos.length === 0) {
      return res.status(400).json({
        message: "`Todos must be a non-empty array of strings",
      });
    }
    const newTodo = await Todos.addNewTodos(todos, isActive);
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while adding data!" });
  }
};

const deleteTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Todos.removeTodos(id);
    res.status(200).json(deletedData);
  } catch (error) {
    if (error.message.includes('No todos found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong while deleting data!" });
  }
};


export { getTodos, getActiveTodos, getInactiveTodos, addTodos, deleteTodos };

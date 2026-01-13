import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  todos: {
    type: String,
    required: [true, "Please enter a todo!"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

TodoSchema.statics.getAllTodos = async function () {
  try {
    return await this.find();
  } catch (err) {
    throw new Error("Failed to fetch todos");
  }
};

TodoSchema.statics.addNewTodos = async function (todos, isActive) {
  try {
    return await this.create({
      todos,
      isActive,
    });
  } catch (err) {
    throw new Error("Failed to add todos!");
  }
};

TodoSchema.statics.removeTodos = async function (id) {
  const todo = await this.findByIdAndDelete(id);

  if (!todo) {
    throw new Error(`No todos found with id ${id}`);
  }

  return todo;
};

TodoSchema.statics.toggleTodo = async function (id) {
  const todo = await this.findById(id);

  if (!todo) {
    throw new Error(`No todo found with id ${id}`);
  }

  todo.isActive = !todo.isActive;
  await todo.save();

  return todo;
};

const Todos = model("Todos", TodoSchema);

export default Todos;

import { Schema, model } from "mongoose";

const TodoSchema = new Schema(
  {
    todos: {
      type: String,
      required: [true, "Please enter a todo!"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

TodoSchema.statics.getUserTodos = async function (userId) {
  try {
    return await this.find({ user: userId });
  } catch (error) {
    throw new Error("Failed to fetch user todos");
  }
};

TodoSchema.statics.addNewTodos = async function (todos, isActive, user) {
  try {
    return await this.create({
      todos,
      isActive,
      user
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

import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  todos: {
    type: [String],
    required: true,
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

const Todos = model("Todos", TodoSchema);

export default Todos;

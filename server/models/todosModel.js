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

TodoSchema.statics.getActiveData = async function () {
  try {
    return await this.find({ isActive: true });
  } catch (err) {
    throw new Error("Failed to fetch active todos!");
  }
};

TodoSchema.statics.getInactiveData = async function () {
  try {
    return await this.find({ isActive: false });
  } catch (err) {
    throw new Error("Failed to fetch inactive todos!");
  }
};

const Todos = model("Todos", TodoSchema);

export default Todos;

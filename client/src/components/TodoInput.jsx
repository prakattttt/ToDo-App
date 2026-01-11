import { FaPlus } from "react-icons/fa";

const TodoInput = ({ input, setInput, addTodo }) => {
  return (
    <div className="center">
      <input
        className="bg-gray-100 w-full h-10 p-1 rounded-md pl-2"
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
      />

      <button
        className="ml-2 h-10 w-9 bg-black text-white rounded-md center"
        onClick={addTodo}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default TodoInput;

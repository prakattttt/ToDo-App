import { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const Main = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/todos");
        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTodos();
  }, []);

  const activeCount = todos.filter((todo) => todo.isActive).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return todo.isActive;
    if (filter === "completed") return !todo.isActive;
    return true;
  });

  const addTodo = async () => {
    if (!input.trim()) return;

    try {
      const { data } = await axios.post("http://localhost:5000/todos", {
        todos: input,
      });

      setTodos((prev) => [...prev, data]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleActive = async (id) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/todos/toggle/${id}`
      );

      setTodos((prev) =>
        prev.map((todo) => (todo._id === data._id ? data : todo))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="bg-white max-w-4xl m-auto p-5 rounded-lg mt-12 shadow-xl">
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

      <div className="mt-4 mb-2 flex gap-3">
        <div
          className={`box ${filter === "all" && "selected"}`}
          onClick={() => setFilter("all")}
        >
          All ({todos.length})
        </div>

        <div
          className={`box ${filter === "active" && "selected"}`}
          onClick={() => setFilter("active")}
        >
          Active ({activeCount})
        </div>

        <div
          className={`box ${filter === "completed" && "selected"}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({todos.length - activeCount})
        </div>
      </div>

      <ul className="mt-4">
        {filteredTodos.map((item) => (
          <li className="list group" key={item._id}>
            <div className="flex items-center w-full">
              <label className="flex items-center flex-1 cursor-pointer">
                <input
                  className="checkbox peer"
                  type="checkbox"
                  checked={!item.isActive}
                  onChange={() => toggleActive(item._id)}
                />

                <div className="task-text ml-2">{item.todos}</div>
              </label>

              {!item.isActive && (
                <FaTrashAlt
                  className="text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer"
                  onClick={() => deleteTodo(item._id)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>

      <hr className="border-t-2 border-gray-300 mt-6" />

      <div className="flex justify-between mt-3">
        <p>{activeCount} tasks remaining</p>
        {todos.length - activeCount > 0 && (
          <p className="text-green-600">
            {todos.length - activeCount} completed
          </p>
        )}
      </div>
    </main>
  );
};

export default Main;

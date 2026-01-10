import { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const Main = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return todo.isActive;
    if (filter === "completed") return !todo.isActive;
    return true;
  });

  useEffect(() => {
    setActiveCount(todos.filter((todo) => todo.isActive).length);
  }, [todos]);

  const getData = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setData();
    }
  };

  const setData = async () => {
    if (input.trim() === "") return;

    const response = await axios.post("http://localhost:5000/todos", {
      todos: input,
    });

    setTodos((prev) => [...prev, response.data]);
    setInput("");
  };

  const toggleActive = async (id) => {
    const response = await axios.patch(
      `http://localhost:5000/todos/toggle/${id}`
    );

    const updatedTodo = response.data;

    setTodos((prev) =>
      prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(`http://localhost:5000/todos/${id}`);
    const deletedId = response.data._id;

    const afterTodos = todos.filter((td) => td._id !== deletedId);
    setTodos(afterTodos);
  };

  return (
    <main className="bg-white max-w-4xl m-auto p-5 rounded-lg mt-12 shadow-xl max-lg:mx-5 max-sm:mx-2 max-sm:p-3 max-sm:mt-8">
      <div className="center">
        <input
          className="bg-gray-100 w-full h-10 p-1 text-[1rem] rounded-md pl-2 focus:outline-gray-200 max-sm:text-[0.85rem]"
          type="search"
          name="task"
          id="task"
          onChange={getData}
          value={input}
          placeholder="Add a new task..."
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 h-10 w-9 bg-black text-white rounded-md
               flex items-center justify-center text-xl leading-none hover-scale cursor-pointer"
          onClick={setData}
        >
          <FaPlus className="text-[1rem] hover-scale" />
        </button>
      </div>
      <div className="mt-4 mb-2 flex gap-3">
        <div
          className={`box ${filter === "all" ? "selected" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({todos.length})
        </div>

        <div
          className={`box ${filter === "active" ? "selected" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active ({activeCount})
        </div>

        <div
          className={`box ${filter === "completed" ? "selected" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({todos.length - activeCount})
        </div>
      </div>

      <div className="tasks">
        {todos.length === 0 ? (
          <p className="mt-6 text-gray-500 pl-1">
            {filter === "all"
              ? "No tasks yet!"
              : `No ${filter === "completed" ? "completed" : "active"} tasks!`}
          </p>
        ) : (
          ""
        )}
        <ul className="mt-4">
          {filteredTodos.map((item) => (
            <li className="list group" key={item._id}>
              <div className="flex items-center w-full">
                {/* Checkbox + text (peer relationship preserved) */}
                <label className="flex items-center flex-1 cursor-pointer">
                  <input
                    className="checkbox peer"
                    type="checkbox"
                    checked={!item.isActive}
                    onChange={() => toggleActive(item._id)}
                  />

                  <div className="task-text w-full flex justify-between items-center">
                    <p>{item.todos}</p>
                  </div>
                </label>

                {!item.isActive && (
                  <FaTrashAlt
                    className="text-[1rem] text-red-500 mr-3
          opacity-0 group-hover:opacity-100
          transition duration-300 hover:scale-[1.15] cursor-pointer"
                    onClick={() => deleteTodo(item._id)}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr className="border-t-2 border-gray-300 mt-6" />
      <div className="bottom-main flex items-center justify-between mt-3 max-sm:text-[0.85rem]">
        <p className="text-gray-700">{activeCount} tasks remaining</p>
        <p className="text-green-600">
          {todos.length - activeCount
            ? `${todos.length - activeCount} completed`
            : ""}
        </p>
      </div>
    </main>
  );
};

export default Main;

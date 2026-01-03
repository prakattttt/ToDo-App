import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { nanoid } from "nanoid";

const Main = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    setActiveCount(todos.filter((todo) => todo.isActive).length);
  }, [todos]);

  const getData = (e) => {
    setInput(e.target.value);
  };

  const setData = () => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: nanoid(), todo: input, isActive: true },
    ]);
    setInput("");
  };

  const toggleActive = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isActive: !todo.isActive } : todo
      )
    );
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
        <div className="box selected">All ({todos.length})</div>
        <div className="box">Active ({activeCount})</div>
        <div className="box">Completed ({todos.length - activeCount})</div>
      </div>
      <div className="tasks">
        {todos.length === 0 ? (
          <p className="mt-6 text-gray-500 pl-1">No tasks yet!</p>
        ) : (
          ""
        )}
        <ul className="mt-4">
          {todos.map((item, i) => (
            <li className="list" key={item.id}>
              <label
                htmlFor={item.id}
                className="flex items-center w-full cursor-pointer"
              >
                <input
                  className="checkbox peer"
                  type="checkbox"
                  id={item.id}
                  checked={!item.isActive}
                  onChange={() => toggleActive(item.id)}
                />
                <span className="task-text">{item.todo}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="border-t-2 border-gray-300 mt-6" />
      <div className="bottom-main flex items-center justify-between mt-3 max-sm:text-[0.85rem]">
        <p className="text-gray-700">{activeCount} tasks remaining</p>
        <p className="text-green-600">{(todos.length - activeCount) ? `${todos.length - activeCount} completed` : ''}</p>
      </div>
    </main>
  );
};

export default Main;

import { useState, useEffect } from "react";
import axios from "axios";
import TodoInput from "../components/TodoInput";
import TodoFilters from "../components/TodoFilters";
import TodoList from "../components/TodoList";
import TodoFooter from "../components/TodoFooter";
import Foot from "../components/Foot";

const TodoPage = () => {
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
    <>
      <main className="bg-white max-w-4xl m-auto p-5 rounded-lg mt-12 shadow-xl">
        <TodoInput input={input} setInput={setInput} addTodo={addTodo} />

        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          total={todos.length}
          activeCount={activeCount}
        />

        <TodoList
          todos={filteredTodos}
          toggleActive={toggleActive}
          deleteTodo={deleteTodo}
        />

        <TodoFooter
          activeCount={activeCount}
          completedCount={todos.length - activeCount}
        />
      </main>
      <Foot />
    </>
  );
};

export default TodoPage;

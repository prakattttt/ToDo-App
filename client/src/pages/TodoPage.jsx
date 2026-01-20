import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api.js";
import TodoInput from "../components/TodoInput";
import TodoFilters from "../components/TodoFilters";
import TodoList from "../components/TodoList";
import TodoFooter from "../components/TodoFooter";
import Foot from "../components/Foot";
import LogOut from "../components/LogOut.jsx";

const TodoPage = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const handleAuthError = (err) => {
    if (err.status === 401) {
      toast.error("User not authenticated. Please login again!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      console.error(err);
      toast.error("Something went wrong. Try again!");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await api.get("/todos");
        setTodos(data);
      } catch (err) {
        handleAuthError(err);
      }
    };

    fetchTodos();
  }, [navigate]);

  const activeCount = todos.filter((todo) => todo.isActive).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return todo.isActive;
    if (filter === "completed") return !todo.isActive;
    return true;
  });

  const addTodo = async () => {
    if (!input.trim()) return;

    try {
      const { data } = await api.post("/todos", {
        todos: input,
      });

      setTodos((prev) => [...prev, data]);
      setInput("");
      toast.success("Todo added");
    } catch (err) {
      handleAuthError(err);
    }
  };

  const toggleActive = async (id) => {
    try {
      const { data } = await api.patch(`/todos/toggle/${id}`);

      setTodos((prev) =>
        prev.map((todo) => (todo._id === data._id ? data : todo))
      );
    } catch (err) {
      handleAuthError(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("Todo deleted");
    } catch (err) {
      handleAuthError(err);
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
      <LogOut />
    </>
  );
};

export default TodoPage;

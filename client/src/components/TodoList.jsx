import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleActive, deleteTodo }) => {
  return (
    <ul className="mt-4">
      {todos.map((item) => (
        <TodoItem
          key={item._id}
          item={item}
          toggleActive={toggleActive}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;

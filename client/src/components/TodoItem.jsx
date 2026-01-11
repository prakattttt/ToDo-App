import { FaTrashAlt } from "react-icons/fa";

const TodoItem = ({ item, toggleActive, deleteTodo }) => {
  return (
    <li className="list group">
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
  );
};

export default TodoItem;

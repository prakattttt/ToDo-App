const TodoFilters = ({ filter, setFilter, total, activeCount }) => {
  return (
    <div className="mt-4 mb-2 flex gap-3">
      <div
        className={`box ${filter === "all" && "selected"}`}
        onClick={() => setFilter("all")}
      >
        All ({total})
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
        Completed ({total - activeCount})
      </div>
    </div>
  );
};

export default TodoFilters;

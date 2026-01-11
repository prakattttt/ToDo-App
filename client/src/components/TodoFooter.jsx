const TodoFooter = ({ activeCount, completedCount }) => {
  return (
    <>
      <hr className="border-t-2 border-gray-300 mt-6" />

      <div className="flex justify-between mt-3">
        <p>{activeCount} tasks remaining</p>
        {completedCount > 0 && (
          <p className="text-green-600">
            {completedCount} completed
          </p>
        )}
      </div>
    </>
  );
};

export default TodoFooter;

const Main = () => {
  return (
    <main className="bg-white max-w-4xl m-auto p-5 rounded-lg mt-8">
      <div className="center">
        <input
          className="bg-gray-100 w-full h-8 p-1 text-[1rem] rounded-md pl-2"
          type="search"
          name="task"
          id="task"
          placeholder="Add a new task..."
        />
        <button
          className="ml-2 h-8 w-9 bg-black text-white rounded-md
               flex items-center justify-center text-xl leading-none"
        >
          +
        </button>
      </div>
      <div className="my-3 flex gap-3">
        <div className="box selected">All (3)</div>
        <div className="box">Active (1)</div>
        <div className="box">Completed (2)</div>
      </div>
      <div className="tasks">
        <ul className="mt-4">
          <li className="list flex items-center">
            <input
              className="checkbox center"
              type="checkbox"
              name="task"
              id="task1"
            />
            Create a responsive design
          </li>
          <li className="list flex items-center">
            <input
              className="checkbox"
              type="checkbox"
              name="task"
              id="task2"
            />
            Add task filtering
          </li>
          <li className="list flex items-center">
            <input
              className="checkbox"
              type="checkbox"
              name="task"
              id="task3"
            />
            Implement Database
          </li>
        </ul>
      </div>
      <hr className="border-t-2 border-gray-100 mt-4"/>
      <div className="bottom-main flex items-center justify-between mt-3">
        <p>2 tasks remaining</p>
        <p>1 completed</p>
      </div>
    </main>
  );
};

export default Main;

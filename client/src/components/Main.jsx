import { FaPlus } from "react-icons/fa"

const Main = () => {
  return (
    <main className="bg-white max-w-4xl m-auto p-5 rounded-lg mt-8 shadow-xl max-lg:mx-5 max-sm:mx-2 max-sm:p-3">
      <div className="center">
        <input
          className="bg-gray-100 w-full h-8 p-1 text-[1rem] rounded-md pl-2 focus:outline-gray-200 max-sm:text-[0.85rem]"
          type="search"
          name="task"
          id="task"
          placeholder="Add a new task..."
        />
        <button
          className="ml-2 h-8 w-9 bg-black text-white rounded-md
               flex items-center justify-center text-xl leading-none hover-scale cursor-pointer"
        >
        <FaPlus className="text-[1rem] hover-scale"/>
        </button>
      </div>
      <div className="mt-4 mb-2 flex gap-3">
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
      <hr className="border-t-2 border-gray-300 mt-6"/>
      <div className="bottom-main flex items-center justify-between mt-3 max-sm:text-[0.85rem]">
        <p className="text-gray-700">2 tasks remaining</p>
        <p className="text-green-600">1 completed</p>
      </div>
    </main>
  );
};

export default Main;

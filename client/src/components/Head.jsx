import logo from "../assets/checklist.png"

const Head = () => {
  return (
    <header className="center flex-col m-5">
      <div className="center mb-1">
        <img src={logo} className="w-12" alt="logo" />
        <span className="text-2xl font-bold ml-1">To Do App</span>
      </div>
      <p className="text-[0.75rem] text-gray-700">
        Stay Organized and manage your tasks effeciently
      </p>
    </header>
  );
};

export default Head;

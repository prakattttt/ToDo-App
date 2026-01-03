import logo from "../assets/checklist.png"

const Head = () => {
  return (
    <header className="center flex-col m-8">
      <div className="center mb-2">
        <img src={logo} className="w-12" alt="logo" />
        <span className="text-2xl font-bold ml-1">Todo App</span>
      </div>
      <p className="text-[1rem] text-gray-500 text-center max-sm:text-[0.85rem]">
        Stay Organized and manage your tasks effeciently
      </p>
    </header>
  );
};

export default Head;

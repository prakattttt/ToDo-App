const Main = () => {
  return (
    <main>
        <div className="searchbar">
            <input type="search" name="task" id="task" />
            <button>+</button>
        </div>
        <div className="categories">
            <div className="box">All (3)</div>
            <div className="box">Active (1)</div>
            <div className="box">Completed (2)</div>
        </div>
        <div className="tasks">
            <ul>
                <li><input type="radio" name="task" id="task1" />Create a responsive design</li>
                <li><input type="radio" name="task" id="task2" />Add task filtering</li>
                <li><input type="radio" name="task" id="task3" />Implement Database</li>
            </ul>
        </div>
        <hr />
        <div className="bottom-main">
            <p>2 tasks remaining</p>
            <p>1 completed</p>
        </div>
    </main>
  )
}

export default Main
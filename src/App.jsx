import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai"; // Import the delete icon from React Icons
import "./App.css"
function App() {
  const [data, setData] = useState([]);
  const [newtask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/gettask")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/addtask", { todo: newtask })
      .then((arr) => setData(arr.data))
      .catch((error) => console.error("Error adding task:", error));
    setNewTask("");
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      (arr) => setData(arr.data)
    );
  };

  return (
    <div className="box">
      <center>
        <h1>TODO List</h1>
        <form className="task-form" action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter new task"
            value={newtask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <div className="task-list">
          {data.map((item) => (
            <div className="task-bar" key={item._id}>
              <h3>{item.todo}</h3>
              <button className="delete-btn" onClick={() => deleteHandler(item._id)}>
                <AiOutlineDelete /> 
              </button>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}

export default App;

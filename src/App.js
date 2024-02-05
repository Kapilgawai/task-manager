

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import "./style.css";
// import { AiOutlineDelete } from "react-icons/ai";
// import { BsCheckLg } from "react-icons/bs";

// function App() {
//   const [allTodos, setAllTodos] = useState([]);
//   const [newTodoTitle, setNewTodoTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [newDueDate, setNewDueDate] = useState("");
//   const [newPriority, setNewPriority] = useState("Low");
//   const [completedTodos, setCompletedTodos] = useState([]);
//   const [isCompletedScreen, setIsCompletedScreen] = useState(false);
//   const [editingTaskIndex, setEditingTaskIndex] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleAddNewToDo = () => {
//     if (newTodoTitle.trim() === "" || newDescription.trim() === "") {
//       alert("Title and description cannot be empty!");
//       return;
//     }

//     let newToDoObj = {
//       title: newTodoTitle,
//       description: newDescription,
//       dueDate: newDueDate,
//       priority: newPriority,
//     };

//     if (editingTaskIndex !== null) {
//       let updatedTodoArr = [...allTodos];
//       updatedTodoArr[editingTaskIndex] = newToDoObj;
//       setAllTodos(updatedTodoArr);
//       localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
//       setEditingTaskIndex(null);
//     } else {
//       let updatedTodoArr = [...allTodos];
//       updatedTodoArr.push(newToDoObj);
//       setAllTodos(updatedTodoArr);
//       localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
//     }

//     setNewTodoTitle("");
//     setNewDescription("");
//     setNewDueDate("");
//     setNewPriority("Low");
//   };

//   useEffect(() => {
//     let savedTodos = JSON.parse(localStorage.getItem("todolist"));
//     let savedCompletedToDos = JSON.parse(
//       localStorage.getItem("completedTodos")
//     );
//     if (savedTodos) {
//       setAllTodos(savedTodos);
//     }

//     if (savedCompletedToDos) {
//       setCompletedTodos(savedCompletedToDos);
//     }
//   }, []);

//   const handleToDoDelete = (index) => {
//     let reducedTodos = [...allTodos];
//     reducedTodos.splice(index, 1);
//     localStorage.setItem("todolist", JSON.stringify(reducedTodos));
//     setAllTodos(reducedTodos);
//   };

//   const handleCompletedTodoDelete = (index) => {
//     let reducedCompletedTodos = [...completedTodos];
//     reducedCompletedTodos.splice(index, 1);
//     localStorage.setItem(
//       "completedTodos",
//       JSON.stringify(reducedCompletedTodos)
//     );
//     setCompletedTodos(reducedCompletedTodos);
//   };

//   const handleComplete = (index) => {
//     const date = new Date();
//     var dd = date.getDate();
//     var mm = date.getMonth() + 1;
//     var yyyy = date.getFullYear();
//     var hh = date.getHours();
//     var minutes = date.getMinutes();
//     var ss = date.getSeconds();
//     var finalDate =
//       dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + minutes + ":" + ss;

//     let filteredTodo = {
//       ...allTodos[index],
//       completedOn: finalDate,
//     };

//     let updatedCompletedList = [...completedTodos, filteredTodo];
//     setCompletedTodos(updatedCompletedList);
//     localStorage.setItem(
//       "completedTodos",
//       JSON.stringify(updatedCompletedList)
//     );

//     handleToDoDelete(index);
//   };

//   const filteredTodos = allTodos.filter((todo) =>
//     todo.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="App">
//       <h1>TASK MANAGER</h1>

//       <div className="todo-wrapper">
//         <div className="todo-input">
//           <div className="todo-input-item">
//             <label>Title:</label>
//             <input
//               type="text"
//               value={newTodoTitle}
//               onChange={(e) => setNewTodoTitle(e.target.value)}
//               placeholder="What's the title of your Task?"
//             />
//           </div>
//           <div className="todo-input-item">
//             <label>Description:</label>
//             <input
//               type="text"
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               placeholder="What's the description of your Task?"
//             />
//           </div>
//           <div className="todo-input-item">
//             <label>Due Date:</label>
//             <input
//               type="text"
//               value={newDueDate}
//               onChange={(e) => setNewDueDate(e.target.value)}
//               placeholder="Enter due date..."
//             />
//           </div>
//           <div className="todo-input-item">
//             <label>Priority:</label>
//             <select
//               value={newPriority}
//               onChange={(e) => setNewPriority(e.target.value)}>
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
//           </div>
//           <div className="todo-input-item">
//             <button
//               className="primary-btn"
//               type="button"
//               onClick={handleAddNewToDo}>
//               {editingTaskIndex !== null ? "Save" : "Add"}
//             </button>
//           </div>
//         </div>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="btn-area">
//           <button
//             className={`secondaryBtn ${
//               isCompletedScreen === false && "active"
//             }`}
//             onClick={() => setIsCompletedScreen(false)}>
//             Task
//           </button>
//           <button
//             className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
//             onClick={() => setIsCompletedScreen(true)}>
//             Completed
//           </button>
//         </div>
//         <div className="todo-list">
//           {isCompletedScreen === false &&
//             filteredTodos.map((item, index) => (
//               <div className="todo-list-item" key={index}>
//                 <div>
//                   {editingTaskIndex === index ? (
//                     <>
//                       <input
//                         type="text"
//                         value={newTodoTitle}
//                         onChange={(e) => setNewTodoTitle(e.target.value)}
//                         placeholder="Edit title..."
//                       />
//                       <input
//                         type="text"
//                         value={newDescription}
//                         onChange={(e) => setNewDescription(e.target.value)}
//                         placeholder="Edit description..."
//                       />
//                     </>
//                   ) : (
//                     <>
//                       <h3>{item.title}</h3>
//                       <p>{item.description}</p>
//                       <p>
//                         <b>Due Date:</b> {item.dueDate}
//                       </p>
//                       <p>
//                         <b>Priority:</b> {item.priority}
//                       </p>
//                     </>
//                   )}
//                 </div>
//                 <div>
//                   <AiOutlineDelete
//                     title="Delete?"
//                     className="icon"
//                     onClick={() => handleToDoDelete(index)}
//                   />
//                   <BsCheckLg
//                     title="Completed?"
//                     className="check-icon"
//                     onClick={() => handleComplete(index)}
//                   />
//                   <button
//                     className="edit-btn"
//                     onClick={() => setEditingTaskIndex(index)}>
//                     {editingTaskIndex === index ? "Save" : "Edit"}
//                   </button>
//                 </div>
//               </div>
//             ))}

//           {isCompletedScreen === true &&
//             completedTodos.map((item, index) => (
//               <div className="todo-list-item" key={index}>
//                 <div>
//                   <h3>{item.title}</h3>
//                   <p>{item.description}</p>
//                   <p>
//                     <i>Completed at: {item.completedOn}</i>
//                   </p>
//                 </div>
//                 <div>
//                   <AiOutlineDelete
//                     className="icon"
//                     onClick={() => handleCompletedTodoDelete(index)}
//                   />
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from "react";
import "./App.css";
import "./style.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState("Low");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCompletion, setFilterCompletion] = useState("All");

  const handleAddNewToDo = () => {
    if (newTodoTitle.trim() === "" || newDescription.trim() === "") {
      alert("Title and description cannot be empty!");
      return;
    }

    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
      dueDate: newDueDate,
      priority: newPriority,
    };

    if (editingTaskIndex !== null) {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr[editingTaskIndex] = newToDoObj;
      setAllTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      setEditingTaskIndex(null);
    } else {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newToDoObj);
      setAllTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    }

    setNewTodoTitle("");
    setNewDescription("");
    setNewDueDate("");
    setNewPriority("Low");
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedToDos = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);

  const handleToDoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  const handleComplete = (index) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + minutes + ":" + ss;

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    let updatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedList)
    );

    handleToDoDelete(index);
  };

  const filteredTodos = allTodos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((todo) =>
      filterPriority === "All" ? true : todo.priority === filterPriority
    )
    .filter((todo) =>
      filterCompletion === "All"
        ? true
        : isCompletedScreen
        ? true
        : !completedTodos.find((ct) => ct.title === todo.title)
    );

  return (
    <div className="App">
      <h1>TASK MANAGER</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What's the title of your Task?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of your Task?"
            />
          </div>
          <div className="todo-input-item">
            <label>Due Date:</label>
            <input
              type="text"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              placeholder="Enter due date..."
            />
          </div>
          <div className="todo-input-item">
            <label>Priority:</label>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}>
              {editingTaskIndex !== null ? "Save" : "Add"}
            </button>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-bar">
          <label>Filter by Priority:</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <label>Filter by Completion:</label>
          <select
            value={filterCompletion}
            onChange={(e) => setFilterCompletion(e.target.value)}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompletedScreen(false)}>
            Task
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompletedScreen(true)}>
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompletedScreen === false &&
            filteredTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  {editingTaskIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={newTodoTitle}
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                        placeholder="Edit title..."
                      />
                      <input
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Edit description..."
                      />
                    </>
                  ) : (
                    <>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>
                        <b>Due Date:</b> {item.dueDate}
                      </p>
                      <p>
                        <b>Priority:</b> {item.priority}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete(index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                  />
                  <button
                    className="edit-btn"
                    onClick={() => setEditingTaskIndex(index)}>
                    {editingTaskIndex === index ? "Save" : "Edit"}
                  </button>
                </div>
              </div>
            ))}

          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <i>Completed at: {item.completedOn}</i>
                  </p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

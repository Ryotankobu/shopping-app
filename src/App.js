import React, { useState, useEffect } from "react";
import AddListForm from "./AddListForm";
import "./App.css";
import ListContents from "./ListContents";

function App() {
  // const [toDoLists, setToDoLists] = useState([])
  const [toDoLists, setToDoLists] = useState(() => {
    const savedTasks = localStorage.getItem("toDoLists");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("toDoLists", JSON.stringify(toDoLists));

  }, [toDoLists])

  const [selectedFilter, setSelectedFilter] = useState("all")

  const addList = (newList) => {
    setToDoLists((prev) => [...prev, newList])
  }

   const removeList = (removingId) => {
     setToDoLists((prevToDoLists) => 
      prevToDoLists.filter(
        (examiningItem) => examiningItem.id !== removingId
      )
    )
   };

 const toggleCheckbox = (id, key) => {
   setToDoLists((prev) =>
     prev.map((item) =>
       item.id === id ? { ...item, [key]: !item[key] } : item
     )
   );
 };

 const displayedLists = toDoLists.filter((item) => {
  if (selectedFilter === "notPurchased") return !item.purchased;
  if (selectedFilter === "notPacked") return item.purchased && !item.packed;
  if (selectedFilter === "completed") return item.purchased && item.packed;
  return true;
 })



  return (
    <div className="app_body">
      <header>
        <h1 className="app_body_header">日本での買い物リスト</h1>
      </header>
      <div className="app_body_main">
        <AddListForm addList={addList} />
        <div className="filter_wrapper">
          <label>
            <input
              type="radio"
              name="filter"
              value="all"
              checked={selectedFilter === "all"}
              onChange={() => setSelectedFilter("all")}
            />
            全部
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="purchased"
              checked={selectedFilter === "notPurchased"}
              onChange={() => setSelectedFilter("notPurchased")}
            />
            買ってない
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="notPacked"
              checked={selectedFilter === "notPacked"}
              onChange={() => setSelectedFilter("notPacked")}
            />
            入れてない
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="completed"
              checked={selectedFilter === "completed"}
              onChange={() => setSelectedFilter("completed")}
            />
            完了

          </label>
        </div>
        <ul className="app_body_list">
          {displayedLists.map((toDoList) => (
            <ListContents
              key={toDoList.id}
              toDoList={toDoList}
              removeList={removeList}
              toggleCheckbox={toggleCheckbox}
            />
          ))}
        </ul>
        <ListContents />
      </div>
    </div>
  );
}

export default App;

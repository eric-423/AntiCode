import React, { useEffect, useState } from "react";
import "./Task.css";
import ToolBar from "./tool_bar/ToolBar";
import Table from "./table/Table";

const Task = () => {
  const [refreshData,setRefreshData] = useState(false)
   const listTitle = [
    {
      name: "No.",
      column: 0.5,
    },
    {
      name: "Created At",
      column: 2,
    },
    {
      name: "Completed At",
      column: 2,
    },
    {
      name: "Description",
      column: 1.75,
    },
    {
      name: "Task Type",
      column: 1,
    },
    {
      name: "Task Status",
      column: 1,
    },
    {
      name: "",
      column: 0.5,
    },
  ];

  return (
    <div className="plant-container">
      <ToolBar setRefreshData={setRefreshData} />
      <Table listTitle={listTitle} refreshData={refreshData} setRefreshData={setRefreshData}/>
    </div>
  );
};

export default Task;

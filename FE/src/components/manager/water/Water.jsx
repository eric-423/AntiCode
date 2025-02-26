import React, { useEffect, useState } from "react";
import "./Water.css";
import ToolBar from "./tool_bar/ToolBar";
import Table from "./table/Table";

const Water = () => {
  const [refreshData,setRefreshData] = useState(false)
   const listTitle = [
    {
      name: "No.",
      column: 1,
    },
    {
      name: "Name",
      column: 2,
    },
    {
      name: "Purity",
      column: 1,
    },
    {
      name: "PH Level",
      column: 1,
    },
    {
      name: "Volume Available",
      column: 1,
    },
    {
      name: "",
      column: 1,
    },
  ];

  return (
    <div className="plant-container">
      <ToolBar setRefreshData={setRefreshData} />
      <Table listTitle={listTitle} refreshData={refreshData} setRefreshData={setRefreshData}/>
    </div>
  );
};

export default Water;

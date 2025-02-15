import React, { useEffect, useState } from "react";
import "./Plant.css";
import ToolBar from "./tool_bar/ToolBar";
import Table from "./table/Table";

const Plant = () => {
  const [refreshData,setRefreshData] = useState(false)
   const listTitle = [
    {
      name: "No.",
      column: 0.5,
    },
    {
      name: "Name",
      column: 1,
    },
    {
      name: "Characteristics",
      column: 1.5,
    },
    {
      name: "Description",
      column: 1.75,
    },
    {
      name: "Species",
      column: 0.75,
    },
    {
      name: "Attracts",
      column: 0.75,
    },
    {
      name: "Hardiness",
      column: 0.75,
    },
    {
      name: "Plant Type",
      column: 1,
    },
    {
      name: "Heat Zone",
      column: 0.75,
    },
    {
      name: "Size",
      column: 0.5,
    },
    {
      name: "Price",
      column: 0.75,
    },
    {
      name: "Is Seed",
      column: 0.5,
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

export default Plant;

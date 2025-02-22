import React, { useState } from "react";
import "./Type.css";
import NewType from "./new_type/NewType"
import Table from "./table/Table";

const Type = () => {
  const [refreshData,setRefreshData] = useState(false);
  const [updateItem,setUpdateItem] = useState()
  return (
    <div className="plant-type-content">
      <div className="plant-type-table-content">
        <Table refreshData={refreshData} setRefreshData={setRefreshData} setUpdateItem={setUpdateItem}/>
      </div>
      <div className="plant-type-addition">
        <div className="plant-type-addition-form">
          <NewType setRefreshData={setRefreshData} updateItem={updateItem} setUpdateItem={setUpdateItem}/>
        </div>  
      </div>
    </div>
  );
};

export default Type;

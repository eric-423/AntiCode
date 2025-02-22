import React, { useState } from "react";
import "./Status.css";
import NewStatus from "./new_status/NewStatus"
import Table from "./table/Table";

const Status = () => {
  const [refreshData,setRefreshData] = useState(false);
  const [updateItem,setUpdateItem] = useState()
  return (
    <div className="plant-type-content">
      <div className="plant-type-table-content">
        <Table refreshData={refreshData} setRefreshData={setRefreshData} setUpdateItem={setUpdateItem}/>
      </div>
      <div className="plant-type-addition">
        <div className="plant-type-addition-form">
          <NewStatus setRefreshData={setRefreshData} updateItem={updateItem} setUpdateItem={setUpdateItem}/>
        </div>  
      </div>
    </div>
  );
};

export default Status;

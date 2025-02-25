import { useState } from "react";
import "./EquipmentType.css";
import Addition from "./addition/Addition";
import Table from "./table/Table";

const EquipmentType = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [updateItem, setUpdateItem] = useState()
  return (
    <div className="plant-type-content">
      <div className="plant-type-table-content">
        <Table refreshData={refreshData} setRefreshData={setRefreshData} setUpdateItem={setUpdateItem} />
      </div>
      <div className="plant-type-addition">
        <div className="plant-type-addition-form">
          <Addition setRefreshData={setRefreshData} updateItem={updateItem} setUpdateItem={setUpdateItem} />
        </div>
      </div>
    </div>
  );
};

export default EquipmentType;

import { useState } from "react";
import "./Equipment.css";
import ToolBar from "./tool_bar/ToolBar";
import Table from "./table/Table";

const Equipment = () => {
    const [refreshData, setRefreshData] = useState(false)
    const listTitle = [
        {
            name: "ID.",
            column: 0.2,
        },
        {
            name: "Name",
            column: 0.6,
        },
        {
            name: "Description",
            column: 1,
        },
        {
            name: "Type",
            column: 0.6
        },
        {
            name: "Quantity",
            column: 0.3,
        },
        {
            name: "In used",
            column: 0.3,
        },
        {
            name: "Deleted",
            column: 0.3,
        },
        {
            name: "Damaged",
            column: 0.5,
        },
        {
            name: "",
            column: 0.4,
        }
    ];

    return (
        <div className="plant-container">
            <ToolBar setRefreshData={setRefreshData} />
            <Table listTitle={listTitle} refreshData={refreshData} />
        </div>
    );
};

export default Equipment;

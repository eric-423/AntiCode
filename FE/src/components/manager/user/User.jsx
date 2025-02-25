import { useState } from "react";
import "./user.css";
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
            column: 0.4,
        },
        {
            name: "Email User",
            column: 0.7,
        },
        {
            name: "Role",
            column: 0.3,
        },
        {
            name: "Address",
            column: 0.6
        },
        {
            name: "Date of birth",
            column: 0.3,
        },
        {
            name: "Phone Number",
            column: 0.5,
        },
        {
            name: "Is Busy",
            column: 0.3,
        },
        {
            name: "",
            column: 0.1,
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

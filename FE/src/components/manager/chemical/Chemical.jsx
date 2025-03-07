import { useState } from "react";
import "./Chemical.css";
import ToolBar from "./tool_bar/ToolBar";
import Table from "./table/Table";
// import Chat from "../../chat/Chat";

const Chemical = () => {
    const [refreshData, setRefreshData] = useState(false)
    const listTitle = [
        {
            name: "ID.",
            column: 0.5,
        },
        {
            name: "Name",
            column: 1,
        },
        {
            name: "Description",
            column: 1.5,
        },
        {
            name: "Manufacturing date",
            column: 1,
        },
        {
            name: "Expiration date",
            column: 1,
        },
        {
            name: "Volumne Available",
            column: 0.5,
        },
        {
            name: "Chemical Type",
            column: 0.5,
        },
        {
            name: "Edit",
            column: 0.5,
        },
    ];

    return (
        <div className="plant-container">
            <ToolBar setRefreshData={setRefreshData} />
            <Table listTitle={listTitle} refreshData={refreshData} />
            {/* <Chat /> */}
        </div>
    );
};

export default Chemical;

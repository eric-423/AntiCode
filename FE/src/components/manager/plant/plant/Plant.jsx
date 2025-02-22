import {useState} from "react";
import "./Plant.css";
import ToolBar from "./tool_bar/ToolBar";
import Table from "./table/Table";

const Plant = () => {
    const [refreshData, setRefreshData] = useState(false)
    const listTitle = [
        {
            name: "No.",
            column: 0.5,
        },
        {
            name: "Name",
            column: 1.5,
        },
        {
            name: "Characteristics",
            column: 1.75,
        },
        {
            name: "Description",
            column: 2.5,
        },
        {
            name: "Soil PH",
            column: 1.5,
        },
        {
            name: "Water Need",
            column: 1.5,
        },
        {
            name: "Quantity",
            column: 1,
        },
        {
            name: "Price",
            column: 1.25,
        },
        {
            name: "",
            column: 0.5,
        },
    ];

    return (
        <div className="plant-container">
            <ToolBar setRefreshData={setRefreshData}/>
            <Table listTitle={listTitle} refreshData={refreshData}/>
        </div>
    );
};

export default Plant;

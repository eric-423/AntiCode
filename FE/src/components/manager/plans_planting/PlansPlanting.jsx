import React from "react";
import ToolBar from "./tool_bar/ToolBar";
import Content from "./content/Content";
import AddPlans from "./modal/AddPlans";
const PlansPlanting = () => {
  return (
    <div className="plant-container plans-planting-container">
      <ToolBar />
      <Content />
      <AddPlans />
    </div>
  );
};

export default PlansPlanting;

import React, { useState } from "react";
import ToolBar from "./tool_bar/ToolBar";
import Content from "./content/Content";
import AddPlans from "./modal/AddPlans";
const PlansPlanting = () => {
  const [showModal,setShowModal] = useState(false)

  return (
    <div className="plant-container plans-planting-container">
      <ToolBar  setShowModal={setShowModal}/>
      <Content  />
      {showModal && <AddPlans setShowModal={setShowModal}/>}
    </div>
  );
};

export default PlansPlanting;

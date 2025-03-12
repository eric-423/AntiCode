import React from "react";
import Report from "./report/Report";
import Content from "./content/Content";
import './PlansPlanting.css'

const PlansPlanting = () => {
  return (
    <div className="plant-container plans-planting-container">
      <Report />
      <Content />
    </div>
  );
};

export default PlansPlanting;

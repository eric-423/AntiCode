import React from "react";
import "./ContainerLocation.css";

const ContainerLocation = () => {

  return (
    <div className="mt-4 container-location-to-planting">
      <div className="d-flex head-container-location-to-planting">
        <h6>Choose Location To Planting</h6>
    
      </div>
      <div className="location-container-location-to-planting">
        <div className="location-container-flex">
          {Array.from({ length: 60 }, (_, i) => (
            <div></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContainerLocation;

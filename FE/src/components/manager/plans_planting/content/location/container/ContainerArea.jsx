import React from "react";
import "./ContainerArea.css";

const ContainerArea = () => {
  return (
    <div className="mt-4">
      <div className="d-flex head-container-location-to-planting area-container-area-to-planting-h6">
        <h6>Choose Area</h6>
      </div>
      <div className="location-container-location-to-planting area-container-area-to-planting">
        <div className="location-container-flex">
          {Array.from({ length: 10 }, (_, i) => (
            <div className="area-card-to-planting">
                <h6>Area Name</h6>
                <p>Area: 200 (m2)</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContainerArea;

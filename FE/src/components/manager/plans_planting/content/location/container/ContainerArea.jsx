import React, { useEffect, useState } from "react";
import "./ContainerArea.css";
import axios from "axios";
import BASE from "../../../../../../constant/base";

const ContainerArea = ({ farmId, setAreaChoose }) => {
  const [area, setArea] = useState([]);
  const [areaActive, setAreaActive] = useState();

  const handleFetchArea = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/area/farm/${farmId}`);
      if (!response || response.status !== 200) throw new Error();
      setArea(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleActiveArea = (id) => {
    setAreaActive(id);
    setAreaChoose(id)
  };

  useEffect(() => {
    handleFetchArea();
  }, [farmId]);

  return (
    <div className="mt-4">
      <div className="d-flex head-container-location-to-planting area-container-area-to-planting-h6">
        <h6>Choose Area</h6>
      </div>
      <div className="location-container-location-to-planting area-container-area-to-planting">
        <div className="location-container-flex">
          {area &&
            area.map((item) => (
              <div
                className="area-card-to-planting"
                onClick={() => handleActiveArea(item.areaId)}
                style={{
                  backgroundColor:
                    areaActive === item.areaId ? "#fef7ef" : null,
                display: "block"
                }}
              >
                <h6
                  style={{
                    color: areaActive === item.areaId ? "#f28705" : null,
                  }}
                >
                  {item.areaName}
                </h6>
                <p
                  style={{
                    color: areaActive === item.areaId ? "#EDA650" : null,
                  }}
                >
                  Area: {item.areaLength * item.areaWidth} (m2)
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContainerArea;

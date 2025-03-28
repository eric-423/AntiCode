import React, { useEffect, useState } from "react";
import "./ContainerLocation.css";
import axios from "axios";
import BASE from "../../../../../../constant/base";

const ContainerLocation = ({ areaChoose }) => {
  const [location, setLocation] = useState([]);
  const [locationChoose, setLocationChoose] = useState([]);

  const handleChooseLocation = (id) => {
    if (locationChoose.includes(id)) {
      setLocationChoose(locationChoose.filter((item) => item != id));
    } else {
      setLocationChoose([...locationChoose, id]);
    }
  };

  const handleFetchLocation = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/location/area/${areaChoose}`
      );
      if (!response || response.status !== 200) throw new Error();
      setLocation(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (areaChoose) {
      handleFetchLocation();
    }
  }, [areaChoose]);

  return (
    <div className="mt-4 container-location-to-planting">
      <div className="d-flex head-container-location-to-planting">
        <h6>Choose Location To Planting</h6>
      </div>
      <div className="location-container-location-to-planting">
        <div className="location-container-flex">
          {location &&
            location.map((item) => (
              <div
                key={item.locationId}
                onClick={() => handleChooseLocation(item.locationId)}
                style={{
                  backgroundColor: locationChoose.includes(item.locationId)
                    ? "#fef7ef"
                    : null,
                  color: locationChoose.includes(item.locationId)
                    ? "#f28705"
                    : null,
                }}
              >
                {item.locationName}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContainerLocation;

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import BASE from "../../../../../constant/base";
import axios from "axios";
import "./ChooseLocation.css";

const ChooseLocation = ({ setLocation, location, area }) => {
  const [locationList, setLocationList] = useState();
  const handleFetchLocationList = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/location/area/${area?.areaId}`
      );
      if (!response || response.status !== 200) throw new Error();
      setLocationList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocation = (item) => {
    const list = [...location];
    let _list = [];
    if (list.includes(item)) {
      _list = list.filter((_item) => _item !== item);
    } else {
      _list = [...list, item];
    }
    setLocation(_list);
  };

  useEffect(() => {
    if (!locationList) {
      handleFetchLocationList();
    }
  }, []);

  return (
    <Form.Group className="mb-2 group-3-column-create-plant">
      <Form.Label className="text-label-login text-label-create-plans">
        Locations
      </Form.Label>
      <div className="scroll-bar-container-choose mt-3 mb-4">
        {locationList &&
          locationList.map((item) => (
            <div
              className={`plans-location-container ${
                location && location?.includes(item) ? "is-active" : null
              }`}
              onClick={() => handleLocation(item)}
            >
              <span
                style={{
                  color: item?.planted ? "rgba(0,0,0,0.08)" : null,
                }}
              >
                {item?.locationName}
              </span>
            </div>
          ))}
      </div>
    </Form.Group>
  );
};

export default ChooseLocation;

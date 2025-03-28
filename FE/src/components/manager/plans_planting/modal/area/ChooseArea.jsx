import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import BASE from "../../../../../constant/base";
import "./ChooseArea.css";

const ChooseArea = ({ farm, setArea, area }) => {
  const [areaList, setAreaList] = useState();
  const handleFetchAreaList = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/area/farm/${farm?.farmId}`
      );
      if (!response || response.status !== 200) throw new Error();
      setAreaList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!areaList) {
      handleFetchAreaList();
    }
  }, []);

  return (
    <Form.Group className="mb-2 group-3-column-create-plant">
      <Form.Label className="text-label-login text-label-create-plans">
        Areas
      </Form.Label>
      <div className="scroll-bar-container-choose mt-3 mb-4">
        {areaList &&
          areaList.map((item) => (
            <div
              className="plans-area-card"
              onClick={() => setArea(item)}
              style={{
                backgroundColor:
                  area?.areaId === item?.areaId ? "rgba(242,135,5,0.1)" : "",
              }}
            >
              <span
                style={{
                  color:
                    area?.areaId === item?.areaId ? "rgba(242,135,5,0.7)" : "",
                }}
              >
                {item?.areaName}
              </span>
              <p
                className="mt-3"
                style={{
                  color:
                    area?.areaId === item?.areaId ? `rgba(242,135,5,1)` : "",
                }}
              >
                Location Available:{" "}
                <span
                  style={{
                    color:
                      area?.areaId === item?.areaId ? `rgba(242,135,5,1)` : "",
                  }}
                >
                  {" "}
                  {item?.locationAvailable}/{item?.locations}
                </span>
              </p>
            </div>
          ))}
      </div>
    </Form.Group>
  );
};

export default ChooseArea;

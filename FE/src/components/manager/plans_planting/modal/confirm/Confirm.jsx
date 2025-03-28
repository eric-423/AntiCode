import React, { useEffect, useState } from "react";
import "./Confirm.css";
import { Form } from "react-bootstrap";
import axios from "axios";
import BASE from "../../../../../constant/base";
import CALENDAR from "../../../../../constant/calendar";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../constant/localStorage";

const Confirm = ({ plant, area, farm, location }) => {
  const [process, setProcess] = useState();
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])

  const handleFetchProcess = async () => {
    try {
      const res = await axios.get(`${BASE.BASE_URL}/planting-process/plant/${plant?.plantId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!res || res.status !== 200) throw new Error();
      const list = res.data;
      let _list = [];
      list &&
        Array.isArray(list) &&
        list.forEach((item) => {
          const _proccess = {
            plantingProcessId: item?.plantingProcessId,
            plantingProcessName: item?.plantingProcessName,
            type: CALENDAR.LIST_TYPE.DAILY,
            startDate: "",
          };
          _list.push(_proccess);
        });
      setProcess(_list);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeType = (type, index) => {
    const list = [...process];
    const item = list[index]
    item.type = type;
    list[index] = item;
    setProcess(list)
  }

  useEffect(() => {
    handleFetchProcess();
  }, []);

  return (
    <div className="plans-confirm-container">
      <div className="plans-confirm-plant-farm-area">
        <div>
          <span>Plant</span>
          <p>{plant?.plantName}</p>
        </div>
        <div>
          <span>Farm</span>
          <p>{farm?.farmName}</p>
        </div>
        <div className="plans-confirm-grid-column-3">
          <span>Area</span>
          <p>{area?.areaName}</p>
        </div>
        <div className="plans-confirm-grid-column-3">
          <span>Location</span>
          <p>
            {location?.map((item) => (
              <span>{item?.locationName}, </span>
            ))}
          </p>
        </div>
        <div>
          <span>Start Havert</span>
          <Form.Control
            className="input-login input-addition input-name-create-plant"
            type="date"
          />
        </div>
        <div>
          <span>End Havert</span>
          <Form.Control
            className="input-login input-addition input-name-create-plant"
            type="date"
          />
        </div>
        <div className="plans-confirm-grid-column-3">
          <span>Process Suggesstion</span>
          <div className="process-plant-plans-container">
            {process &&
              process.map((item, index) => (
                <div>
                  <span>{index + 1}</span>
                  <p>{item?.plantingProcessName}</p>
                  <div>
                    <Form.Select
                      onChange={(event) => handleChangeType(event.target.value, index)}
                      className="input-login input-addition input-plant-type-create-plant input-select-plant-plans">
                      {Object.values(CALENDAR.LIST_TYPE).map((item) => (
                        <option value={item.plantingProcessId}>{item}</option>
                      ))}
                    </Form.Select>
                  </div>
                  {item.type !== CALENDAR.LIST_TYPE.DAILY && <div>
                    <Form.Control
                      className="input-login input-addition input-name-create-plant input-select-plant-plans"
                      type="date"
                    />
                  </div>}

                </div>
              ))}
            <div>
              <div className="add-process-plans">Add</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

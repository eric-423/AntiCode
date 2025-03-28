import React, { useEffect, useState } from "react";
import "./Confirm.css";
import { Form } from "react-bootstrap";
import axios from "axios";
import BASE from "../../../../../constant/base";
import CALENDAR from "../../../../../constant/calendar";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../constant/localStorage";
import Button from "../../../../common/button/Button";

const Confirm = ({ plant, area, farm, location }) => {
  const [process, setProcess] = useState();
  const [auth, setAuth] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION,
    ""
  );
  const [token, setToken] = useState("");
  const [add, setAdd] = useState(false);
  const [startHavert, setStartHavert] = useState();
  const [endHavert, setEndHavert] = useState();
  const [newTask, setNewTask] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(atob(auth));
  }, [auth]);
  const handleFetchProcess = async () => {
    try {
      const res = await axios.get(
        `${BASE.BASE_URL}/planting-process/plant/${plant?.plantId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    const item = list[index];
    item.type = type;
    list[index] = item;
    setProcess(list);
  };

  const handleEnterNewTask = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const _proccess = {
        plantingProcessId: new Date().getMilliseconds(),
        plantingProcessName: newTask,
        type: CALENDAR.LIST_TYPE.DAILY,
        startDate: "",
      };
      setProcess([...process, _proccess]);
      setAdd(false);
      console.log("ppapspaspas");
    }
  };

  const handleCreatePlans = async () => {
    setLoading(true);
    try {
      const plansID = new Date().getTime();
      await Promise.all(
        location?.map(async (item) => {
          try {
            const data = {
              locationId: item?.locationId,
              plantId: plant?.plantId,
              startDate: startHavert,
              endDate: endHavert,
              plans: plansID,
            };
            const res = await axios.post(
              `${BASE.BASE_URL}/planting-location`,
              data
            );
            if (!res || res.status !== 201) throw new Error();
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchProcess();
  }, []);

  return (
    <>
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
              onChange={(event) => setStartHavert(event.target.value)}
            />
          </div>
          <div>
            <span>End Havert</span>
            <Form.Control
              className="input-login input-addition input-name-create-plant"
              type="date"
              onChange={(event) => setEndHavert(event.target.value)}
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
                        onChange={(event) =>
                          handleChangeType(event.target.value, index)
                        }
                        className="input-login input-addition input-plant-type-create-plant input-select-plant-plans"
                      >
                        {Object.values(CALENDAR.LIST_TYPE).map((item) => (
                          <option value={item.plantingProcessId}>{item}</option>
                        ))}
                      </Form.Select>
                    </div>
                    {item.type !== CALENDAR.LIST_TYPE.DAILY && (
                      <div>
                        <Form.Control
                          className="input-login input-addition input-name-create-plant input-select-plant-plans"
                          type="date"
                        />
                      </div>
                    )}
                  </div>
                ))}
              {add && (
                <div>
                  <span>
                    {process?.length === undefined ? 1 : process?.length + 1}
                  </span>
                  <div>
                    <Form.Control
                      className="input-login input-addition input-name-create-plant"
                      type="text"
                      placeholder="Task name"
                      onChange={(event) => setNewTask(event.target.value)}
                      onKeyDown={(event) => handleEnterNewTask(event)}
                    />
                  </div>
                  <div></div>
                </div>
              )}
              <div>
                <div className="add-process-plans" onClick={() => setAdd(true)}>
                  Add
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="plans-confirm-plant-farm-area text-login-button-plans">
          <Button
            text={"Create"}
            textColor="#FFFFFF"
            handleOnClick={() => handleCreatePlans()}
            isLoading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Confirm;

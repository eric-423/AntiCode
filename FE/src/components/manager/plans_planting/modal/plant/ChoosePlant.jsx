import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./ChoosePlant.css";
import axios from "axios";
import BASE from "../../../../../constant/base";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../constant/localStorage";

const ChoosePlant = ({ setPlant, plant }) => {
  const [plantList, setPlantList] = useState();
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])


  const handleFetchPlantList = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/plant`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!response || response.status !== 200) throw new Error();
      console.log(response.data.data);
      setPlantList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!plantList) {
      handleFetchPlantList();
    }
  }, []);

  return (
    <Form.Group className="mb-2 group-3-column-create-plant">
      <Form.Label className="text-label-login text-label-create-plans">
        Plants
      </Form.Label>
      <div className="scroll-bar-container-choose mt-3 mb-4">
        {plantList &&
          plantList.map((item) => (
            <div
              onClick={() => setPlant(item)}
              style={{
                backgroundColor:
                  plant?.plantId === item?.plantId ? "rgba(242,135,5,0.1)" : "",
              }}
            >
              <span
                style={{
                  color:
                    plant?.plantId === item?.plantId
                      ? "rgba(242,135,5,0.7)"
                      : "",
                }}
              >
                {item?.plantName}
              </span>
              <p
                style={{
                  color:
                    plant?.plantId === item?.plantId
                      ? "rgba(242,135,5,1)"
                      : "",
                }}
              >
                {item?.description}
              </p>
            </div>
          ))}
      </div>
    </Form.Group>
  );
};

export default ChoosePlant;

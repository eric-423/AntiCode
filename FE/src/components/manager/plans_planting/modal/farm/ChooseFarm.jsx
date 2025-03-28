import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import BASE from "../../../../../constant/base";
import './ChooseFarm.css'
import LOCALSTORAGE from "../../../../../constant/localStorage";
import useLocalStorage from "use-local-storage";


const ChooseFarm = ({ setFarm, farm }) => {
  const [farmList, setFarmList] = useState();
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])
  const handleFetchFarmList = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/farm`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!response || response.status !== 200) throw new Error();
      setFarmList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!farmList) {
      handleFetchFarmList();
    }
  }, []);


  return (
    <Form.Group className="mb-2 group-3-column-create-plant">
      <Form.Label className="text-label-login text-label-create-plans">
        Farms
      </Form.Label>
      <div className="scroll-bar-container-choose mt-3 mb-4">
        {farmList && farmList.map((item) => (
          <div onClick={() => setFarm(item)}
            style={{
              backgroundColor:
                farm?.farmId === item?.farmId ? "rgba(242,135,5,0.1)" : "",
            }}
          >
            <span className="farm-name-container-choose-farm"
              style={{
                color:
                  farm?.farmId === item?.farmId
                    ? "rgba(242,135,5,0.7)"
                    : "",
              }}
            >
              {item?.farmName}
            </span>
            <p className="farm-address-container-choose-farm"
              style={{
                color:
                  farm?.farmId === item?.farmId
                    ? "rgba(242,135,5,1)"
                    : "",
              }}
            > {item?.farmAddress}</p>
          </div>
        ))}
      </div>
    </Form.Group>
  );
};

export default ChooseFarm;

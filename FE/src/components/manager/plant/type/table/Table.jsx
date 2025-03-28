import React, { useEffect, useState } from "react";
import "./Table.css";
import CardPlantType from "./card/CardPlantType";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../constant/localStorage";


const Table = ({ refreshData, setRefreshData, setUpdateItem }) => {
  const [data, setData] = useState()
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])

  const handleFetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-type`, {
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleFetchData()
  }, [refreshData])

  return (
    <div className="table-plant-type">
      {data && Array.isArray(data) && data.map((item, index) => (
        <CardPlantType item={item} key={index} setRefreshData={setRefreshData} setUpdateItem={setUpdateItem} />
      ))}
    </div>
  );
};

export default Table;

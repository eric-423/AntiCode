import { useEffect, useState } from "react";
import "./Table.css";
import CardPlantType from "./card/CardPlantType";
import { PropTypes } from 'prop-types';
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../constant/localStorage";

const Table = ({ refreshData, setRefreshData, setUpdateItem }) => {
  const [data, setData] = useState()
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth]);


  const handleFetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/chemical-type`,
        {

          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(data)
  useEffect(() => {
    handleFetchData()
  }, [refreshData])

  return (
    <div className="table-plant-type">
      {data && Array.isArray(data) && data.map((item) => (
        <CardPlantType key={item.id} item={item} setRefreshData={setRefreshData} setUpdateItem={setUpdateItem} />
      ))}
    </div>
  );
};
Table.propTypes = {
  refreshData: PropTypes.bool.isRequired,
  setRefreshData: PropTypes.func.isRequired,
  setUpdateItem: PropTypes.func.isRequired,
};

export default Table;

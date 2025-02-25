import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./Table.css";
import CardPlantType from "./card/CardPlantType";


const Table = ({ refreshData, setRefreshData, setUpdateItem }) => {
  const [data, setData] = useState()
  const handleFetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/equipment-type/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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

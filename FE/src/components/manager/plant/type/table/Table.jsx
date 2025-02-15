import React, { useEffect, useState } from "react";
import "./Table.css";
import CardPlantType from "./card/CardPlantType";
import axios from "axios";


const Table = ({refreshData,setRefreshData, setUpdateItem}) => {
  const [data,setData] = useState()
  const handleFetchData = async () => {
    try{
      const  response = await axios.get(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-type`);
      if(response.status === 200){
        setData(response.data.data)
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    handleFetchData()
  },[refreshData])

  return (
    <div className="table-plant-type">
        {data && Array.isArray(data) && data.map((item) => (
          <CardPlantType item={item} setRefreshData={setRefreshData} setUpdateItem={setUpdateItem} />
        ))}
    </div>  
  );
};

export default Table;

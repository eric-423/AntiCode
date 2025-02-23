import React, { useEffect, useState } from "react";
import "./Table.css";
import Body from "./body/Body";
import axios from "axios";


const Table = ({refreshData,setRefreshData, setUpdateItem}) => {
  const [data,setData] = useState()
  const handleFetchData = async () => {
    try{
      const  response = await axios.get(`${import.meta.env.VITE_REACT_APP_END_POINT}/task-type`);
      console.log(response)
      if(response.status === 200){
        setData(response.data)
      }
      console.log(response.data)
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
          <Body item={item} setRefreshData={setRefreshData} setUpdateItem={setUpdateItem} />
        ))}
    </div>  
  );
};

export default Table;

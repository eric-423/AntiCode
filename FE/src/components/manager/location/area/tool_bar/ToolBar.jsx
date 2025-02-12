import React, { useEffect, useRef, useState } from "react";
import "./ToolBar.css";
import SearchBar from "../../../../common/search_bar/SearchBar";
import Filter from "../../../../common/filter/Filter";
import NewPlant from "../new_plant/NewPlant";
import useLocalStorage from "use-local-storage";

const ToolBar = ({setRefreshData}) => {
  const [selectedPlants, setSelectedPlants] = useLocalStorage("manager_plants_selected", "");
  const [showModal, setShowModal] = useState(false);  
  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleDeletePlant = async () => {
    try{
      let param = ''
      Array.isArray(selectedPlants) && selectedPlants.forEach((element,index) => {
          if(index === selectedPlants.length - 1){
            param += `plantId=${element}`
          }else{
            param += `plantId=${element}&`
          }
      });
      console.log(param)
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/v1/plant/delete?${param}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }catch(error){
    }finally{
      setRefreshData(prev => !prev)
    }
  }

  return (
    <div className="tool-bar-plant">
      <Filter />
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div onClick={() => handleDeletePlant()} className={selectedPlants && selectedPlants.length > 0 ?"plant-button delete-plant-button-active" :"plant-button delete-plant-button-non-active"}>
          Delete
        </div>
        <div
          className="plant-button new-plant-button"
          onClick={() => handleShowModal()}
        >
          Create Plant
        </div>
      </div>
      {showModal && <NewPlant setRefreshData={setRefreshData} setShowModal={setShowModal}/>}
    </div>
  );
};

export default ToolBar;

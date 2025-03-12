import React from "react";
import { useNavigate } from "react-router-dom";

const Farm = ({item}) => {
  const navigate = useNavigate();
  const handleClickFarm = () => {
    navigate(`/manager/menu-plans-planting/${item.farmId}`)
  };
  return (
    <div
      onClick={() => handleClickFarm()}
      className="farm-container-content-plans-planting"
    >
      <div>
        <h6>{item?.farmName}</h6>
        <p>{item?.farmAddress}</p>
      </div>
      <p>
        Location Available: <span> 15/26</span>{" "}
      </p>
    </div>
  );
};

export default Farm;

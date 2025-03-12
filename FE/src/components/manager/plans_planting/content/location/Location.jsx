import React, { useEffect, useRef, useState } from "react";
import { useParams, useRoutes } from "react-router-dom";
import ContainerLocation from "./container/ContainerLocation";
import "./Location.css";
import axios from "axios";
import BASE from "../../../../../constant/base";
import ContainerArea from "./container/ContainerArea";
import Button from "../../../../common/button/Button";

const Location = () => {
  const { id } = useParams();
  const [activePlant, setActivePlant] = useState();
  const [plants, setPlants] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const draggableRef = useRef(null);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - draggableRef.current.offsetLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - draggableRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    draggableRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setScrollLeft(draggableRef.current.scrollLeft);
  };

  const handleActivePlant = (plantId) => {
    setActivePlant(plantId);
  };

  const handleFetchPlants = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/plant`);
      if (!response || response.status !== 200) throw new Error();
      setPlants(response.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    handleFetchPlants();
  }, []);

  return (
    <div className="plant-container">
      <div className="plant-choose-container">
        <h5>Choose Plant To Planting</h5>
        <div
          className="plant-planting-choose-container"
          ref={draggableRef}
          draggable={false}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDragLeave={handleMouseUp}
        >
          {plants &&
            plants.map((item) => (
              <div
                key={item?.plantId}
                className="card-plant-planting-choose-container"
                style={{
                  backgroundColor:
                    activePlant === item.plantId ? "#fef7ef" : null,
                }}
                draggable={false}
                onClick={() => handleActivePlant(item.plantId)}
              >
                <h6
                  style={{
                    color: activePlant === item.plantId ? "#f28705" : null,
                  }}
                >
                  {item.plantName}
                </h6>
                <p
                  style={{
                    color: activePlant === item.plantId ? "#EDA650" : null,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
        </div>
      </div>
      <ContainerArea />
      <ContainerLocation />
      <div className="button-location-planting-container">
        <Button text={"Next"} />
      </div>
    </div>
  );
};

export default Location;

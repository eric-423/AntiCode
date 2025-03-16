import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Location.css";
import axios from "axios";
import BASE from "../../../../../constant/base";
import StepPlant from "./StepPlant";
import StepPlansTask from "./StepPlansTask";

const Location = () => {
  const { id } = useParams();
  const [activePlant, setActivePlant] = useState();
  const [plants, setPlants] = useState([]);

  const [areaChoose, setAreaChoose] = useState();

  const [isPlansTask, setIsPlansTask] = useState(false);

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
    <>
      {isPlansTask ? (
        <StepPlansTask />
      ) : (
        <StepPlant
          farmId={id}
          activePlant={activePlant}
          plants={plants}
          areaChoose={areaChoose}
          handleActivePlant={handleActivePlant}
          setAreaChoose={setAreaChoose}
          setIsPlansTask={setIsPlansTask}
        />
      )}
    </>
  );
};

export default Location;

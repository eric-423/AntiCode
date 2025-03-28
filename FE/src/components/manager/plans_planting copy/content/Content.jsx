import React, { useEffect, useState } from "react";
import "./Content.css";
import Farm from "./farm/Farm";
import axios from "axios";
import BASE from "../../../../constant/base";

const Content = () => {
  const [farms, setFarms] = useState([]);

  const handleFetchData = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/farm`);
      if (!response || response.status !== 200) throw new Error();
      setFarms(response.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="content-plans-planting">
      <h5>Farms</h5>
      <div className="height-fix-farm-content-plans-planting">
        <div className="farm-content-plans-planting">
          {farms && farms.map((item) => <Farm item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Content;

import React, { useEffect, useState } from "react";
import "./Notification.css";
import Item from "./item/Item";
import axios from "axios";
import BASE from "../../../../constant/base";

const Notification = () => {
  const [recentActivities, setRecentActivities] = useState();

  const handleFetchRecentActivities = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/recent-activity/manager`
      );
      if (!response || response.status === 200) throw new Error();
      setRecentActivities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!recentActivities) {
      handleFetchRecentActivities();
    }
  }, []);

  return (
    <div className="schedule-tasks-notification">
      <h6 className="schedule-tasks-notification-h6">Recent Activity</h6>
      <div className="schedule-tasks-notification-container">
        {recentActivities && recentActivities.map((item) => <Item item={item}/>)}
      </div>
    </div>
  );
};

export default Notification;

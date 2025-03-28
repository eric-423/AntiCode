import React, { useEffect, useState } from "react";
import "./Notification.css";
import Item from "./item/Item";
import axios from "axios";
import BASE from "../../../../constant/base";
import LOCALSTORAGE from "../../../../constant/localStorage";
import useLocalStorage from "use-local-storage";

const Notification = () => {
  const [recentActivities, setRecentActivities] = useState();

  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])

  const handleFetchRecentActivities = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/recent-activity/manager`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
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
        {recentActivities && recentActivities.map((item) => <Item item={item} />)}
      </div>
    </div>
  );
};

export default Notification;

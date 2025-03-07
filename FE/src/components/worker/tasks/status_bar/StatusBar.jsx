import React, { useEffect, useState } from "react";
import "./StatusBar.css";
import Item from "../../../manager/schedule_tasks/notification/item/Item";
import BASE from "../../../../constant/base";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../constant/localStorage";
import useCompareDate from "../../../../hook/useCompareDate";

const StatusBar = () => {
  const [recentActivities, setRecentActivities] = useState();
  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION,
    ""
  );
  const [refreshDataUser, setRefreshDataUser] = useLocalStorage(
    LOCALSTORAGE.REFRESH_TASK_USER,
    ""
  );

  const handleFetchRecentActivities = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/recent-activity/receiver?receiverId=${jwtDecode(atob(accountLoginInformation))?.id
        }`
      );
      if (!response || response.status === 200) throw new Error();
      setRecentActivities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      refreshDataUser &&
      refreshDataUser !== "" &&
      String(jwtDecode(atob(accountLoginInformation))?.id) ===
      String(refreshDataUser)
    ) {
      handleFetchRecentActivities();
    }
  }, [refreshDataUser]);

  useEffect(() => {
    if (!recentActivities) {
      handleFetchRecentActivities();
    }
  }, []);
  return (
    <div className="schedule-tasks-notification worker-tasks-status-bar">
      <h6 className="schedule-tasks-notification-h6">Recent Activity</h6>
      <div className="schedule-tasks-notification-container">
        {console.log(recentActivities)}
        {recentActivities &&
          recentActivities
            .sort((a, b) => useCompareDate(b.date, a.date))
            .map((item) => <Item item={item} />)}
      </div>
    </div>
  );
};

export default StatusBar;

import React from "react";
import "./ScheduleTasks.css";
import Tasks from "./tasks/Tasks";
import Notification from "./notification/Notification";

const ScheduleTasks = () => {
  return (
    <div className="schedule-tasks-container">
        <Tasks />
        <Notification />
    </div>
  );
};

export default ScheduleTasks;

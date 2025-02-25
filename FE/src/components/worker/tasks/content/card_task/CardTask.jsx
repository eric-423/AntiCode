import React, { useEffect, useState } from "react";
import "./CardTask.css";
import ICONS from "../../../../../constant/Image";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import BASE from "../../../../../constant/base";
const CardTask = ({
  index,
  item,
  isBoxShadow = false,
  titleTask,
  setList,
  listTask,
  client,
}) => {
  const handleDrag = (event, _index, titleTask) => {
    event.dataTransfer.setData("titleTask", titleTask);
    event.dataTransfer.setData("index", _index);
  };

  const handleDrop = (event, index, titleTask) => {
    event.preventDefault();
    const _titleTask = event.dataTransfer.getData("titleTask");
    const _index = event.dataTransfer.getData("index");
    if (titleTask === _titleTask) {
      let previousList = [...listTask];
      [previousList[index], previousList[_index]] = [
        previousList[_index],
        previousList[index],
      ];
      setList(previousList);
    } else {
      console.log(_titleTask, "_titleTask");
      console.log(_index, "_index");
      console.log(titleTask, "titleTask");
      console.log(index, "index");
      const taskChange = {
        taskId: 1073741824,
        createdAt: "2025-02-23T11:27:49.553Z",
        completedAt: "2025-02-23T11:27:49.553Z",
        taskDescription: "string",
        taskStatus: 1073741824,
        taskType: 1073741824,
      };
      // client.send("/app/tasks-change", {}, JSON.stringify(taskChange));
    }
  };

  return (
    <div
      className="card-task-container"
      onDragStart={(event) => handleDrag(event, index, titleTask)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop(event, index, titleTask)}
      draggable="true"
      style={{
        boxShadow: isBoxShadow && "0px 0px 1px 1px rgba(0,0,0,0.06)",
      }}
    >
      <div className="header-card-task-container">
        <div className="task-name">
          <span>{item}</span>
        </div>
        <img
          src={ICONS.icon_menu}
          width="20px"
          height="20px"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="body-card-task-container">
        <span>Lorem Ipsum is simply dummy text of the</span>
      </div>
      <div className="footer-card-task-container">
        <div className="due-date-group">
          <img src={ICONS.icon_watch} width="18px" height="18px" />
          <span>Nov 22</span>
        </div>
        <div>
          <img src={ICONS.icon_message} width="18px" height="18px" />
        </div>
        <div className="people-assigned-group">
          <div></div>
          <div>
            <span>+2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTask;

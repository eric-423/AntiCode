import React from "react";
import "./CardTask.css";
import ICONS from "../../../../../constant/Image";

const CardTask = ({ index, item }) => {
  const handleDrag = (event) => {
    event.preventDefault()
    event.dataTransfer.setData("_index", index);
  };

  const handleDrop = (event, index) => {
    const _index =  event.dataTransfer.get("_index");
    console.log(index,"index")
    console.log(_index,"_index")
  }

  return (
    <div
      className="card-task-container"
      onDrag={(event) => handleDrag(event)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop(event, index)}
      draggable="true"
    >
      <div className="header-card-task-container">
        <div className="task-name">
          <span> Water Task</span>
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

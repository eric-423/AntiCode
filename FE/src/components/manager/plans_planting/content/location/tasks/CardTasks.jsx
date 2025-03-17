import React from "react";

const CardTasks = ({task}) => {
  return (
    <div className="card-tasks-plans-guide">
      <div className="title-task-type">{task?.taskType?.taskTypeName}</div>
      <h6>{task?.taskName}</h6>  

      <p>{task?.taskDescription}</p>
    </div>
  );
};

export default CardTasks;

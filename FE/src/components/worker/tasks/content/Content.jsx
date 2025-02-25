import React, { useState } from "react";
import "./Content.css";
import { Col, Row } from "react-bootstrap";
import TaskColumn from "./task_column/TaskColumn";

const Content = () => {

  const [taskReady, setTaskReady] = useState([1,2,3,4])
  const [onProcess, setOnProcess] = useState([1,2])
  const [needReview, setNeedReview] = useState([2,4])
  const [done, setDone] = useState([3,4,4])

  const [taskChange,setTaskChange] = useState();

  

  return (
    <div className="worker-tasks-content">
      <Row>
        <h4 className="worker-tasks-content-h4">Your Tasks <span>{taskChange}</span></h4>
      </Row>
      <Row className="worker-tasks-column-task-container">
        <Col>
          <TaskColumn titleTask={"Task Ready"} listTask={taskReady} />
        </Col>
        <Col>
          <TaskColumn titleTask={"On Progress"} listTask={onProcess} />
        </Col>
        <Col>
          <TaskColumn titleTask={"Needs Review"} listTask={needReview} />
        </Col>
        <Col>
          <TaskColumn titleTask={"Done"} listTask={done} />
        </Col>
      </Row>
    </div>
  );
};

export default Content;

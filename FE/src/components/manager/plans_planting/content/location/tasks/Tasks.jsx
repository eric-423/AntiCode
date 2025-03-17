import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import Button from "../../../../../common/button/Button";
import ICONS from "../../../../../../constant/Image";
import axios from "axios";

const Tasks = ({setShowModalAddTasks, setPhase, phase, index}) => {
  const modalRoot = document.body;
  const [taskDescription, setTaskDescription] = useState();
  const [taskType, setTaskType] = useState();
  const [taskName, setTaskName] = useState();
  const [taskTypesData, setTaskTypesData] = useState();

  const handleFetchDataTaskType = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task-type`
      );
      if (response.status === 200) {
        setTaskTypesData(response.data);
        setTaskType(response.data[0]?.taskTypeId)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = () => {
    const task = {
      taskName,
      taskDescription,
      taskType: taskTypesData.filter((item) => Number(item.taskTypeId) === Number(taskType))[0]
    }
    let listPhase = [...phase]
    let phaseIndexTasks = listPhase[index]?.tasks || [];
    phaseIndexTasks = [...phaseIndexTasks,task]
    listPhase[index].tasks = phaseIndexTasks
    setPhase(listPhase)
    setShowModalAddTasks(false)
  }

  useEffect(() => {
    handleFetchDataTaskType();
  }, []);

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            NEW TASK
          </h4>
          <Form.Group>
            <Form.Label className="text-label-login">Name</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Description</Form.Label>
            <Form.Control
              className="input-login input-addition"
              as={"textarea"}
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Task Type</Form.Label>
            <Form.Select
              onChange={(e) => setTaskType(e.target.value)}
              className="input-login input-addition input-plant-type-create-plant"
            >
              {taskTypesData &&
                Array.isArray(taskTypesData) &&
                taskTypesData.map((item) => (
                  <option value={item.taskTypeId}>{item.taskTypeName}</option>
                ))}
            </Form.Select>
          </Form.Group>

          <Button text="Create Task" handleOnClick={() => handleAddTask()} className="button-create-plant" />
        </Form>
        <img
          className="icon-close"
          onClick={() => setShowModalAddTasks(false)}
          src={ICONS.icon_close}
          alt=""
        />
      </div>
    </div>,
    modalRoot
  );
};

export default Tasks;

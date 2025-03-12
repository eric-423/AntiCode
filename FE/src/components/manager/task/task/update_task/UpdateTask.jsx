import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../../common/button/Button";
import axios from "axios";
import { toast } from "react-toastify/unstyled";

const UpdateTask = ({ setShowModal, itemUpdate, setRefreshData }) => {
  const [taskId, setTaskId] = useState()
  const [taskName, setTaskName] = useState()
  const [createdAt, setCreatedAt] = useState()
  const [completedAt, setCompletedAt] = useState()
  const [taskDescription, setTaskDescription] = useState()
  const [startDate, setStartDate] = useState()
  const [dueDate, setDueDate] = useState()
  const [taskType, setTaskType] = useState()
  const [taskStatus, setTaskStatus] = useState()
  const modalRoot = document.body;
  const setDataItem = (itemUpdate) => {
    setTaskId(itemUpdate.taskId)
    setTaskName(itemUpdate.taskName)
    setStartDate(itemUpdate.startDate)
    setDueDate(itemUpdate.dueDate)
    setCreatedAt(itemUpdate.createdAt)
    setCompletedAt(itemUpdate.completedAt)
    setTaskDescription(itemUpdate.taskDescription)
    setTaskType(itemUpdate.taskTypeId)
    setTaskStatus(itemUpdate.taskStatusId)
  }

  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
    });
  };
  const showToastMessageFail = (message) => {
    toast.error(message.replace(/^.*Exception:\s*/, ''), {
      position: "top-right",
      autoClose: 1000,
    });
  };
  const handleClickClose = () => {
    setShowModal(false);
  };

  const [taskTypesData, setTaskTypesData] = useState();
  const [taskStatusData, setTaskStatusData] = useState();
  //GET TASK STATUS DATA
  const handleFetchDataTaskStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task-status`
      );
      if (response.status === 200) {
        setTaskStatusData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      handleFetchDataTaskStatus();
      setDataItem(itemUpdate)
    },[itemUpdate])

  //GET TASK TYPE DATA
  const handleFetchDataTaskType = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task-type`
      );
      if (response.status === 200) {
        setTaskTypesData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchDataTaskType();
    setDataItem(itemUpdate)
  },[itemUpdate])

  const handleOnClick = async () => {

    const task_type = taskType
      ? taskTypesData.find(
          (item) => Number(item.taskTypeId) === Number(taskType)
        )
      : taskTypesData[0];

      const task_status = taskStatus
      ? taskStatusData.find(
          (item) => Number(item.taskStatusId) === Number(taskStatus)
        )
      : taskStatusData[0];

    const task = {
      taskId: taskId,
      taskName: taskName,
      createdAt: createdAt,
      completedAt: completedAt,
      startDate: startDate,
      dueDate: dueDate,
      taskDescription: taskDescription,
      taskStatus: task_status.taskStatusId,
      taskType: task_type.taskTypeId,
    };
    console.log(task);
    
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_END_POINT}/task`, task);
      console.log(response.data);
      
      if (!response || response.status !== 200) throw new Error();
      showToastMessageSuccess("Task was updated !");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      showToastMessageFail(error.response.data.message||"Task can not update !");
      setShowModal(true);
    } finally {
      setRefreshData((prev) => !prev);
    }
  };
  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            UPDATE TASK
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

          {/* <Form.Group className="group-3-column-create-plant">
                      <Form.Label className="text-label-login">Created At</Form.Label>
                      <Form.Control
                        className="input-login input-addition input-name-create-plant"
                        type="date"
                        value={createdAt}
                        onChange={(e) => setCreatedAt(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="group-3-column-create-plant">
                      <Form.Label className="text-label-login">
                        Completed At
                      </Form.Label>
                      <Form.Control
                        className="input-login input-addition input-characteristis-create-plant"
                        type="date"
                        value={completedAt}
                        onChange={(e) => setCompletedAt(e.target.value)}
                      />
                    </Form.Group> */}

                    <Form.Group className="group-3-column-create-plant">
                      <Form.Label className="text-label-login">
                        Start Date
                      </Form.Label>
                      <Form.Control
                        className="input-login input-addition input-characteristis-create-plant"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="group-3-column-create-plant">
                      <Form.Label className="text-label-login">
                        Due Date
                      </Form.Label>
                      <Form.Control
                        className="input-login input-addition input-characteristis-create-plant"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
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
                        value={taskType}
                      >
                        {taskTypesData &&
                          Array.isArray(taskTypesData) &&
                          taskTypesData.map((item) => (
                            <option value={item.taskTypeId}>{item.taskTypeName}</option>
                          ))}
                      </Form.Select>
                    </Form.Group>
          
                    <Form.Group className="group-3-column-create-plant">
                      <Form.Label className="text-label-login">Task Status</Form.Label>
                      <Form.Select
                        onChange={(e) => setTaskStatus(e.target.value)}
                        className="input-login input-addition input-plant-type-create-plant"
                        value = {taskStatus}
                      >
                        {taskStatusData &&
                          Array.isArray(taskStatusData) &&
                          taskStatusData.map((item) => (
                            <option value={item.taskStatusId}>{item.taskStatusName}</option>
                          ))}
                      </Form.Select>
                    </Form.Group>
          <Button
            text="Update Task"
            handleOnClick={handleOnClick}
            className="button-create-plant"
          />
        </Form>
        <img
          className="icon-close"
          onClick={() => handleClickClose()}
          src={ICONS.icon_close}
          alt=""
        />
      </div>
    </div>,
    modalRoot
  );
};

export default UpdateTask;

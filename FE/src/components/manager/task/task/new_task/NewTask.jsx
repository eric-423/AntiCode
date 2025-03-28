/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./NewTask.css";
import ICONS from "../../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../../common/button/Button";
import { toast } from "react-toastify/unstyled";
import axios from "axios";
import LOCALSTORAGE from "../../../../../constant/localStorage";
import useLocalStorage from "use-local-storage";

const NewTask = ({ setShowModal, setRefreshData }) => {
  const [createdAt, setCreatedAt] = useState();
  const [completedAt, setCompletedAt] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [taskType, setTaskType] = useState();
  const [taskStatus, setTaskStatus] = useState();
  const [startDate, setStartDate] = useState();
  const [dueDate, setDueDate] = useState();
  const [taskName, setTaskName] = useState();
  const modalRoot = document.body;
  const handleClickClose = () => {
    setShowModal(false);
  };
  const [taskTypesData, setTaskTypesData] = useState();
  const [taskStatusData, setTaskStatusData] = useState();

  const [auth, setAuth] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION,
    ""
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(atob(auth));
  }, [auth]);

  //GET TASK STATUS DATA
  const handleFetchDataTaskStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task-status`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
  }, []);

  //GET TASK TYPE DATA
  const handleFetchDataTaskType = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task-type`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
  }, []);

  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
    });
  };
  const showToastMessageFail = (message) => {
    toast.error(message.replace(/^.*Exception:\s*/, ""), {
      position: "top-right",
      autoClose: 1000,
    });
  };
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
      taskName: taskName,
      createdAt: createdAt,
      completedAt: completedAt,
      startDate: startDate,
      dueDate: dueDate,
      taskDescription: taskDescription,
      taskStatus: task_status.taskStatusId,
      taskType: task_type.taskTypeId,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task`,
        task,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )


      if (!response || response.status !== 201) throw new Error();
      showToastMessageSuccess("Task was added !");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      showToastMessageFail(error.response.data.message || "Task can not add !");
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
          </Form.Group>

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
          </Form.Group> */}

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
                taskTypesData.map((item, index) => (
                  <option key={index} value={item.taskTypeId}>
                    {item.taskTypeName}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          {/* <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Task Status</Form.Label>
            <Form.Select
              onChange={(e) => setTaskStatus(e.target.value)}
              className="input-login input-addition input-plant-type-create-plant"
            >
              {taskStatusData &&
                Array.isArray(taskStatusData) &&
                taskStatusData.map((item) => (
                  <option value={item.taskStatusId}>{item.taskStatusName}</option>
                ))}
            </Form.Select>
          </Form.Group> */}

          <Button
            text="Create Task"
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
export default NewTask;

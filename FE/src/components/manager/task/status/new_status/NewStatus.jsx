import React, { useEffect, useState } from "react";
import "./NewStatus.css";
import { Form } from "react-bootstrap";
import Button from "../../../../common/button/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../constant/localStorage";

const NewStatus = ({ setRefreshData, updateItem, setUpdateItem }) => {
  const [taskStatusName, setTaskStatusName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [taskStatusDescription, setTaskStatusDescription] = useState("");
  const [isDelete, setIsDelete] = useState(false);
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
  const clearData = () => {
    setTaskStatusName("");
    setTaskStatusDescription("");
    setIsUpdate("");
  };

  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])

  const handleUpdateTaskStatus = async () => {
    const taskStatus = {
      taskStatusId: updateItem.taskStatusId,
      taskStatusName: taskStatusName,
      taskStatusDescription: taskStatusDescription,
      isDelete: isDelete,
    };
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_END_POINT}/task-status`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }, taskStatus);
      if (!response || response.status !== 200 || response.data.data === "Failed") throw new Error();
      showToastMessageSuccess("Task status was updated !");
    } catch (error) {
      showToastMessageFail(error.response.data.message || 'Cannot update task status');
    } finally {
      clearData();
      setUpdateItem(false)
      setRefreshData((prev) => !prev);
    }
  }
  const handleAddTaskStatus = async () => {
    const taskStatus = {
      taskStatusName: taskStatusName,
      taskStatusDescription: taskStatusDescription,
      isDelete: isDelete,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_END_POINT}/task-status`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }, taskStatus);
      if (!response || response.status !== 201 || response.data.data === "Failed") throw new Error();
      showToastMessageSuccess("Task status was added !");
    } catch (error) {
      console.log(error)
      showToastMessageFail(error.response.data.message || 'Cannot add task status');
    } finally {
      clearData();
      setRefreshData((prev) => !prev);
    }
  };
  useEffect(() => {
    if (updateItem) {
      setIsUpdate(true);
      setTaskStatusName(updateItem.taskStatusName);
      setTaskStatusDescription(updateItem.taskStatusDescription);
    } else {
      setIsUpdate(false);
      clearData();
    }
  }, [updateItem]);
  return (
    <Form className="form-addition-plant-type">
      <h4 className="addition-plant-type-h4">
        {isUpdate ? "UPDATE TASK STATUS" : "NEW TASK STATUS"}
      </h4>
      <Form.Group>
        <Form.Label className="text-label-login">Name</Form.Label>
        <Form.Control
          className="input-login input-addition"
          type="text"
          value={taskStatusName}
          onChange={(e) => setTaskStatusName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="text-label-login">Description</Form.Label>
        <Form.Control
          className="input-login-textarea"
          as="textarea"
          rows={5}
          placeholder="Description here..."
          value={taskStatusDescription}
          onChange={(e) => setTaskStatusDescription(e.target.value)}
        />
      </Form.Group>

      <Button handleOnClick={isUpdate ? handleUpdateTaskStatus : handleAddTaskStatus} text={isUpdate ? "Update" : "Save"} />
    </Form>
  );
};

export default NewStatus;

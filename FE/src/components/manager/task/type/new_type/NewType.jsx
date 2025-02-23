import React, { useEffect, useState } from "react";
import "./NewType.css";
import { Form } from "react-bootstrap";
import Button from "../../../../common/button/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const NewType = ({ setRefreshData, updateItem , setUpdateItem}) => {
  const [taskTypeId, setTaskTypeId] = useState("");
  const [taskTypeName, setTaskTypeName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [taskTypeDesc, setTaskTypeDesc] = useState("");
  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };
  const showToastMessageFail = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };
  const clearData = () => {
    setTaskTypeName("");
    setTaskTypeDesc("");
  };
  const handleUpdateTaskType = async () => {
    const taskType = {
      taskTypeId: updateItem.taskTypeId,
      taskTypeName: taskTypeName,
      taskTypeDesc: taskTypeDesc,
    };
    try {
      const response = await axios.put( `${import.meta.env.VITE_REACT_APP_END_POINT}/task-type`, taskType);
      if (!response || response.status !== 200 || response.data.data === "Failed") throw new Error();
      showToastMessageSuccess("Task type was updated !");
    } catch (error) {
      showToastMessageFail("Task type can not update !");
    } finally {
      clearData();
      setUpdateItem(false)
      setRefreshData((prev) => !prev);
    }
  }
  const handleAddTaskType = async () => {
    const taskType = {
      taskTypeName: taskTypeName,
      taskTypeDesc: taskTypeDesc,
    };
    console.log(taskType);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_END_POINT}/task-type`,taskType)
      if (!response || response.status !== 201 || response.data.data === "Failed") throw new Error();
      showToastMessageSuccess("Task type was added !");
    } catch (error) {
      console.log(error)
      showToastMessageFail("Task type can not add !");
    } finally {
      clearData();
      setRefreshData((prev) => !prev);
    }
  };
  useEffect(() => {
    if (updateItem) {
      setIsUpdate(true);
      setTaskTypeName(updateItem.taskTypeName);
      setTaskTypeDesc(updateItem.taskTypeDesc);
    } else {
      setIsUpdate(false);
      clearData();
    }
  }, [updateItem]);
  return (
    <Form className="form-addition-plant-type">
      <h4 className="addition-plant-type-h4">
        {isUpdate ? "UPDATE TASK TYPE" : "NEW TASK TYPE"}
      </h4>
      <Form.Group>
        <Form.Label className="text-label-login">Name</Form.Label>
        <Form.Control
          className="input-login input-addition"
          type="text"
          value={taskTypeName}
          onChange={(e) => setTaskTypeName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="text-label-login">Description</Form.Label>
        <Form.Control
          className="input-login-textarea"
          as="textarea"
          rows={5}
          placeholder="Description here..."
          value={taskTypeDesc}
          onChange={(e) => setTaskTypeDesc(e.target.value)}
        />
      </Form.Group>
     
      <Button handleOnClick={isUpdate ? handleUpdateTaskType :handleAddTaskType} text={isUpdate ? "Update" :"Save"} />
    </Form>
  );
};

export default NewType;

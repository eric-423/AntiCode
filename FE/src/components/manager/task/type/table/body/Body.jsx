import React from "react";
import { Card } from "react-bootstrap";
import "./Body.css";
import ICONS from "../../../../../../constant/Image";
import { toast } from "react-toastify/unstyled";
import axios from "axios";

const Body = ({ item, setRefreshData, setUpdateItem }) => {
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
  const handleDeleteItem = async (item) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_END_POINT
        }/task-type?id=${item.taskTypeId}`
      );
      if (!response || response.status !== 200 || response.data === "Failed") throw new Error();
      showToastMessageSuccess();
    } catch (error) {
      showToastMessageFail(error.response.data.message || 'Cannot delete task type');
      console.log(error.response);
      
    } finally {
      setRefreshData((prev) => !prev);
    }
  };
  const handleUpdateItem = (item) => {
    setUpdateItem(item);
  };
  return (
    <Card className="card-plant-type" style={{ minWidth: "250px" }}>
      <Card.Header className="card-header">
        <div className="container-icon">
          <img src={ICONS.icon_update} onClick={() => handleUpdateItem(item)} />
        </div>
        <div className="container-icon" onClick={() => handleDeleteItem(item)}>
          <img src={ICONS.icon_delete} />
        </div>
      </Card.Header>
      <Card.Body className="card-body">
        <Card.Title className="card-title-plant-type">
          {item.taskTypeName}
        </Card.Title>
        <Card.Text className="card-text-plant-type">
          {item.taskTypeDesc}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Body;

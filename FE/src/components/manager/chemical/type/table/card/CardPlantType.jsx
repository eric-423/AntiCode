import React from "react";
import { Card } from "react-bootstrap";
import "./CardPlantType.css";
import ICONS from "../../../../../../constant/Image";
import { toast } from "react-toastify/unstyled";


const CardPlantType = ({ item ,setRefreshData, setUpdateItem}) => {
  const showToastMessageSuccess = () => {
    toast.success("Plant type was deleted !", {
      position: "top-right",
    });
  };
  const showToastMessageFail = () => {
    toast.error("Plant can not delete !", {
      position: "top-right",
    });
  };
  const handleDeleteItem = async (item) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_END_POINT
        }/v1/plant-type/delete?plantTypeId=${item.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!data) throw new Error();
      showToastMessageSuccess();
    } catch (error) {
      showToastMessageFail()
    }finally{
      setRefreshData(prev => !prev)
    }
  };
  const handleUpdateItem = (item) => {
    setUpdateItem(item)
  }
  return (
    <Card className="card-plant-type">
      <Card.Header className="card-header">
        <div className="container-icon">
          <img src={ICONS.icon_update} onClick={() => handleUpdateItem(item)}/>
        </div>
        <div className="container-icon" onClick={() => handleDeleteItem(item)}>
          <img src={ICONS.icon_delete} />
        </div>
      </Card.Header>
      <Card.Body className="card-body">
        <Card.Title className="card-title-plant-type">{item.name}</Card.Title>
        <Card.Text className="card-text-plant-type">
          {item.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardPlantType;

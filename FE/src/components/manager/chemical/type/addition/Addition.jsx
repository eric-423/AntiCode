import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./Addition.css";
import { Form } from "react-bootstrap";
import Button from "../../../../common/button/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";

const Addition = ({ setRefreshData, updateItem, setUpdateItem }) => {
  const [name, setName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [description, setDescription] = useState("");


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
    setName("");
    setDescription("");
  };


  const handleUpdatePlantType = async () => {
    const plantType = {
      id: updateItem.id,
      name: name,
      description: description,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/chemical-type`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(plantType),
        }
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!data) throw new Error();
      showToastMessageSuccess("CHEMICAL type was updated !");
    } catch (error) {
      console.log(error)
      showToastMessageFail("CHEMICAL type can not update !");
    } finally {
      clearData();
      setUpdateItem(false)
      setRefreshData((prev) => !prev);
    }
  }


  const handleAddEquipmentType = async () => {
    const plantType = {
      name: name,
      description: description,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/chemical-type`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(plantType),
        }
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!data) throw new Error();
      showToastMessageSuccess("Chemical type was added !");
    } catch (error) {
      console.log(error)
      showToastMessageFail("Chemical type can not add !");
    } finally {
      clearData();
      setRefreshData((prev) => !prev);
    }
  };


  useEffect(() => {
    if (updateItem) {
      setIsUpdate(true);
      setName(updateItem.name);
      setDescription(updateItem.description);
    } else {
      setIsUpdate(false);
      clearData();
    }
  }, [updateItem]);



  return (
    <Form className="form-addition-plant-type">
      <h4 className="addition-plant-type-h4">
        {isUpdate ? "UPDATE CHEMICAL TYPE" : "NEW CHEMICAL TYPE"}
      </h4>
      <Form.Group>
        <Form.Label className="text-label-login">Name</Form.Label>
        <Form.Control
          className="input-login input-addition"
          type="text"
          placeholder="Plant type name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="text-label-login">Description</Form.Label>
        <Form.Control
          className="input-login-textarea"
          as="textarea"
          rows={5}
          placeholder="Description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button handleOnClick={isUpdate ? handleUpdatePlantType : handleAddEquipmentType} text={isUpdate ? "Update" : "Save"} />
    </Form>
  );
};
Addition.propTypes = {
  setRefreshData: PropTypes.func.isRequired,
  updateItem: PropTypes.object,
  setUpdateItem: PropTypes.func.isRequired,
};

export default Addition;

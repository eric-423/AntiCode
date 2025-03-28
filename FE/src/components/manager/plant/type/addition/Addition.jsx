import React, { useEffect, useState } from "react";
import "./Addition.css";
import { Form } from "react-bootstrap";
import Button from "../../../../common/button/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LOCALSTORAGE from "../../../../../constant/localStorage";
import useLocalStorage from "use-local-storage";

const Addition = ({ setRefreshData, updateItem, setUpdateItem }) => {
  const [name, setName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [description, setDescription] = useState("");
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])


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
      plantTypeId: updateItem.plantTypeId,
      plantTypeName: name,
      typeDescription: description,
    };
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-type`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
      }, plantType);
      if (!response || response.status !== 200 || response.data.data === "Failed") throw new Error();
      showToastMessageSuccess("Plant type was updated !");
    } catch (error) {
      showToastMessageFail("Plant type can not update !");
    } finally {
      clearData();
      setUpdateItem(false)
      setRefreshData((prev) => !prev);
    }
  }
  const handleAddPlantType = async () => {
    if (!name || !description) {
      showToastMessageFail("Please fill all fields !");
      return;
    }
    const plantType = {
      plantTypeName: name,
      typeDescription: description,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-type`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
      }, plantType);
      if (!response || response.status !== 201 || response.data.data === "Failed") throw new Error();
      showToastMessageSuccess("Plant type was added !");
    } catch (error) {
      console.log(error)
      showToastMessageFail("Plant type can not add !");
    } finally {
      clearData();
      setRefreshData((prev) => !prev);
    }
  };
  useEffect(() => {
    if (updateItem) {
      setIsUpdate(true);
      setName(updateItem.plantTypeName);
      setDescription(updateItem.typeDescription);
    } else {
      setIsUpdate(false);
      clearData();
    }
  }, [updateItem]);
  return (
    <Form className="form-addition-plant-type">
      <h4 className="addition-plant-type-h4">
        {isUpdate ? "UPDATE PLANT TYPE" : "NEW PLANT TYPE"}
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

      <Button handleOnClick={isUpdate ? handleUpdatePlantType : handleAddPlantType} text={isUpdate ? "Update" : "Save"} />
    </Form>
  );
};

export default Addition;

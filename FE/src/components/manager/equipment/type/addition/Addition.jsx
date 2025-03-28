import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./Addition.css";
import { Form } from "react-bootstrap";
import Button from "../../../../common/button/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../constant/localStorage";

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
    if (!name) {
      showToastMessageFail("Please enter name !");
      return;
    }
    if (!description) {
      showToastMessageFail("Please enter description !");
      return;
    }

    const plantType = {
      id: updateItem.id,
      name: name,
      description: description,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/equipment-type/${updateItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,

          },
          body: JSON.stringify(plantType),
        }
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!data) throw new Error();
      showToastMessageSuccess("Equipment type was updated !");
    } catch (error) {
      console.log(error)
      showToastMessageFail("Plant type can not update !");
    } finally {
      clearData();
      setUpdateItem(false)
      setRefreshData((prev) => !prev);
    }
  }


  const handleAddEquipmentType = async () => {

    if (!name) {
      return showToastMessageFail("Please fill all required fields");
    }
    if (!description) {
      return showToastMessageFail("Please fill all required fields");
    }
    const plantType = {
      name: name,
      description: description,
    };
    if (!name) {
      return showToastMessageFail("Please fill all required fields");
    }
    if (!description) {
      return showToastMessageFail("Please fill all required fields");
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/equipment-type/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(plantType),
        }
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!data) throw new Error();
      showToastMessageSuccess("Equipment type was added !");
    } catch (error) {
      console.log(error)
      showToastMessageFail("Equipment type can not add !");
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
        {isUpdate ? "UPDATE EQUIPMENT TYPE" : "NEW EQUIPMENT TYPE"}
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

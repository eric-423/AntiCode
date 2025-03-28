import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../../common/button/Button";
import axios from "axios";
import { toast } from "react-toastify/unstyled";
import LOCALSTORAGE from "../../../../../constant/localStorage";
import useLocalStorage from "use-local-storage";

const UpdatePlant = ({ setShowModal, itemUpdate, setRefreshData }) => {
  const [name, setName] = useState();
  const [characteristics, setCharacteristics] = useState();
  const [description, setDescription] = useState();
  const [species, setSpecies] = useState();
  const [attracts, setAttracts] = useState();
  const [hardiness, setHardiness] = useState();
  const [heatZone, setHeatZone] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [plantType, setPlantType] = useState();
  const [isSeed, setIsSeed] = useState(false);
  const modalRoot = document.body;
  const setDataItem = (itemUpdate) => {
    setName(itemUpdate.plantName)
    setCharacteristics(itemUpdate.characteristics)
    setDescription(itemUpdate.description)
    setSpecies(itemUpdate.species)
    setAttracts(itemUpdate.attracts)
    setHardiness(itemUpdate.hardiness)
    setHeatZone(itemUpdate.heatZones)
    setSize(itemUpdate.size)
    setPrice(itemUpdate.price)
    setPlantType(itemUpdate.plantTypeId)
    setIsSeed(itemUpdate.seed)
  }
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
  const handleClickClose = () => {
    setShowModal(false);
  };
  const [plantTypesData, setPlantTypesData] = useState();


  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])


  const handleFetchDataPlantType = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-type`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        setPlantTypesData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    handleFetchDataPlantType();
    setDataItem(itemUpdate)
  }, [itemUpdate])


  const handleOnClick = async () => {
    const plant_type = plantType
      ? plantTypesData.find((item) => Number(item.plantTypeId) === Number(plantType))
      : plantTypesData[0];
    const plant = {
      plantId: itemUpdate.plantId,
      plantName: name,
      price: price,
      size: size,
      seed: isSeed,
      species: species,
      description: description,
      characteristics: characteristics,
      attracts: attracts,
      hardiness: hardiness,
      heatZones: heatZone,
      plantTypeId: plant_type.plantTypeId,
    };
    console.log(plant)
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }, plant);
      if (!response || response.status !== 200) throw new Error();
      showToastMessageSuccess("Plant was updated !");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      showToastMessageFail("Plant can not update !");
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
            UPDATE PLANT
          </h4>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Name</Form.Label>
            <Form.Control
              className="input-login input-addition input-name-create-plant"
              type="text"
              placeholder="Rosa ‘Belinda’s Dream’ (Shrub Rose)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">
              Characteristics
            </Form.Label>
            <Form.Control
              className="input-login input-addition input-characteristis-create-plant"
              type="text"
              placeholder="Showy, Cut Flowers"
              value={characteristics}
              onChange={(e) => setCharacteristics(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Species</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              placeholder="Roses"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Hardiness</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              placeholder="5 - 9"
              value={hardiness}
              onChange={(e) => setHardiness(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Heat Zone</Form.Label>
            <Form.Control
              className="input-login input-addition input-number"
              type="text"
              placeholder="1 - 5"
              value={heatZone}
              onChange={(e) => setHeatZone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Attracts</Form.Label>
            <Form.Control
              className="input-login input-addition input-name-create-plant"
              type="text"
              placeholder="Bee"
              value={attracts}
              onChange={(e) => setAttracts(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="">
            <Form.Label className="text-label-login">Size</Form.Label>
            <Form.Control
              className="input-login input-addition input-price-create-plant input-number"
              type="text"
              placeholder="M"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="">
            <Form.Label className="text-label-login">Price</Form.Label>
            <Form.Control
              className="input-login input-addition input-price-create-plant input-number"
              type="number"
              placeholder="100"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Plant Type</Form.Label>
            <Form.Select
              onChange={(e) => setPlantType(e.target.value)}
              className="input-login input-addition input-plant-type-create-plant"
              value={plantType}
            >
              {plantTypesData &&
                Array.isArray(plantTypesData) &&
                plantTypesData.map((item) => (
                  <option value={item.plantTypeId}>{item.plantTypeName}</option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="display-flex-radio-group">
            <span className="text-label-login">Seed</span>
            <div
              className={
                isSeed
                  ? "group-input-radio-new-plant active"
                  : "group-input-radio-new-plant"
              }
              onClick={() => setIsSeed((prev) => !prev)}
            >
              <div></div>
            </div>
          </Form.Group>
          <Form.Group className="mb-2 group-3-column-create-plant">
            <Form.Label className="text-label-login">Description</Form.Label>
            <Form.Control
              className="input-login-textarea"
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="The Orange Glow™ Knock Out® Rose is an upright, bushy shrub that produces abundant clusters of very full, cupped blooms..."
            />
          </Form.Group>
          <Button
            text="Update Plant"
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

export default UpdatePlant;

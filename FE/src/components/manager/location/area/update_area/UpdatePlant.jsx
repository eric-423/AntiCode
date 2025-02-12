import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../../common/button/Button";

const UpdatePlant = ({ setShowModal, itemUpdate }) => {
  const [name, setName] = useState();
  const [characteristics, setCharacteristics] = useState();
  const [soilPH, setSoilPH] = useState();
  const [waterNeed, setWaterNeed] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [plantType, setPlantType] = useState();
  const [description, setDescription] = useState();
  const modalRoot = document.body;
  const handleClickClose = () => {
    setShowModal(false);
  };
  const [plantTypesData, setPlantTypesData] = useState();
  const handleFetchDataPlantType = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/v1/plant-type/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      setPlantTypesData(data);
    } catch (error) {}
  };
  useEffect(() => {
    handleFetchDataPlantType();
  }, []);
  useEffect(() => {
    console.log(itemUpdate)
  })
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
              placeholder="Rosa Orange Glow (Shrub Rose)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Characteristis</Form.Label>
            <Form.Control
              className="input-login input-addition input-characteristis-create-plant"
              type="text"
              placeholder="Showy, Cut Flowers"
              value={characteristics}
              onChange={(e) => setCharacteristics(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Soil PH</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              placeholder="Acid, Alkaline, Neutral"
              value={soilPH}
              onChange={(e) => setSoilPH(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Water Need</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={waterNeed}
              onChange={(e) => setWaterNeed(e.target.value)}
              placeholder="Average"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Quantity</Form.Label>
            <Form.Control
              className="input-login input-addition input-number"
              type="number"
              placeholder="10"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="group-3-column-create-plant">
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
          <Form.Group className="mb-2 group-3-column-create-plant">
            <Form.Label className="text-label-login">Plant Type</Form.Label>
            <Form.Select
              onChange={(e) => setPlantType(e.target.value)}
              className="input-login input-addition input-plant-type-create-plant"
            >
              {plantTypesData &&
                Array.isArray(plantTypesData) &&
                plantTypesData.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2 group-3-column-create-plant">
            <Form.Label className="text-label-login">Description</Form.Label>
            <Form.Control
              className="input-login-textarea"
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="The Orange Glow™ Knock Out® Rose is an upright, bushy shrub that produces abundant clusters of very full, cupped blooms..."
            />
          </Form.Group>
          <Button text="Update Plant" className="button-create-plant" />
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

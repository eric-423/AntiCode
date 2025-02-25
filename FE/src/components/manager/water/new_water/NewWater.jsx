import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./NewWater.css";
import ICONS from "../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../common/button/Button";
import { toast } from "react-toastify/unstyled";
import axios from "axios";

const NewWater = ({ setShowModal, setRefreshData }) => {
  const [waterName, setWaterName] = useState()
  const [purity, setPurity] = useState()
  const [phLevel, setPhLevel] = useState()
  const [volumeAvailable, setVolumeAvailable] = useState()
  const modalRoot = document.body
  const handleClickClose = () => {
    setShowModal(false);
  };

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
  const handleOnClick = async () => {

    const water = {
      waterName: waterName,
      purity: purity,
      phLevel: phLevel,
      volumeAvailable: volumeAvailable,
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_END_POINT}/water`, water);
      if (!response || response.status !== 201) throw new Error();
      showToastMessageSuccess("Water was added !");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      showToastMessageFail("Water can not added !");
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
            ADD WATER
          </h4>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Name</Form.Label>
            <Form.Control
              className="input-login input-addition input-name-create-plant"
              type="text"
              value={waterName}
              onChange={(e) => setWaterName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Purity</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">PHLevel</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={phLevel}
              onChange={(e) => setPhLevel(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Volume Available</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={volumeAvailable}
              onChange={(e) => setVolumeAvailable(e.target.value)}
            />
          </Form.Group>
          <Button
            text="Add Water"
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
  )
};
export default NewWater;

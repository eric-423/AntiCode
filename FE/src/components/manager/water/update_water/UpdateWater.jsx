import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../common/button/Button";
import axios from "axios";
import { toast } from "react-toastify/unstyled";

const UpdateWater = ({ setShowModal, itemUpdate, setRefreshData }) => {
  const [waterId, setWaterId] = useState()
  const [waterName, setWaterName] = useState()
  const [purity, setPurity] = useState()
  const [phlevel, setPhLevel] = useState()
  const [volumeAvailable, setVolumeAvailable] = useState()
  const modalRoot = document.body
  const setDataItem = (itemUpdate) =>{
    setWaterId(itemUpdate.waterId)
    setWaterName(itemUpdate.waterName)
    setPurity(itemUpdate.purity)
    setPhLevel(itemUpdate.phlevel)
    setVolumeAvailable(itemUpdate.volumeAvailable)
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

  useEffect(() => {
    setDataItem(itemUpdate)
  },[itemUpdate])

  const handleOnClick = async () => {
    const water = {
      waterId: itemUpdate.waterId,
      waterName: waterName,
      purity: purity,
      phlevel: phlevel,
      volumeAvailable: volumeAvailable,
    }
    console.log(water);
    
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_END_POINT}/water`, water);
      console.log(response.data);
      
      if (!response || response.status !== 200) throw new Error();
      showToastMessageSuccess("Water was updated !");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      showToastMessageFail("Water can not update !");
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
            UPDATE WATER
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
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Purity</Form.Label>
            <Form.Control
              className="input-login input-addition input-characteristis-create-plant"
              type="number"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">pHLevel</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={phlevel}
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
          <Button text="Update Water" className="button-create-plant" handleOnClick={handleOnClick}/>
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

export default UpdateWater

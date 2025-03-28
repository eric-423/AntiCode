import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../constant/Image";
import "./AddPlans.css";
import { Form } from "react-bootstrap";
import STATUS_PLANS from "../../../../constant/statusPlans";
import Button from "../../../common/button/Button";
import ChoosePlant from "./plant/ChoosePlant";
import ChooseArea from "./area/ChooseArea";
import ChooseFarm from "./farm/ChooseFarm";
import ChooseLocation from "./location/ChooseLocation";
import Confirm from "./confirm/Confirm";

const AddPlans = ({setShowModal}) => {
  const modalRoot = document.body;
  const [status, setStatus] = useState(STATUS_PLANS.CHOOSE_PLANT);
  const [plant, setPlant] = useState();
  const [farm, setFarm] = useState();
  const [area, setArea] = useState();
  const [location, setLocation] = useState([]);
  const [indexStatus, setIndexStatus] = useState(0);

  const handleNextStatus = () => {
    const index = Object.values(STATUS_PLANS).indexOf(status);
    const _status = Object.values(STATUS_PLANS).filter(
      (__, _index) => _index === index + 1
    )[0];
    setIndexStatus(index + 1);
    setStatus(_status);
  };

  const handleBackStatus = (status, index) => {
    setIndexStatus(index);
    setStatus(status);
  };

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plans">
        <h4 className="addition-plant-type-h4 group-3-column-create-plant">
          NEW PLANS PLANTING
        </h4>
        <div className="plans-status-bar mt-5">
          {Object.values(STATUS_PLANS).map((item, index) => (
            <div
              className={
                indexStatus !== undefined && indexStatus >= index
                  ? "active"
                  : null
              }
              onClick={() => handleBackStatus(item, index)}
            >
              <div
                style={{
                  border:
                    indexStatus !== undefined && indexStatus >= index
                      ? "1px solid #F28705"
                      : null,
                  color:
                    indexStatus !== undefined && indexStatus >= index
                      ? "#F28705"
                      : null,
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </div>
              <span
                style={{
                  color:
                    indexStatus !== undefined && indexStatus >= index
                      ? "#F28705"
                      : null,
                  cursor: "pointer",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
        <Form className="mt-4">
          {status && status === STATUS_PLANS.CHOOSE_PLANT && (
            <ChoosePlant plant={plant} setPlant={setPlant} />
          )}
          {status && status === STATUS_PLANS.CHOOSE_AREA && (
            <ChooseArea farm={farm} area={area} setArea={setArea} />
          )}
          {status && status === STATUS_PLANS.CHOOSE_FARM && (
            <ChooseFarm farm={farm} setFarm={setFarm} />
          )}
          {status && status === STATUS_PLANS.CHOOSE_LOCATION && (
            <ChooseLocation
              area={area}
              location={location}
              setLocation={setLocation}
            />
          )}
          {status && status === STATUS_PLANS.CONFIRM && (
            <Confirm plant={plant} area={area} farm={farm} location={location} />
          )}
        </Form>
        <div
          style={{
            width: "200px",
          }}
        >
          {STATUS_PLANS.CONFIRM !== status && <Button
            text={ "Next"}
            handleOnClick={() => handleNextStatus()}
          /> }
          
        </div>
        <img className="icon-close" src={ICONS.icon_close} alt="Close" onClick={() => setShowModal(false)} />
      </div>
    </div>,
    modalRoot
  );
};

export default AddPlans;

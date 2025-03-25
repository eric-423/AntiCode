import React, { useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../../../constant/Image";
import { Form } from "react-bootstrap";
import Button from "../../../../../common/button/Button";
import "./Phase.css";

const Phase = ({ phase, setPhase, setShowModalAddPhase }) => {
  const modalRoot = document.body;

  const [namePhase, setNamePhase] = useState();
  const [startPhase, setStartPhase] = useState();
  const [endPhase, setEndPhase] = useState()

  const handleAddPhase = () => {
    const phaseData = {
      name: namePhase,
      startPhase: startPhase,
      endPhase: endPhase,
      tasks: []
    }
    setPhase([...phase, phaseData])
    setShowModalAddPhase(false)
  }

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            NEW PHASE
          </h4>
          <div className="group-3-column-create-plant">
            <Form.Group className="max-width-phase-name">
              <Form.Label className="text-label-login">Name Phase</Form.Label>
              <Form.Control
                className="input-login input-addition"
                type="text"
                value={namePhase}
                onChange={(event) => setNamePhase(event.target.value)}
              />
            </Form.Group>
          </div>
          <div className="group-3-column-create-plant phase-time-plans-tasks">
            <Form.Group className="group-3-column-create-plant plans-tasks-input-havert-max-width">
              <Form.Label className="text-label-login text-label-plans-tasks">
                Start Phase
              </Form.Label>
              <Form.Control
                className="input-login input-addition input-name-create-plant"
                type="date"
                onChange={(event) => setStartPhase(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="group-3-column-create-plant plans-tasks-input-havert-max-width">
              <Form.Label className="text-label-login text-label-plans-tasks">
                End Phase
              </Form.Label>
              <Form.Control
                className="input-login input-addition input-name-create-plant"
                type="date"
                onChange={(event) => setEndPhase(event.target.value)}
              />
            </Form.Group>
          </div>
          <Button handleOnClick={() => handleAddPhase()} text="Create Phase" className="button-create-plant" />
        </Form>
        <img onClick={() => setShowModalAddPhase(false)} className="icon-close" src={ICONS.icon_close} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

export default Phase;

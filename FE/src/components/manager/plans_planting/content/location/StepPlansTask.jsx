import React from "react";
import "./StepPlansTask.css";
import { Form } from "react-bootstrap";

const StepPlansTask = () => {
  return (
    <div className="step-plans-tasks-container">
      <div className="step-plans-tasks">
        <h4 className="step-plans-tasks-h4">Plan Informations</h4>
        <div className="information-plant-area-location">
          <label>Plant</label>
          <span>Apple Tree</span>
        </div>
        <div className="information-plant-area-location">
          <label>Area</label>
          <span>North Field</span>
        </div>
        <div className="information-plant-area-location">
          <label>Location</label>
          <span>North Field</span>
        </div>
        <div className="plans-tasks-input-havert time-havert-plans-tasks mt-4">
          <Form.Group className="group-3-column-create-plant plans-tasks-input-havert-max-width">
            <Form.Label className="text-label-login text-label-plans-tasks">
              Start Havert
            </Form.Label>
            <Form.Control
              className="input-login input-addition input-name-create-plant"
              type="date"
            />
          </Form.Group>
          <Form.Group className="group-3-column-create-plant plans-tasks-input-havert-max-width">
            <Form.Label className="text-label-login text-label-plans-tasks">
              End Havert
            </Form.Label>
            <Form.Control
              className="input-login input-addition input-name-create-plant"
              type="date"
            />
          </Form.Group>
        </div>
        <div className="step-plans-tasks-plans">
          <div className="">
            <label className="text-label-plans-tasks">Tasks Plans</label>
          </div>
          <div className="step-plans-tasks-plans-guide">
            <div className="step-plans-tasks-plans-guide-phase">
              <span>Phase One (First Month)</span>
              <div className="add-tasks-plans-guide">+</div>
            </div>
            <div className="step-plans-tasks-plans-guide-phase">
              <span>Phase Two (Sencond Month)</span>
              <div className="add-tasks-plans-guide">+</div>
            </div>
            <div className="step-plans-tasks-plans-guide-phase">
              <span>Phase Three (Third Month)</span>
              <div className="add-tasks-plans-guide">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPlansTask;

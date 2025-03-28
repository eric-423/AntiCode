import React, { useState } from "react";
import "./StepPlansTask.css";
import { Form } from "react-bootstrap";
import Tasks from "./tasks/Tasks";
import CardTasks from "./tasks/CardTasks";
import Phase from "./phase/Phase";
import useFormattedDate from "../../../../../hook/useFormatDate";
import Button from "../../../../common/button/Button";

const StepPlansTask = () => {
  const [showModalAddTasks, setShowModalAddTasks] = useState(false);
  const [showModalAddPhase, setShowModalAddPhase] = useState(false);
  const [phase, setPhase] = useState([]);
  const [index, setIndex] = useState();

  return (
    <div className="step-plans-tasks-container">
      <div className="step-plans-tasks">
        <div className="header-plans-information">
          <h4 className="step-plans-tasks-h4">Plan Informations</h4>
          <div className="container-create-plans-button">
            <Button text={"Create Plan"} />
          </div>
        </div>
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
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label
              className="step-plans-tasks-h4"
              style={{ marginTop: 10, marginBottom: 0 }}
            >
              Tasks Plans
            </label>
            <div
              className="button-create-phase"
              onClick={() => setShowModalAddPhase(true)}
            >
              <div>Create Phase</div>
            </div>
          </div>
          <div className="step-plans-tasks-plans-guide">
            {phase &&
              phase.map((item, index) => (
                <div className="step-plans-tasks-plans-guide-phase">
                  <span>
                    {item.name}
                    {` (${useFormattedDate(
                      item.startPhase,
                      "dd/MM"
                    )} - ${useFormattedDate(item.endPhase, "dd/MM")})`}
                  </span>
                  {item &&
                    item?.tasks &&
                    Array.isArray(item?.tasks) &&
                    item?.tasks.map((task) => <CardTasks task={task} />)}
                  <div
                    className="add-tasks-plans-guide"
                    onClick={() => {
                      setIndex(index);
                      setShowModalAddTasks(true);
                    }}
                  >
                    +
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {showModalAddTasks && (
        <Tasks
          setShowModalAddTasks={setShowModalAddTasks}
          setPhase={setPhase}
          phase={phase}
          index={index}
        />
      )}
      {showModalAddPhase && (
        <Phase
          setPhase={setPhase}
          phase={phase}
          setShowModalAddPhase={setShowModalAddPhase}
        />
      )}
    </div>
  );
};

export default StepPlansTask;

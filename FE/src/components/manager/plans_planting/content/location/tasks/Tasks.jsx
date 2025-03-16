import React, { useState } from "react";
import ReactDOM from "react-dom";

const Tasks = () => {
  const modalRoot = document.body;
  const [taskDescription, setTaskDescription] = useState();
  const [taskType, setTaskType] = useState();
  const [taskName, setTaskName] = useState();
  const [taskTypesData, setTaskTypesData] = useState();

  const handleFetchDataTaskType = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task-type`
      );
      if (response.status === 200) {
        setTaskTypesData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchDataTaskType();
  }, []);

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            NEW TASK
          </h4>
          <Form.Group>
            <Form.Label className="text-label-login">Name</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Description</Form.Label>
            <Form.Control
              className="input-login input-addition"
              as={"textarea"}
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Task Type</Form.Label>
            <Form.Select
              onChange={(e) => setTaskType(e.target.value)}
              className="input-login input-addition input-plant-type-create-plant"
            >
              {taskTypesData &&
                Array.isArray(taskTypesData) &&
                taskTypesData.map((item) => (
                  <option value={item.taskTypeId}>{item.taskTypeName}</option>
                ))}
            </Form.Select>
          </Form.Group>

          <Button text="Create Task" className="button-create-plant" />
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

export default Tasks;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ICONS from "../../../../constant/Image";
import "./Modal.css";
import { Form } from "react-bootstrap";
import BASE from "../../../../constant/base";
import axios from "axios";
import useFormattedDate from "../../../../hook/useFormatDate";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../constant/localStorage";
import { jwtDecode } from "jwt-decode";
import Button from "../../../common/button/Button";
import ROLES from "../../../../constant/role";

const NOT_USE = "Not Use";

const Modal = ({ setShowModalDetail, itemDetail, setItemDetail }) => {
  const [status, setStatus] = useState();
  const [showModalSelectWorker, setShowModalSelectWorker] = useState(false);
  const [workerAssigned, setWorkerAssigned] = useState();
  const [workerUnAssigned, setWorkerUnAssigned] = useState();
  const [description, setDescription] = useState();
  const [startDate, setStartDate] = useState();
  const [dueDate, setDueDate] = useState();
  const [itemStatus, setItemStatus] = useState();
  const [isManager, setIsManager] = useState();

  const [water, setWater] = useState();
  const [equipment, setEquiqment] = useState();
  const [chemical, setChemical] = useState();
  const [plantPot, setPlanPot] = useState();
  const [plantMedium, setPlantMedium] = useState();

  const [plantMediumList, setPlantMediumList] = useState();
  const [plantPotList, setPlantPotList] = useState();
  const [waterList, setWaterList] = useState();
  const [equiqmentList, setEquiqmentList] = useState();
  const [chemicalList, setChemicalList] = useState();

  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION,
    ""
  );
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])

  const handleFetchTaskStatus = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/task-status`);
      if (!response || response.status !== 200) throw new Error();
      setStatus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalDetail = () => {
    setShowModalDetail(false);
    setItemDetail();
  };

  const handleFetchPlantMedium = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/plant-medium`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!response || response.status !== 200) throw new Error();
      setPlantMediumList([NOT_USE, ...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchPlantPot = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/plant-pot`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!response || response.status !== 200) throw new Error();
      setPlantPotList([NOT_USE, ...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchWater = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/water`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!response || response.status !== 200) throw new Error();
      setWaterList([NOT_USE, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetchEquipment = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/farming-equipment/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!response || response.status !== 200) throw new Error();
      setEquiqmentList([NOT_USE, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetchChemical = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/chemical`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!response || response.status !== 200) throw new Error();
      setChemicalList([NOT_USE, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetchUserAssigned = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/task/users-assigned?taskID=${itemDetail.taskId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      );
      if (!response || response.status !== 200) throw new Error();
      setWorkerAssigned(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchUserUnAssigned = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/task/users-un-assigned?taskID=${itemDetail.taskId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      );
      if (!response || response.status !== 200) throw new Error();
      setWorkerUnAssigned(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignWorker = async (worker) => {
    try {
      const response = await axios.post(
        `${BASE.BASE_URL}/task/users?taskID=${itemDetail.taskId}&userID=${worker.id
        }&doerId=${jwtDecode(atob(accountLoginInformation))?.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      );
      if (!response || response.status !== 201) throw new Error();

      handleFetchUserAssigned();
      handleFetchUserUnAssigned();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnAssignWorker = async (worker) => {
    try {
      const response = await axios.delete(
        `${BASE.BASE_URL}/task/users?taskID=${itemDetail.taskId}&userID=${worker.id
        }&doerId=${jwtDecode(atob(accountLoginInformation))?.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      );
      if (!response || response.status !== 201) throw new Error();

      handleFetchUserAssigned();
      handleFetchUserUnAssigned();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (status) => {
    const data = {
      taskId: itemDetail.taskId,
      createdAt: itemDetail.createdAt,
      completedAt: itemDetail.completedAt,
      startDate: itemDetail.startDate,
      dueDate: itemDetail.dueDate,
      taskDescription: itemDetail.taskDescription,
      taskStatus: status,
      taskType: itemDetail.taskTypeId,
    };
    try {
      const response = await axios.put(`${BASE.BASE_URL}/task`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }, data);
      if (!response) throw new Error();
      setItemStatus(status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStartDate = async (startDate) => {
    const data = {
      taskId: itemDetail.taskId,
      createdAt: itemDetail.createdAt,
      completedAt: itemDetail.completedAt,
      startDate: startDate,
      dueDate: itemDetail.dueDate,
      taskDescription: itemDetail.taskDescription,
      taskStatus: itemDetail.taskStatusId,
      taskType: itemDetail.taskTypeId,
    };
    try {
      const response = await axios.put(`${BASE.BASE_URL}/task`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }, data);
      if (!response) throw new Error();
      setStartDate(startDate);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleUpdateDueDate = async (dueDate) => {
    const data = {
      taskId: itemDetail.taskId,
      createdAt: itemDetail.createdAt,
      completedAt: itemDetail.completedAt,
      startDate: itemDetail.startDate,
      dueDate: dueDate,
      taskDescription: itemDetail.taskDescription,
      taskStatus: itemDetail.taskStatusId,
      taskType: itemDetail.taskTypeId,
    };
    try {
      const response = await axios.put(`${BASE.BASE_URL}/task`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }, data);
      if (!response) throw new Error();
      setDueDate(dueDate);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (jwtDecode(atob(accountLoginInformation))?.role === ROLES.MANAGER) {
      setIsManager(true);
    }
  }, [accountLoginInformation]);

  useEffect(() => {
    if (!workerAssigned) {
      handleFetchUserAssigned();
    }
    if (!workerUnAssigned) {
      handleFetchUserUnAssigned();
    }
    if (!description) {
      setDescription(itemDetail?.taskDescription);
    }
    if (!startDate) {
      setStartDate(useFormattedDate(itemDetail?.startDate, "yyyy-MM-dd"));
    }
    if (!dueDate) {
      setDueDate(useFormattedDate(itemDetail?.dueDate, "yyyy-MM-dd"));
    }
    if (!itemStatus) {
      setItemStatus(itemDetail?.taskStatusId);
    }
  }, [itemDetail]);

  useEffect(() => {
    if (!status) {
      handleFetchTaskStatus();
    }
  }, []);

  useEffect(() => {
    if (!waterList) {
      handleFetchWater();
    }
    if (!equiqmentList) {
      handleFetchEquipment();
    }
    if (!chemicalList) {
      handleFetchChemical();
    }
    if (!plantPotList) {
      handleFetchPlantPot();
    }
    if (!plantMediumList) {
      handleFetchPlantMedium();
    }
  }, []);

  const modalRoot = document.body;
  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        {console.log(itemDetail)}
        <h5 className="modal-schedule-task-h5">{itemDetail.taskTypeName}</h5>
        <div className="modal-schedule-task-assign-worker mt-4">
          <div className="modal-schedule-add-worker">
            <img
              src={ICONS.icon_add_worker}
              onClick={() => setShowModalSelectWorker((prev) => !prev)}
            />
            {showModalSelectWorker && (
              <ul className="text select-worker-input">
                <Form.Control
                  className="input-login input-addition input-characteristis-create-plant input-select-schedule-task"
                  type="text"
                  placeholder="Type a name or email address"
                />
                {workerAssigned && workerAssigned.length > 0 && (
                  <label className="schedule-label mt-2">Assigned</label>
                )}
                {workerAssigned &&
                  workerAssigned.map((item) => (
                    <li>
                      <span>{item.userName}</span>
                      <img
                        className="icon-close"
                        width="15px"
                        height="15px"
                        src={ICONS.icon_close}
                        alt=""
                        onClick={() => handleUnAssignWorker(item)}
                      />
                    </li>
                  ))}
                {workerUnAssigned && workerUnAssigned.length > 0 && (
                  <label className="schedule-label mt-3">Suggestion</label>
                )}
                {workerUnAssigned &&
                  workerUnAssigned.map((item) => (
                    <li onClick={() => handleAssignWorker(item)}>
                      <span>{item.userName}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          {workerAssigned &&
            workerAssigned.map((item) => (
              <div className="modal-schedule-add-worker">
                {String(item.userName).charAt(0)}
              </div>
            ))}
        </div>
        <div className="modal-schedule-time-line">
          <div>
            <label className="schedule-label">Status</label>
            <Form.Select
              value={itemStatus}
              onChange={(event) => handleUpdateStatus(event.target.value)}
              className="input-login input-addition input-plant-type-create-plant input-select-schedule-task"
            >
              {status &&
                Array.isArray(status) &&
                status.map((item) => (
                  <option value={item.taskStatusId}>
                    {item.taskStatusName}
                  </option>
                ))}
            </Form.Select>
          </div>
          <div></div>
          <div></div>
          <div>
            <label className="schedule-label">Start date</label>
            <Form.Control
              className="input-login input-addition input-name-create-plant input-select-schedule-task"
              type="date"
              value={startDate}
              onChange={(event) => handleUpdateStartDate(event.target.value)}
            />
          </div>
          <div>
            <label className="schedule-label">Due date</label>
            <Form.Control
              className="input-login input-addition input-name-create-plant input-select-schedule-task"
              type="date"
              placeholder="Start any time"
              value={dueDate}
              disabled={!isManager}
              onChange={(event) => handleUpdateDueDate(event.target.value)}
            />
          </div>
          <div></div>
        </div>

        <div className="mt-5">
          <label className="schedule-label ">Description</label>
          <Form.Control
            className="input-login-textarea"
            as="textarea"
            rows={10}
            placeholder="The Orange Glow™ Knock Out® Rose is an upright, bushy shrub that produces abundant clusters of very full, cupped blooms..."
          />
        </div>
        <div className="mt-3 report-task-modal-container">
          <h6>Report</h6>
          <div className="report-input-modal-container">
            <div className="report-task-modal">
              <label className="report-label">Water</label>
              <div className="report-task-modal-input">
                <Form.Select
                  value={water}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === NOT_USE) {
                      setWater();
                    } else {
                      setWater(value);
                    }
                  }}
                  className="input-login input-addition input-plant-type-create-plant input-select-schedule-task report-task-input-select"
                >
                  {waterList &&
                    Array.isArray(waterList) &&
                    waterList.map((item, indexWater) => (
                      <option value={item.waterId}>
                        {indexWater === 0 ? item : item.waterName}
                      </option>
                    ))}
                </Form.Select>

                <Form.Control
                  className="input-login input-addition input-name-create-plant input-width-report-modal"
                  type="number"
                  placeholder="Volumn"
                />
              </div>
            </div>
            <div className="report-task-modal mt-3">
              <label className="report-label">Equipment</label>
              <div className="report-task-modal-input">
                <Form.Select
                  value={equipment}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === NOT_USE) {
                      setEquiqment();
                    } else {
                      setEquiqment(value);
                    }
                  }}
                  className="input-login input-addition input-plant-type-create-plant input-select-schedule-task report-task-input-select"
                >
                  {equiqmentList &&
                    Array.isArray(equiqmentList) &&
                    equiqmentList.map((item, indexEquiqment) => (
                      <option value={item.id}>
                        {indexEquiqment === 0 ? item : item.name}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>
            <div className="report-task-modal mt-3">
              <label className="report-label">Chemical</label>
              <div className="report-task-modal-input">
                <Form.Select
                  value={chemical}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === NOT_USE) {
                      setChemical();
                    } else {
                      setChemical(value);
                    }
                  }}
                  className="input-login input-addition input-plant-type-create-plant input-select-schedule-task report-task-input-select"
                >
                  {chemicalList &&
                    Array.isArray(chemicalList) &&
                    chemicalList.map((item, indexChemical) => (
                      <option value={item.id}>
                        {indexChemical === 0 ? item : item.name}
                      </option>
                    ))}
                </Form.Select>

                <Form.Control
                  className="input-login input-addition input-name-create-plant"
                  type="number"
                  placeholder="Volumn"
                />
              </div>
            </div>
            <div className="report-task-modal mt-3">
              <label className="report-label">Plant Pot</label>
              <div className="report-task-modal-input">
                <Form.Select
                  value={plantPot}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === NOT_USE) {
                      setPlanPot();
                    } else {
                      setPlanPot(value);
                    }
                  }}
                  className="input-login input-addition input-plant-type-create-plant input-select-schedule-task report-task-input-select"
                >
                  {plantPotList &&
                    Array.isArray(plantPotList) &&
                    plantPotList.map((item, indexChemical) => (
                      <option value={item.potId}>
                        {indexChemical === 0 ? item : item.potSize}
                      </option>
                    ))}
                </Form.Select>

                <Form.Control
                  className="input-login input-addition input-name-create-plant"
                  type="number"
                  placeholder="Quantity"
                />
              </div>
            </div>
            <div className="report-task-modal mt-3">
              <label className="report-label">Plant Medium</label>
              <div className="report-task-modal-input">
                <Form.Select
                  value={plantMedium}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === NOT_USE) {
                      setPlantMedium();
                    } else {
                      setPlantMedium(value);
                    }
                  }}
                  className="input-login input-addition input-plant-type-create-plant input-select-schedule-task report-task-input-select"
                >
                  {plantMediumList &&
                    Array.isArray(plantMediumList) &&
                    plantMediumList.map((item, indexChemical) => (
                      <option value={item.mediumId}>
                        {indexChemical === 0 ? item : item.mediumName}
                      </option>
                    ))}
                </Form.Select>

                <Form.Control
                  className="input-login input-addition input-name-create-plant"
                  type="number"
                  placeholder="Medium Weight"
                />
              </div>
            </div>
          </div>
          <div className="button-report-task">
            <div style={{ width: "200px" }}>
              <Button text="Report" />
            </div>
          </div>
        </div>
        <img
          className="icon-close"
          src={ICONS.icon_close}
          alt=""
          onClick={() => handleCloseModalDetail()}
        />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
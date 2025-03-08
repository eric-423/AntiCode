import React, { useState } from "react";
import "./Body.css";
import ICONS from "../../../../../../constant/Image";
import UpdateTask from "../../update_task/UpdateTask";
import useGridColumn from "../../../../../../hook/useGridColumn";
import NewTaskExist from "../../new_task_exist/NewTaskExist";
import { set } from "date-fns";

const Body = ({ item, index, itemsActive, handleSelectItem , listTitle, taskStatusData, taskTypesData, setRefreshData}) => {
  const [showModal,setShowModal] = useState(false)
  const [itemUpdate,setItemUpdate] = useState()
  const [isUpdate,setIsUpdate] = useState(false)
  const [modalType,setModalType] = useState(null)
  const [itemExist,setItemExist] = useState()
  const isActive = Array.isArray(itemsActive) && itemsActive.includes(item.taskId);
  const gridColumnTemplate = useGridColumn(listTitle)

  const handleShowUpdatePopup = (event, item) => {
    setItemUpdate(item)
    setModalType('update')
    event.stopPropagation();
    setShowModal(true)
  };

  const handleShowAddFromExistPopup = (event, item) => {
    setItemExist(item)
    setModalType('add')
    event.stopPropagation();
    setShowModal(true)
  };

  const taskStatusName = taskStatusData?.find(element => element.taskStatusId === item.taskStatusId)
  const taskTypeName = taskTypesData?.find(element => element.taskTypeId === item.taskTypeId)
  return (
    <>
      {showModal && modalType === "update" && (
      <UpdateTask 
        itemUpdate={itemUpdate} 
        setShowModal={setShowModal} 
        setRefreshData={setRefreshData} 
      />
    )}

    {showModal && modalType === "add" && (
      <NewTaskExist 
        itemExist={itemExist} 
        setShowModal={setShowModal} 
        setRefreshData={setRefreshData} 
      />
    )}

      <ul
        className={isActive ? "body-table body-table-active" : "body-table"}
        onClick={() => handleSelectItem(item)}
        style={{ gridTemplateColumns: gridColumnTemplate }}
      >
        <li>{index + 1}</li>
        <li>{item.taskName}</li>
        <li>{item.createdAt}</li>
        <li>{item.completedAt}</li>
        <li>{item.startDate}</li>
        <li>{item.dueDate}</li>
        <li>{item.taskDescription}</li>
        <li>{taskTypeName && taskTypeName.taskTypeName}</li>
        <li>{taskStatusName && taskStatusName.taskStatusName}</li>
        <li>
          <div
            onClick={(event) => handleShowUpdatePopup(event, item)}
            className="update-table-body"
          >
            <img src={ICONS.icon_update} alt="" />
          </div>
        </li>

        <li><div
            onClick={(event) => handleShowAddFromExistPopup(event, item)}
            className="update-table-body"
          >
            <img src={ICONS.icon_add} alt="" />
          </div>
          </li>

        {isActive ? (
          <img className="tick-active-table-item" src={ICONS.icon_tick} />
        ) : null}
      </ul>
    </>
  );
};

export default Body;

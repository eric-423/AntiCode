import React, { useState } from "react";
import "./Body.css";
import ICONS from "../../../../../../constant/Image";
import UpdateTask from "../../update_task/UpdateTask";
import useGridColumn from "../../../../../../hook/useGridColumn";

const Body = ({ item, index, itemsActive, handleSelectItem , listTitle, plantTypesData, setRefreshData}) => {
  const [showModal,setShowModal] = useState(false)
  const [itemUpdate,setItemUpdate] = useState()
  const isActive = Array.isArray(itemsActive) && itemsActive.includes(item.plantId);
  const gridColumnTemplate = useGridColumn(listTitle)

  const handleShowUpdatePopup = (event, item) => {
    setItemUpdate(item)
    event.stopPropagation();
    setShowModal(true)
  };
  const taskStatusName = taskStatusData?.find(element => element.taskStatusId === item.taskStatusId)
  const taskTypeName = taskTypesData?.find(element => element.taskTypeId === item.taskTypeId)
  return (
    <>
      {showModal && <UpdateTask itemUpdate={itemUpdate} setShowModal={setShowModal} setRefreshData={setRefreshData} />}
      <ul
        className={isActive ? "body-table body-table-active" : "body-table"}
        onClick={() => handleSelectItem(item)}
        style={{ gridTemplateColumns: gridColumnTemplate }}
      >
        <li>{index + 1}</li>
        <li>{item.createdAt}</li>
        <li>{item.completedAt}</li>
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
        {isActive ? (
          <img className="tick-active-table-item" src={ICONS.icon_tick} />
        ) : null}
      </ul>
    </>
  );
};

export default Body;

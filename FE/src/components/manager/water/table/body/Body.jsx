import React, { useState } from "react";
import "./Body.css";
import ICONS from "../../../../../constant/Image";
import UpdateWater from "../../update_water/UpdateWater";
import useGridColumn from "../../../../../hook/useGridColumn";

const Body = ({ item, index, itemsActive, handleSelectItem , listTitle, setRefreshData}) => {
  const [showModal,setShowModal] = useState(false)
  const [itemUpdate,setItemUpdate] = useState()
  const isActive = Array.isArray(itemsActive) && itemsActive.includes(item.waterId);
  const gridColumnTemplate = useGridColumn(listTitle)

  const handleShowUpdatePopup = (event, item) => {
    setItemUpdate(item)
    event.stopPropagation();
    setShowModal(true)
  };

  return (
    <>
      {showModal && <UpdateWater itemUpdate={itemUpdate} setShowModal={setShowModal} setRefreshData={setRefreshData} />}
      <ul
        className={isActive ? "body-table body-table-active" : "body-table"}
        onClick={() => handleSelectItem(item)}
        style={{ gridTemplateColumns: gridColumnTemplate }}
      >
        <li>{index + 1}</li>
        <li>{item.waterName}</li>
        <li>{item.purity}</li>
        <li>{item.phlevel}</li>
        <li>{item.volumeAvailable}</li>
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

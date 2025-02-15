import React, { useState } from "react";
import "./Body.css";
import ICONS from "../../../../../../constant/Image";
import UpdatePlant from "../../update_plant/UpdatePlant";
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
  const plantTypeName = plantTypesData?.find(element => element.plantTypeId === item.plantTypeId)
  return (
    <>
      {showModal && <UpdatePlant itemUpdate={itemUpdate} setShowModal={setShowModal} setRefreshData={setRefreshData} />}
      <ul
        className={isActive ? "body-table body-table-active" : "body-table"}
        onClick={() => handleSelectItem(item)}
        style={{ gridTemplateColumns: gridColumnTemplate }}
      >
        <li>{index + 1}</li>
        <li>{item.plantName}</li>
        <li>{item.characteristics}</li>
        <li>{item.description}</li>
        <li>{item.species}</li>
        <li>{item.attracts}</li>
        <li>{item.hardiness}</li>
        <li>{plantTypeName && plantTypeName.plantTypeName}</li>
        <li>{item.heatZones}</li>
        <li>{item.size}</li>
        <li>{item.price}</li>
        <li>{item.seed ? "seed": "tree"}</li>
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

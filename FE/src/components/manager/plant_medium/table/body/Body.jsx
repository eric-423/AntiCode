import React, { useState } from 'react'
import './Body.css'
import ICONS from '../../../../../constant/Image'
import UpdatePlantMedium from '../../update_plant_medium/UpdatePlantMedium'
import useGridColumn from '../../../../../hook/useGridColumn'

const Body = ({
  item,
  index,
  itemsActive,
  handleSelectItem,
  setRefreshData,
  listTitle
}) => {
  const [showModal, setShowModal] = useState(false)
  const [itemUpdate, setItemUpdate] = useState()
  const isActive =
    Array.isArray(itemsActive) && itemsActive.includes(item.farmId)

  const handleShowUpdatePopup = (event, item) => {
    setItemUpdate(item)
    event.stopPropagation()
    setShowModal(true)
  }
  const gridColumnTemplate = useGridColumn(listTitle)
  return (
    <>
      {showModal && (
        <UpdatePlantMedium
          itemUpdate={itemUpdate}
          setShowModal={setShowModal}
          setRefreshData={setRefreshData}
        />
      )}
      <ul
        className={isActive ? 'body-table body-table-active' : 'body-table'}
        onClick={() => handleSelectItem(item)}
        style={{ gridTemplateColumns: gridColumnTemplate }}
      >
        <li>{index + 1}</li>
        <li>{item.mediumName}</li>
        <li>{item.description}</li>
        <li>{item.mediumWeightAvailable}</li>
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
  )
}

export default Body

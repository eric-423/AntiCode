import React, { useState } from 'react'
import './Body.css'
import ICONS from '../../../../../../constant/Image'
import UpdateLocation from '../../update_location/UpdateLocation'

const Body = ({
  item,
  index,
  itemsActive,
  handleSelectItem,
  setRefreshData,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [itemUpdate, setItemUpdate] = useState()
  const isActive =
    Array.isArray(itemsActive) && itemsActive.includes(item.locationId)

  const handleShowUpdatePopup = (event, item) => {
    setItemUpdate(item)
    event.stopPropagation()
    setShowModal(true)
  }

  return (
    <>
      {showModal && (
        <UpdateLocation
          itemUpdate={itemUpdate}
          setShowModal={setShowModal}
          setRefreshData={setRefreshData}
        />
      )}
      <ul
        className={isActive ? 'body-table body-table-active' : 'body-table'}
        onClick={() => handleSelectItem(item)}
      >
        <li>{index + 1}</li>
        <li>{item.locationName}</li>
        <li>{item.locationExtent}</li>
        <li>{item.locationWidth}</li>
        <li>{item.locationLength}</li>
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

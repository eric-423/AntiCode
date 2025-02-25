import React, { useState } from 'react'
import './Body.css'
import ICONS from '../../../../../../constant/Image'
import UpdatePlaingLocation from '../../update_area/UpdateArea'

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
    Array.isArray(itemsActive) && itemsActive.includes(item.areaId)

  const handleShowUpdatePopup = (event, item) => {
    setItemUpdate(item)
    event.stopPropagation()
    setShowModal(true)
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = date.toLocaleDateString('en-US', options)
    return formattedDate
  }
  return (
    <>
      {showModal && (
        <UpdatePlaingLocation
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
        <li>{item.areaName}</li>
        <li>{item.areaExtend}</li>
        <li>{item.areaWidth}</li>
        <li>{item.areaLength}</li>
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

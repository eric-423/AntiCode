import React, { useState } from 'react'
import './Body.css'
import ICONS from '../../../../../../constant/Image'
import UpdatePlaingLocation from '../../update_planting_location/UpdatePlantingLocation'
import useGridColumn from '../../../../../../hook/useGridColumn'

const Body = ({
  item,
  index,
  itemsActive,
  handleSelectItem,
  setRefreshData,
  listTitle,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [itemUpdate, setItemUpdate] = useState()
  const isActive =
    Array.isArray(itemsActive) && itemsActive.includes(item.plantingLocationId)

  const handleShowUpdatePopup = (event, item) => {
    event.stopPropagation()
    handleSelectItem(item)
    setItemUpdate(item)
    setShowModal(true)
  }

  const gridColumnTemplate = useGridColumn(listTitle)

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
        style={{ gridTemplateColumns: gridColumnTemplate }}
      >
        <li>{index + 1}</li>
        <li>{item.locationName}</li>
        <li>{item.plantName}</li>
        <li>{formatDate(item.startDate)}</li>
        <li>{formatDate(item.endDate)}</li>
        <li>
          {item.harvest ? <span>Harvested</span> : <span>Not Harvested</span>}
        </li>
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

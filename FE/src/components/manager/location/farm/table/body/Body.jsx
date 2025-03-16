import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Body.css'
import ICONS from '../../../../../../constant/Image'
import UpdateFarm from '../../update_farm/UpdateFarm'
import useGridColumn from '../../../../../../hook/useGridColumn'

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
  const navigate = useNavigate()

  const handleViewAreas = (event, farmId) => {
    event.stopPropagation()
    navigate(`/manager/location/area/api/${farmId}`)
  }

  return (
    <>
      {showModal && (
        <UpdateFarm
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
        <li>{item.farmName}</li>
        <li>{item.farmExtend}</li>
        <li>{item.farmWidth}</li>
        <li>{item.farmLength}</li>
        <li>{item.farmAddress}</li>
        <li>
          <button onClick={(event) => handleViewAreas(event, item.farmId)}>
            See details
          </button>
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

import React, { useEffect, useRef, useState } from 'react'
import './ToolBar.css'
import SearchBar from '../../../../common/search_bar/SearchBar'
import Filter from '../../../../common/filter/Filter'
import NewLocation from '../new_location/NewLocation'
import useLocalStorage from 'use-local-storage'

const ToolBar = ({ setRefreshData }) => {
  const [selectedLocation, setSelectedLocation] = useLocalStorage(
    'manager_location_selected',
    ''
  )
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }
  const handleDeleteLocation = async () => {
    try {
      let id = ''
      Array.isArray(selectedArea) &&
        selectedArea.forEach((element, index) => {
          if (index === selectedArea.length - 1) {
            id += element
          } else {
            id += element
          }
        })

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/location/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedLocation([])
      setRefreshData((prev) => !prev)
    }
  }

  return (
    <div className="tool-bar-plant">
      <Filter />
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div
          onClick={() => handleDeleteLocation()}
          className={
            selectedLocation && selectedLocation.length > 0
              ? 'plant-button delete-plant-button-active'
              : 'plant-button delete-plant-button-non-active'
          }
        >
          Delete
        </div>
        <div
          className="plant-button new-plant-button"
          onClick={() => handleShowModal()}
        >
          Create Plant
        </div>
      </div>
      {showModal && (
        <NewLocation
          setRefreshData={setRefreshData}
          setShowModal={setShowModal}
        />
      )}
    </div>
  )
}

export default ToolBar

import React, { useEffect, useRef, useState } from 'react'
import './ToolBar.css'
import SearchBar from '../../../../common/search_bar/SearchBar'
import Filter from '../../../../common/filter/Filter'
import NewPlantingLocation from '../new_planting_location/NewPlantingLocation'
import useLocalStorage from 'use-local-storage'

const ToolBar = ({ setRefreshData }) => {
  const [selectedPlantingLocation, setSelectedPlantingLocation] =
    useLocalStorage('manager_planting_location_selected', '')
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }
  const handleDeletePlant = async () => {
    try {
      let id = ''
      Array.isArray(selectedPlantingLocation) &&
        selectedPlantingLocation.forEach((element, index) => {
          if (index === selectedPlantingLocation.length - 1) {
            id += element
          } else {
            id += element
          }
        })
      console.log(id)
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/planting-location/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (error) {
    } finally {
      setSelectedPlantingLocation([])
      setRefreshData((prev) => !prev)
    }
  }

  return (
    <div className="tool-bar-plant">
      <Filter />
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div
          onClick={() => handleDeletePlant()}
          className={
            selectedPlantingLocation && selectedPlantingLocation.length > 0
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
          Create
        </div>
      </div>
      {showModal && (
        <NewPlantingLocation
          setRefreshData={setRefreshData}
          setShowModal={setShowModal}
        />
      )}
    </div>
  )
}

export default ToolBar

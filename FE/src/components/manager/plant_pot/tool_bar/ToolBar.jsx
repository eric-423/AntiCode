import React, { useEffect, useRef, useState } from 'react'
import './ToolBar.css'
import SearchBar from '../../../common/search_bar/SearchBar'
import Filter from '../../../common/filter/Filter'
import NewPlantPot from '../new_plant_pot/NewPlantPot'
import useLocalStorage from 'use-local-storage'

const ToolBar = ({ setRefreshData }) => {
  const [selectedPlantPot, setSelectedPlantPot] = useLocalStorage(
    'manager_plant_pot_selected',
    ''
  )
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }
  const handleDeletePlantPot = async () => {
    try {
      let id = ''
      Array.isArray(selectedPlantPot) &&
        selectedPlantPot.forEach((element, index) => {
          if (index === selectedPlantPot.length - 1) {
            id += element
          } else {
            id += element
          }
        })

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant-pot/${id}`,
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
      selectedPlantPot([])
      setRefreshData((prev) => !prev)
    }
  }

  return (
    <div className="tool-bar-plant">
      <Filter />
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div
          onClick={() => handleDeletePlantPot()}
          className={
            selectedPlantPot && selectedPlantPot.length > 0
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
          Create Plant Pot
        </div>
      </div>
      {showModal && (
        <NewPlantPot
          setRefreshData={setRefreshData}
          setShowModal={setShowModal}
        />
      )}
    </div>
  )
}

export default ToolBar

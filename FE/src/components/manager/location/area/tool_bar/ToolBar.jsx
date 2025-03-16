import React, { useEffect, useRef, useState } from 'react'
import './ToolBar.css'
import SearchBar from '../../../../common/search_bar/SearchBar'
import Filter from '../../../../common/filter/Filter'
import NewArea from '../new_area/NewArea'
import useLocalStorage from 'use-local-storage'

const ToolBar = ({ setRefreshData }) => {
  const [selectedArea, setSelectedArea] = useLocalStorage(
    'manager_area_selected',
    ''
  )
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }
  const handleDeleteArea = async () => {
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
console.log(id);

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/area/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )   
    } catch (error) {
      console.log(error);      
    } finally {
      setSelectedArea([])
      setRefreshData((prev) => !prev)
    }
  }

  return (
    <div className="tool-bar-plant">
      <Filter />
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div
          onClick={() => handleDeleteArea()}
          className={
            selectedArea && selectedArea.length > 0
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
          Create Area
        </div>
      </div>
      {showModal && (
        <NewArea setRefreshData={setRefreshData} setShowModal={setShowModal} />
      )}
    </div>
  )
}

export default ToolBar

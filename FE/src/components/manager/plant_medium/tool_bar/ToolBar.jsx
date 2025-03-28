import React, { useEffect, useRef, useState } from 'react'
import './ToolBar.css'
import SearchBar from '../../../common/search_bar/SearchBar'
import Filter from '../../../common/filter/Filter'
import NewFarm from '../new_plant_medium/NewPlantMedium'
import useLocalStorage from 'use-local-storage'
import LOCALSTORAGE from '../../../../constant/localStorage'

const ToolBar = ({ setRefreshData }) => {
  const [selectedPlantMedium, setSelectedPlantMedium] = useLocalStorage(
    'manager_plant_medium_selected',
    ''
  )
  const [showModal, setShowModal] = useState(false)

  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }
  const handleDeletePlantMedium = async () => {
    try {
      let id = ''
      Array.isArray(selectedPlantMedium) &&
        selectedPlantMedium.forEach((element, index) => {
          if (index === selectedPlantMedium.length - 1) {
            id += element
          } else {
            id += element
          }
        })

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant-medium/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedPlantMedium([])
      setRefreshData((prev) => !prev)
    }
  }

  return (
    <div className="tool-bar-plant">
      <Filter />
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div
          onClick={() => handleDeletePlantMedium()}
          className={
            selectedPlantMedium && selectedPlantMedium.length > 0
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
          Create Plant Medium
        </div>
      </div>
      {showModal && (
        <NewFarm setRefreshData={setRefreshData} setShowModal={setShowModal} />
      )}
    </div>
  )
}

export default ToolBar

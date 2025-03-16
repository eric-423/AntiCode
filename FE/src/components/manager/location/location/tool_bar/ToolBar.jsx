import React, { useEffect, useRef, useState } from 'react'
import './ToolBar.css'
import SearchBar from '../../../../common/search_bar/SearchBar'
import Filter from '../../../../common/filter/Filter'
import NewLocation from '../new_location/NewLocation'
import useLocalStorage from 'use-local-storage'
import { toast } from "react-toastify/unstyled";

const ToolBar = ({ setRefreshData }) => {
  const [selectedLocation, setSelectedLocation] = useLocalStorage(
    'manager_location_selected',
    ''
  )
  const showToastMessageSuccess = (message) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 1000,
      });
    };
    const showToastMessageFail = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 1000,
      });
    };
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }
  const handleDeleteLocation = async () => {
    try {
      let id = ''
      Array.isArray(selectedLocation) &&
        selectedLocation.forEach((element, index) => {
          if (index === selectedLocation.length - 1) {
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
      if (!response || response.status !== 200) throw new Error();
      showToastMessageSuccess("Location was deleted!");   
    } catch (error) {
      showToastMessageFail("Location can not delete!");    
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
          Create Location
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

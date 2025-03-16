import React, { useEffect, useRef, useState } from 'react'
import './ToolBar.css'
import SearchBar from '../../../../common/search_bar/SearchBar'
import Filter from '../../../../common/filter/Filter'
import NewFarm from '../new_farm/NewFarm'
import useLocalStorage from 'use-local-storage'
import { toast } from "react-toastify/unstyled";

const ToolBar = ({ setRefreshData }) => {
  const [selectedFarm, setSelectedFarm] = useLocalStorage(
    'manager_farm_selected',
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
  const handleDeleteFarm = async () => {
    try {
      let id = ''
      Array.isArray(selectedFarm) &&
        selectedFarm.forEach((element, index) => {
          if (index === selectedFarm.length - 1) {
            id += element
          } else {
            id += element
          }
        })

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/farm/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response || response.status !== 200) throw new Error();
      showToastMessageSuccess("Farm was deleted!");   
    } catch (error) {
      showToastMessageFail("Farm can not delete!");    
    } finally {
      setSelectedFarm([])
      setRefreshData((prev) => !prev)
    }
  }

  return (
    <div className="tool-bar-plant">
      <Filter />
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div
          onClick={() => handleDeleteFarm()}
          className={
            selectedFarm && selectedFarm.length > 0
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
          Create Farm
        </div>
      </div>
      {showModal && (
        <NewFarm setRefreshData={setRefreshData} setShowModal={setShowModal} />
      )}
    </div>
  )
}

export default ToolBar

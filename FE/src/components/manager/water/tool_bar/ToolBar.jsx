import React, { useEffect, useRef, useState } from "react";
import "./ToolBar.css";
import SearchBar from "../../../common/search_bar/SearchBar";
import Filter from "../../../common/filter/Filter";
import NewWater from "../new_water/NewWater";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import { toast } from "react-toastify/unstyled";

const ToolBar = ({ setRefreshData }) => {
  const [selectedPlants, setSelectedPlants] = useLocalStorage(
    "manager_water_selected",
    ""
  );
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
   const showToastMessageSuccess = (message) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 1000,
      });
    };
    const showToastMessageFail = (message) => {
      toast.error(message.replace(/^.*Exception:\s*/, ''), {
        position: "top-right",
        autoClose: 1000,
      });
    };
  const handleDeletePlant = async () => {
    try {
      let param = "";
      Array.isArray(selectedPlants) &&
        selectedPlants.forEach((element, index) => {
          if (index === selectedPlants.length - 1) {
            param += `listWaterId=${element}`;
          } else {
            param += `listWaterId=${element}&`;
          }
        });
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/water?${param}`
      );
      if (!response || response.status !== 200) throw new Error();
      showToastMessageSuccess("Water was deleted !");
    } catch (error) {
      showToastMessageFail(error.response.data.message || 'Cannot delete water');
    } finally {
      setRefreshData((prev) => !prev);
    }
  };

  return (
    <div className="tool-bar-plant">
      <Filter />
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div
          onClick={() => handleDeletePlant()}
          className={
            selectedPlants && selectedPlants.length > 0
              ? "plant-button delete-plant-button-active"
              : "plant-button delete-plant-button-non-active"
          }
        >
          Delete
        </div>
        <div
          className="plant-button new-plant-button"
          onClick={() => handleShowModal()}
        >
          Add Water
        </div>
      </div>
      {showModal && (
        <NewWater setRefreshData={setRefreshData} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default ToolBar;

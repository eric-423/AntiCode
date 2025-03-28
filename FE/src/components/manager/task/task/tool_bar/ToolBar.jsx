import React, { useEffect, useRef, useState } from "react";
import "./ToolBar.css";
import SearchBar from "../../../../common/search_bar/SearchBar";
import Filter from "../../../../common/filter/Filter";
import NewTask from "../new_task/NewTask";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import { toast } from "react-toastify/unstyled";
import LOCALSTORAGE from "../../../../../constant/localStorage";

const ToolBar = ({ setRefreshData }) => {
  const [selectedTasks, setSelectedTasks] = useLocalStorage(
    "manager_task_selected",
    ""
  );
  const [showModal, setShowModal] = useState(false);
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])
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
      Array.isArray(selectedTasks) &&
        selectedTasks.forEach((element, index) => {
          if (index === selectedTasks.length - 1) {
            param += `listTaskId=${element}`;
          } else {
            param += `listTaskId=${element}&`;
          }
        });
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task?${param}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      );
      if (!response || response.status !== 200) throw new Error();
      showToastMessageSuccess("Task was deleted !");
    } catch (error) {
      showToastMessageFail(error.response.data.message || "Task can not delete !");
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
            selectedTasks && selectedTasks.length > 0
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
          Create Task
        </div>
      </div>
      {showModal && (
        <NewTask setRefreshData={setRefreshData} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default ToolBar;

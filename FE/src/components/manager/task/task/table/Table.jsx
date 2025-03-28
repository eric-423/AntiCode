import React, { useEffect, useState } from "react";
import "./Table.css";
import Header from "../../../../common/table/header/Header";
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import LOCALSTORAGE from "../../../../../constant/localStorage";

const Table = ({ listTitle, refreshData, setRefreshData }) => {
  const [itemsActive, setItemsActive] = useState([]);
  const [selectedPlants, setSelectedPlants] = useLocalStorage(
    "manager_task_selected",
    ""
  );
  const [taskTypesData, setTaskTypesData] = useState();
  const [taskStatusData, setTaskStatusData] = useState();
  const [listItems, setListItems] = useState();
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])


  const handleFetchTaskData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (response && response.status === 200) {
        setListItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchDataTaskType = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task-type`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      );

      if (response.status === 200) {
        setTaskTypesData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchDataTaskStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task-status`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      );

      if (response.status === 200) {
        setTaskStatusData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectItem = (item_index) => {
    if (itemsActive.includes(item_index.taskId)) {
      setItemsActive(itemsActive.filter((item) => {
        return item !== item_index.taskId
      }));
    } else {
      setItemsActive([...itemsActive, item_index.taskId]);
    }
  };
  useEffect(() => {
    handleFetchDataTaskType()
  }, [])
  useEffect(() => {
    handleFetchDataTaskStatus()
  }, [])
  useEffect(() => {
    setSelectedPlants(itemsActive);
  }, [itemsActive]);
  useEffect(() => {
    handleFetchTaskData();
  }, [refreshData]);

  return (
    <>
      <Header listTitle={listTitle} />
      <div className="container-table-body">
        {listItems &&
          listItems.map((item, index) => (
            <Body
              handleSelectItem={handleSelectItem}
              itemsActive={itemsActive}
              item={item}
              key={index}
              taskTypesData={taskTypesData}
              taskStatusData={taskStatusData}
              setRefreshData={setRefreshData}
              listTitle={listTitle}
            />
          ))}
      </div>
    </>
  );
};

export default Table;

import React, { useEffect, useState } from "react";
import "./Table.css";
import Header from "../../../../common/table/header/Header"
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import PropTypes from "prop-types";
import LOCALSTORAGE from "../../../../../constant/localStorage";

const Table = ({ listTitle, refreshData, setRefreshData }) => {
  const [itemsActive, setItemsActive] = useState([]);
  const [selectedPlants, setSelectedPlants] = useLocalStorage(
    "manager_plants_selected",
    ""
  );
  const [plantTypesData, setPlantTypesData] = useState();
  const [listItems, setListItems] = useState();

  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])


  const handleFetchPlantData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant`, {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${token}`,
      }
      );
      if (response && response.status === 200) {
        setListItems(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchDataPlantType = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant-type`, {
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        setPlantTypesData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectItem = (item_index) => {
    if (itemsActive.includes(item_index.plantId)) {
      setItemsActive(itemsActive.filter((item) => {
        return item !== item_index.plantId
      }));
    } else {
      setItemsActive([...itemsActive, item_index.plantId]);
    }
  };
  useEffect(() => {
    handleFetchDataPlantType()
  }, [])
  useEffect(() => {
    setSelectedPlants(itemsActive);
  }, [itemsActive]);
  useEffect(() => {
    if (refreshData) {
      handleFetchPlantData();
      setRefreshData(false);
    }
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
              index={index}
              plantTypesData={plantTypesData}
              setRefreshData={setRefreshData}
              listTitle={listTitle}
            />
          ))}
      </div>
    </>
  );
};
Table.propTypes = {
  listTitle: PropTypes.string.isRequired,
  refreshData: PropTypes.bool.isRequired,
  setRefreshData: PropTypes.func.isRequired,
};

export default Table;

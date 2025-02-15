import React, { useEffect, useState } from "react";
import "./Table.css";
import Header from "../../../../common/table/header/Header";
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";
import axios from "axios";

const Table = ({ listTitle, refreshData , setRefreshData}) => {
  const [itemsActive, setItemsActive] = useState([]);
  const [selectedPlants, setSelectedPlants] = useLocalStorage(
    "manager_plants_selected",
    ""
  );
  const [plantTypesData, setPlantTypesData] = useState();
  const [listItems, setListItems] = useState();
  const handleFetchPlantData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant`
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
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant-type`
      );
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
  },[])
  useEffect(() => {
    setSelectedPlants(itemsActive);
  }, [itemsActive]);
  useEffect(() => {
    handleFetchPlantData();
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

export default Table;

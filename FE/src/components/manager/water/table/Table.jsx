import React, { useEffect, useState } from "react";
import "./Table.css";
import Header from "../../../common/table/header/Header";
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";
import axios from "axios";

const Table = ({ listTitle, refreshData , setRefreshData}) => {
  const [itemsActive, setItemsActive] = useState([]);
  const [selectedPlants, setSelectedPlants] = useLocalStorage(
    "manager_water_selected",
    ""
  );
  const [listItems, setListItems] = useState();
  const handleFetchWaterData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/water`
      );
      if (response && response.status === 200) {
        setListItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectItem = (item_index) => {
    if (itemsActive.includes(item_index.waterId)) {
      setItemsActive(itemsActive.filter((item) => {
        return item !== item_index.waterId
      }));
    } else {
      setItemsActive([...itemsActive, item_index.waterId]);
    }
  };
  useEffect(() => {
    setSelectedPlants(itemsActive);
  }, [itemsActive]);
  useEffect(() => {
    handleFetchWaterData();
  }, [refreshData]);
  console.log(listItems);
  
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
            setRefreshData={setRefreshData}
            listTitle={listTitle}
            />
          ))}
      </div>
    </>
  );
};

export default Table;

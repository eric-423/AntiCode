import {useEffect, useState} from "react";
import "./Table.css";
import Body from "./body/Body.jsx";
import useLocalStorage from "use-local-storage";

const Table = ({listTitle, refreshData}) => {
    const [itemsActive, setItemsActive] = useState([]);
    const [selectedPlants, setSelectedPlants] = useLocalStorage("manager_plants_selected", "");
    const [listItems, setListItems] = useState();
    const handleFetchPlantData = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/v1/plant/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (response.ok) {
                const data = await response.json()
                setListItems(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSelectItem = (item_index) => {
        if (itemsActive.includes(item_index.id)) {
            setItemsActive(itemsActive.filter((item) => item.id !== item_index.id));
        } else {
            setItemsActive([...itemsActive, item_index.id]);
        }
    };
    useEffect(() => {
        setSelectedPlants(itemsActive);
    }, [itemsActive]);
    useEffect(() => {
        handleFetchPlantData()
    }, [refreshData])
    return (
        <>
            <div className="container-table-body">
                {listItems &&
                    listItems.map((item, index) => (
                        <Body
                            handleSelectItem={handleSelectItem}
                            itemsActive={itemsActive}
                            item={item}
                            index={index}
                        />
                    ))}
            </div>

        </>
    );
};

export default Table;

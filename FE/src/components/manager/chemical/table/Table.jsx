import { useEffect, useState } from "react";
import "./Table.css";
import Header from "../../../common/table/header/Header";
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";

const Table = ({ listTitle, refreshData }) => {
    const [itemsActive, setItemsActive] = useState([]);
    const [selectedPlants, setSelectedPlants] = useLocalStorage("manager_plants_selected", "");
    const [listItems, setListItems] = useState();
    const handleFetchPlantData = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (response.ok) {
                const data = await response.json()
                console.log(data);
                setListItems(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // const handleCreate = async (data) => {
    //     try {
    //         const response = await fetch(
    //             `${import.meta.env.VITE_REACT_APP_END_POINT}`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(data),
    //             }
    //         )
    //         if (response.ok) {
    //             handleFetchPlantData()
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }



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
            <Header listTitle={listTitle} />
            <div className="container-table-body">
                {listItems && listItems.length > 0 ? (
                    listItems.map((item, index) => (
                        <Body
                            key={item.ID}
                            handleSelectItem={handleSelectItem}
                            itemsActive={itemsActive}
                            item={item}
                            index={index}
                        />
                    ))
                ) : (
                    <p>Không có dữ liệu để hiển thị</p>
                )}
            </div>


        </>
    );
};

export default Table;

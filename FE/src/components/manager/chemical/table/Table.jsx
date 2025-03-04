/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Table.css";
import Header from "../../../common/table/header/Header";
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";
import { PropTypes } from 'prop-types';
import { toast } from "react-toastify";

const Table = ({ listTitle, refreshData }) => {
    const [itemsActive, setItemsActive] = useState([]);
    const [selectedChemical, setSelectedChemical] = useLocalStorage("manager_chemical_selected", "");
    const [listItems, setListItems] = useState();


    const handleFetchChemicalData = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/chemical`,
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
            setItemsActive([item_index.id]);
        }
    };

    useEffect(() => {
        setSelectedChemical(itemsActive);
    }, [itemsActive]);

    useEffect(() => {
        handleFetchChemicalData();
    }, [refreshData]);


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
                            refreshData={refreshData}
                        />
                    ))
                ) : (
                    <p>Fail to fetch</p>
                )}
            </div>
        </>
    );
};

Table.propTypes = {
    listTitle: PropTypes.array.isRequired,
    refreshData: PropTypes.bool.isRequired,
    setRefeshData: PropTypes.func.isRequired,
}

export default Table;

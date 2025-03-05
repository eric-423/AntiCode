import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./Table.css";
import Header from "../../../common/table/header/Header";
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";

const Table = ({ listTitle, refreshData }) => {
    const [itemsActive, setItemsActive] = useState([]);
    const [selectedUser, setSelectedUser] = useLocalStorage("manager_user_selected", "");
    const [listItems, setListItems] = useState();

    const handleFetchPlantData = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/user/users`,
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
        setItemsActive([item_index.id]);
    };

    useEffect(() => {
        setSelectedUser(itemsActive);
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
                            listTitle={listTitle}
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
    listTitle: PropTypes.string.isRequired,
    refreshData: PropTypes.bool.isRequired,
};

export default Table;

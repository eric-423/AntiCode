import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./Table.css";
import Header from "../../../common/table/header/Header";
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../constant/localStorage";

const Table = ({ listTitle, refreshData }) => {
    const [itemsActive, setItemsActive] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useLocalStorage("manager_equipment_selected", "");
    const [listItems, setListItems] = useState();
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(atob(auth));
    }, [auth])

    const handleFetchPlantData = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/farming-equipment`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
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
        setSelectedEquipment(itemsActive);
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

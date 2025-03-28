import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./ToolBar.css";
import SearchBar from "../../../common/search_bar/SearchBar.jsx";
import Filter from "../../../common/filter/Filter.jsx";
import NewEquipment from "../new_equipment/NewEquipment.jsx";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../constant/localStorage.js";

const ToolBar = ({ setRefreshData }) => {
    const [selectEquipment, setSelectEquipment] = useLocalStorage("manager_equipment_selected", "");
    const [showModal, setShowModal] = useState(false);
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(atob(auth));
    }, [auth])

    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleDeleteEquipment = async () => {
        try {
            let param = ''
            Array.isArray(selectEquipment) && selectEquipment.forEach((element, index) => {
                if (index === selectEquipment.length - 1) {
                    param += `${element}`
                } else {
                    param += `${element}&`
                }
            });
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/farming-equipment/${param}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,

                    },
                }
            );
            console.log(response)

            if (response === true) {
                console.log("delete success")
            }

        } catch (error) {
            throw new error
        } finally {
            window.location.reload();
            setRefreshData(prev => !prev)
        }
    }

    return (
        <div className="tool-bar-plant">
            <Filter />
            <div className="right-tool-bar-plant">
                <SearchBar />
                <div onClick={() => handleDeleteEquipment()}
                    className={selectEquipment && selectEquipment.length > 0 ? "plant-button delete-plant-button-active" : "plant-button delete-plant-button-non-active"}>
                    Delete
                </div>
                <div
                    className="plant-button new-plant-button"
                    onClick={() => handleShowModal()}
                >
                    Create Equipment
                </div>
            </div>
            {showModal && <NewEquipment setRefreshData={setRefreshData} setShowModal={setShowModal} />}
        </div>
    );
};
ToolBar.propTypes = {
    setRefreshData: PropTypes.func.isRequired,
};

export default ToolBar;

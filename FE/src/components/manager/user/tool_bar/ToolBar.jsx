import { useState } from "react";
import PropTypes from 'prop-types';
import "./ToolBar.css";
import SearchBar from "../../../common/search_bar/SearchBar.jsx";
import Filter from "../../../common/filter/Filter.jsx";
import NewUser from "../new_user/NewUser.jsx";
import useLocalStorage from "use-local-storage";

const ToolBar = ({ setRefreshData }) => {
    const [selectUser, setSelectUser] = useLocalStorage("manager_user_selected", "");
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleDeleteUser = async () => {
        try {
            let param = ''
            Array.isArray(selectUser) && selectUser.forEach((element, index) => {
                if (index === selectUser.length - 1) {
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
            setRefreshData(prev => !prev)
        }
    }

    return (
        <div className="tool-bar-plant">
            <Filter />
            <div className="right-tool-bar-plant">
                <SearchBar />
                <div onClick={() => handleDeleteUser()}
                    className={selectUser && selectUser.length > 0 ? "plant-button delete-plant-button-active" : "plant-button delete-plant-button-non-active"}>
                    Delete
                </div>
                <div
                    className="plant-button new-plant-button"
                    onClick={() => handleShowModal()}
                >
                    Create User
                </div>
            </div>
            {showModal && <NewUser setRefreshData={setRefreshData} setShowModal={setShowModal} />}
        </div>
    );
};
ToolBar.propTypes = {
    setRefreshData: PropTypes.func.isRequired,
};

export default ToolBar;

import { useState } from "react";
import PropTypes from 'prop-types';
import "./ToolBar.css";
import SearchBar from "../../../common/search_bar/SearchBar.jsx";
import Filter from "../../../common/filter/Filter.jsx";
import NewUser from "../new_user/NewUser.jsx";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify/unstyled";
import LOCALSTORAGE from "../../../../constant/localStorage.js";

const ToolBar = ({ setRefreshData }) => {
    const [selectUser, setSelectUser] = useLocalStorage("manager_user_selected", "");
    const [showModal, setShowModal] = useState(false);
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(atob(auth));
    }, [auth])

    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    const showToastMessageSuccess = (message) => {
        toast.success(message, {
            position: "top-right",
        });
    };

    const showToastMessageFail = (message) => {
        toast.error(message, {
            position: "top-right",
        });
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
                `${import.meta.env.VITE_REACT_APP_END_POINT}/user/${param}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                showToastMessageSuccess("Delete user successfully");
            } else {
                showToastMessageFail("Delete failed: Cannot delete manager or admin");
            }

        } catch (error) {
            console.error("error", error);
            showToastMessageFail("delete fail")

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

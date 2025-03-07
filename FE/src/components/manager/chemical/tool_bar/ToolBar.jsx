import { useState } from "react";
import PropTypes from 'prop-types';
import "./ToolBar.css";
import SearchBar from "../../../common/search_bar/SearchBar.jsx";
import Filter from "../../../common/filter/Filter.jsx";
import NewChemical from "../new_chemical/NewChemical.jsx";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";

const ToolBar = ({ setRefreshData }) => {
    const [selectedChemical, setSelectedChemical] = useLocalStorage("manager_chemical_selected", "");
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };


    // message for success or fail
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


    const handleDeleteChemical = async () => {
        try {
            let param = ''
            Array.isArray(selectedChemical) && selectedChemical.forEach((element, index) => {
                if (index === selectedChemical.length - 1) {
                    param += `${element}`
                } else {
                    param += `${element}&`
                }
            });
            console.log(param)
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/chemical/${param}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                showToastMessageSuccess("Delete chemical successfully !")
            } else {
                showToastMessageFail("Fail to delete chemical !")
            }
        } catch (error) {
            throw new error
        } finally {
            setRefreshData((prev) => !prev)
        }
    }

    return (
        <div className="tool-bar-plant">
            <Filter />
            <div className="right-tool-bar-plant">
                <SearchBar />
                <div onClick={() => handleDeleteChemical()}
                    className={selectedChemical && selectedChemical.length > 0 ? "plant-button delete-plant-button-active" : "plant-button delete-plant-button-non-active"}>
                    Delete
                </div>
                <div
                    className="plant-button new-plant-button"
                    onClick={() => handleShowModal()}
                >
                    Create Chemical
                </div>
            </div>
            {showModal && <NewChemical setRefreshData={setRefreshData} setShowModal={setShowModal} />}
        </div>
    );
};
ToolBar.propTypes = {
    setRefreshData: PropTypes.func.isRequired,
};

export default ToolBar;

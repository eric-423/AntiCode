import { useState } from "react";
import PropTypes from 'prop-types';
import "./ToolBar.css";
import SearchBar from "../../../common/search_bar/SearchBar.jsx";
import Filter from "../../../common/filter/Filter.jsx";
import NewChemical from "../new_chemical/NewChemical.jsx";
import useLocalStorage from "use-local-storage";

const ToolBar = ({ setRefreshData }) => {
    const [selectedPlants, setSelectedPlants] = useLocalStorage("manager_plants_selected", "");
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleDeleteChemical = async () => {
        try {
            let param = ''
            Array.isArray(selectedPlants) && selectedPlants.forEach((element, index) => {
                if (index === selectedPlants.length - 1) {
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
                <div onClick={() => handleDeleteChemical()}
                    className={selectedPlants && selectedPlants.length > 0 ? "plant-button delete-plant-button-active" : "plant-button delete-plant-button-non-active"}>
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

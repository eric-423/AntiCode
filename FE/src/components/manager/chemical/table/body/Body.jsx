import { format } from 'date-fns';
import { useState } from "react";
import PropTypes from 'prop-types';
import "./Body.css";
import ICONS from "../../../../../constant/Image.js";
import UpdateChemical from "../../update_chemical/UpdateChemical.jsx";

const Body = ({ item, index, itemsActive, handleSelectItem, refreshData }) => {
    const [showModal, setShowModal] = useState(false);
    const [itemUpdate, setItemUpdate] = useState(null);
    const isActive = Array.isArray(itemsActive) && itemsActive.includes(item.id);

    const handleShowUpdatePopup = (event, item) => {
        event.stopPropagation();
        setItemUpdate(item);
        setShowModal(true);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return format(new Date(date), 'yyyy-MM-dd');
    };

    return (
        <>
            {showModal && (
                <UpdateChemical itemUpdate={itemUpdate} setShowModal={setShowModal} refreshData={refreshData} />
            )}
            <ul
                className={isActive ? "body-table body-table-active" : "body-table"}
                onClick={() => handleSelectItem(item)}
            >
                <li>{index + 1}</li>
                <li>{item.name}</li>
                <li>{item.description}</li>
                <li>{formatDate(item.manufacturingDate)}</li>
                <li>{formatDate(item.expirationDate)}</li>
                <li>{item.volumeAvailable}</li>
                <li>{item.chemicalType}</li>
                <li>
                    <div
                        onClick={(event) => handleShowUpdatePopup(event, item)}
                        className="update-table-body"
                    >
                        <img src={ICONS.icon_update} alt="Update" />
                    </div>
                </li>
                {isActive && (
                    <img className="tick-active-table-item" src={ICONS.icon_tick} alt="Active" />
                )}
            </ul>
        </>
    );
};

Body.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        manufacturingDate: PropTypes.string,
        expirationDate: PropTypes.string,
        volumeAvailable: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        chemicalType: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    itemsActive: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    handleSelectItem: PropTypes.func.isRequired,
    refreshData: PropTypes.func.isRequired,
};


export default Body;

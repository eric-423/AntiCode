import { useState } from "react";
import PropTypes from 'prop-types';
import ICONS from "../../../../../constant/Image.js";
import UpdateEquipment from "../../update_equipment/UpdateEquipment.jsx";
import "./Body.css";
import useGridColumn from "../../../../../hook/useGridColumn.js";
const Body = ({ item, index, itemsActive, listTitle, handleSelectItem }) => {
    const [showModal, setShowModal] = useState(false);
    const [itemUpdate, setItemUpdate] = useState(null);
    const isActive = Array.isArray(itemsActive) && itemsActive.includes(item.id);
    const gridColumnTemplate = useGridColumn(listTitle)

    const handleShowUpdatePopup = (event, item) => {
        event.stopPropagation();
        setItemUpdate(item);
        setShowModal(true);
    };


    return (
        <>
            {showModal && (
                <UpdateEquipment itemUpdate={itemUpdate} setShowModal={setShowModal} />
            )}

            <ul
                className={isActive ? "body-table body-table-active" : "body-table"}
                onClick={() => handleSelectItem(item)}
                style={{ gridTemplateColumns: gridColumnTemplate }}

            >
                <li>{index + 1}</li>
                <li>{item.name}</li>
                <li>{item.description}</li>
                <li>{item.typeName}</li>
                <li>{item.quantity}</li>
                {
                    item.inUsed ? <li>In Used</li> : <li>Not In Used</li>
                }
                {
                    item.deleted ? <li>Deleted</li> : <li>Not Deleted</li>
                }
                {
                    item.damaged ? <li>Damaged</li> : <li>Not Damaged</li>
                }

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
        typeName: PropTypes.string,
        quantity: PropTypes.number,
        inUsed: PropTypes.bool,
        deleted: PropTypes.bool,
        damaged: PropTypes.bool,
    }).isRequired,
    index: PropTypes.number.isRequired,
    itemsActive: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    handleSelectItem: PropTypes.func.isRequired,
    listTitle: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default Body;

import { useState } from "react";
import "./Body.css";
import ICONS from "../../../../../constant/Image.js";
import UpdateChemical from "../../update_chemical/UpdateChemical.jsx";


const Body = ({ item, index, itemsActive, handleSelectItem }) => {
    const [showModal, setShowModal] = useState(false)
    const [itemUpdate, setItemUpdate] = useState()
    const isActive = Array.isArray(itemsActive) && itemsActive.includes(item.id);

    const handleShowUpdatePopup = (event, item) => {
        setItemUpdate(item)
        event.stopPropagation();
        setShowModal(true)
    };
    return (
        <>
            {showModal && <UpdateChemical itemUpdate={itemUpdate} setShowModal={setShowModal} />}
            <ul
                className={isActive ? "body-table body-table-active" : "body-table"}
                onClick={() => handleSelectItem(item)}
            >
                <li>{index + 1}</li>
                <li>{item.chemical_name}</li>
                <li>{item.description}</li>
                <li>{item.manufacturing_date}</li>
                <li>{item.expiration_date}</li>
                <li>{item.volumne_available}</li>
                <li>{item.chemical_type}</li>
                <li>
                    <div
                        onClick={(event) => handleShowUpdatePopup(event, item)}
                        className="update-table-body"
                    >
                        <img src={ICONS.icon_update} alt="" />
                    </div>
                </li>
                {isActive ? (
                    <img className="tick-active-table-item" src={ICONS.icon_tick} />
                ) : null}
            </ul >
        </>
    );
};

export default Body;

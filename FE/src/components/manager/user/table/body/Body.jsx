import { useState } from "react";
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import "./Body.css";
import ICONS from "../../../../../constant/Image.js";
import UpdateUser from "../../update_user/UpdateUser.jsx";

const Body = ({ item, index, itemsActive, handleSelectItem }) => {
    const [showModal, setShowModal] = useState(false);
    const [itemUpdate, setItemUpdate] = useState(null);
    const isActive = Array.isArray(itemsActive) && itemsActive.includes(item.id);

    console.log(item)
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
                <UpdateUser itemUpdate={itemUpdate} setShowModal={setShowModal} />
            )}

            <ul
                className={isActive ? "body-table body-table-active" : "body-table"}
                onClick={() => handleSelectItem(item)}
            >
                <li>{index + 1}</li>
                <li>{item.userName}</li>
                <li>{item.email}</li>
                <li>{item.role}</li>
                <li>{item.address}</li>
                <li>{formatDate(item.dateOfBirth)}</li>
                <li>{item.phoneNumber}</li>
                {
                    item.busy ? (
                        <li style={{ color: "red" }}>
                            BUSY
                        </li>
                    ) : (
                        <li style={{ color: "green" }}>
                            ACTIVE
                        </li>
                    )
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
        userName: PropTypes.string.isRequired,
        email: PropTypes.string,
        role: PropTypes.string,
        address: PropTypes.number,
        dateOfBirth: PropTypes.bool,
        phoneNumber: PropTypes.bool,
        busy: PropTypes.bool,
    }).isRequired,
    index: PropTypes.number.isRequired,
    itemsActive: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    handleSelectItem: PropTypes.func.isRequired,
};


export default Body;

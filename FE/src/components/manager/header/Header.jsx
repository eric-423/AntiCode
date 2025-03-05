import React, { useEffect, useState } from "react";
import "./Header.css";
import ICONS from "../../../constant/Image";
import useMapPath from "../../../hook/useMapPath";
import { useLocation } from "react-router-dom";
import LOCALSTORAGE from "../../../constant/localStorage";
import useLocalStorage from "use-local-storage";

const Header = () => {
    const location = useLocation();
    const [title, setTitle] = useState();
    const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION);

    useEffect(() => {
        setTitle(useMapPath(location.pathname))
    }, [location.pathname])

    const handleLogout = () => {
        if (accountLoginInformation != "") {
            localStorage.removeItem(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION)
            window.location.reload()
        }
    }

    return (
        <div className="header-manager">
            <h6>{title}</h6>
            <div className="account-message-noti">
                <div className="message-noti">
                    <div>
                        <img src={ICONS.icon_message} alt="" />
                    </div>
                    <div>
                        <img src={ICONS.icon_notification} alt="" />
                    </div>
                </div>
                <button
                    className="button-logout"
                    onClick={handleLogout}
                >
                    Log out
                </button>
                <div className="avatar"></div>
            </div>
        </div>);
};

export default Header;

import { useEffect, useState } from "react";
import "./Header.css";
import ICONS from "../../../constant/Image";
import useMapPath from "../../../hook/useMapPath";
import { useLocation } from "react-router-dom";
import LOCALSTORAGE from "../../../constant/localStorage";
import useLocalStorage from "use-local-storage";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION
  );
  const [account, setAccount] = useState();

  useEffect(() => {
    setTitle(useMapPath(location.pathname));
  }, [location.pathname]);

  const handleLogout = () => {
    if (accountLoginInformation != "") {
      setAccountLoginInformation("")
    }
  };
  useEffect(() => {
    if (!account && accountLoginInformation) {
      setAccount(jwtDecode(atob(accountLoginInformation)));
    }
  }, []);

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
        <div className="header-manager-profile">
          <div className="name-role-profile">
            <span>{account && account.name}</span>
          </div>
          <div
            className="avatar"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {showProfile && (
              <ul className="drop-down-profile">
                <li>Profile</li>
                <li onClick={() => handleLogout()}>Logout</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

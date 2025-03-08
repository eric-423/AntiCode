import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Header.css";
import ICONS from "../../../constant/Image";
import SearchBar from "../../common/search_bar/SearchBar";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../constant/localStorage";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION
  );
  const handleLogout = () => {
    if (accountLoginInformation != "") {
      setAccountLoginInformation("");
    }
  };
  const [showProfile, setShowProfile] = useState(false);
  const [account, setAccount] = useState();
  useEffect(() => {
    if (!account && accountLoginInformation) {
      setAccount(jwtDecode(atob(accountLoginInformation)));
    }
  }, []);
  return (
    <div className="header-worker">
      <div className="header-worker-container">
        <div className="header-wroker-logo">
          <img src={ICONS.icon_logo} />
          <span style={{ cursor: "pointer" }}>FTM Co.</span>
          <SearchBar />
        </div>
        <ul className="d-flex ul-header ">
          <li>Tasks</li>
          <li>News</li>
        </ul>
        <div className="message-noti">
          <div style={{ boxShadow: "none", background: "none" }}>
            <img src={ICONS.icon_message} alt="" />
          </div>
          <div style={{ boxShadow: "none", background: "none" }}>
            <img src={ICONS.icon_notification} alt="" />
          </div>
          <div style={{
            width: "max-content",
            display: "flex",
            columnGap: "10px"
          }}>
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
    </div>
  );
};

export default Header;

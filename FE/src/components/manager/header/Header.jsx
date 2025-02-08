import React, { useEffect, useState } from "react";
import "./Header.css";
import ICONS from "../../../constant/Image";
import useMapPath from "../../../hook/useMapPath";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState();
  useEffect(() => {
    setTitle(useMapPath(location.pathname))
  },[location.pathname])
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
        <div className="avatar"></div>
      </div>
    </div>
  );
};

export default Header;

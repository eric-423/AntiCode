import React from "react";
import { Container } from "react-bootstrap";
import "./Header.css";
import ICONS from "../../../constant/Image";
import SearchBar from "../../common/search_bar/SearchBar";

const Header = () => {
  return (
    <div className="header-worker">
      <div className="header-worker-container">
        <div className="header-wroker-logo">
          <img src={ICONS.icon_logo} />
          <span style={{ cursor: "pointer" }}>FTM Co.</span>
          <SearchBar />
        </div>
        <ul
          className="d-flex ul-header "
        >
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
          <div
            style={{ marginLeft: "20px", backgroundColor: "rgba(0,0,0,0.1)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;

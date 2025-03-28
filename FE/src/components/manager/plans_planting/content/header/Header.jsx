import React from "react";
import "./Header.css";
import CALENDAR from "../../../../../constant/calendar";

const Header = () => {
  return (
    <ul className="plans-content-header">
      <li>Plans Name</li>
      <div className="plans-content-cotainer-month">
        {CALENDAR.LIST_YEAR.map((item) => (
          <li>{item}</li>
        ))}
      </div>
    </ul>
  );
};

export default Header;

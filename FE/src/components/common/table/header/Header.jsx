import React from "react";
import "./Header.css";
import useGridColumn from "../../../../hook/useGridColumn";

const Header = ({ listTitle }) => {
  const gridColumnTemplate = useGridColumn(listTitle)
  return (
    <ul
      className="header-table"
      style={{ gridTemplateColumns: gridColumnTemplate }}
    >
      {Array.isArray(listTitle) &&
        listTitle.map((item) => <li>{item.name}</li>)}
    </ul>
  );
};

export default Header;

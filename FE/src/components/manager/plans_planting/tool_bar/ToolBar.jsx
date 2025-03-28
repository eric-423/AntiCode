import React from "react";
import SearchBar from "../../../common/search_bar/SearchBar";

const ToolBar = ({setShowModal}) => {
  return (
    <div className="tool-bar-plant">
      <div>

      </div>
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div className="plant-button new-plant-button" onClick={() => setShowModal(true)}>Create Plans</div>
      </div>
    </div>
  );
};

export default ToolBar;

import React from "react";
import SearchBar from "../../../common/search_bar/SearchBar";

const ToolBar = () => {
  return (
    <div className="tool-bar-plant">
      <div>

      </div>
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div className="plant-button new-plant-button">Create Plans</div>
      </div>
    </div>
  );
};

export default ToolBar;

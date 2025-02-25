import React from "react";
import "./Item.css";
import useFormattedDate from "../../../../../hook/useFormatDate";

const Item = ({ item }) => {
  return (
    <div className="item-recent-activity">
      <div>
        <p className="content-item-recent-activity">
          <span className="item-recent-activity-user">{item.doer} </span>
          {item.description}
        </p>
        <div className="content-item-recent-activity item-recent-activity-date">
          {useFormattedDate(item.date, "MMM dd")}
        </div>
      </div>
    </div>
  );
};

export default Item;

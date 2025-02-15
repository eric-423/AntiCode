import React from "react";
import "./Button.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ICONS from "../../../constant/Image";

const Button = ({ text, handleOnClick, isLoading }) => {
  return (
    <div onClick={() => handleOnClick()} className="button-common">
      {!isLoading && <span className="text-login">{text}</span>}
      {isLoading && (
        <div style={{display: "flex", columnGap: "20px"}}>
          <img
            src={ICONS.icon_loading}
            className="animation-spin"
            width="20px"
            height="20px"
          />
          <span className="text-login">Processing…</span>
        </div>
      )}
    </div>
  );
};

export default Button;

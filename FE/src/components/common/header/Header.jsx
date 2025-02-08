import React, { useEffect, useState } from "react";
import "./Header.css";
import ICONS from "../../../constant/Image";
import { Container } from "react-bootstrap";

const Header = () => {
  const [widthBackground, setWidthBackground] = useState();
  const handleBackgroundBaseOnWindow = () => {
    const widthContainer = document.getElementById("container-header");
    if (widthContainer) {
      setWidthBackground((window.innerWidth - widthContainer.clientWidth) / 2);
    }
  };
  window.addEventListener("resize", () => {
    handleBackgroundBaseOnWindow();
  });
  useEffect(() => {
    handleBackgroundBaseOnWindow();
  }, []);
  return (
    <div className="header-component">
      <Container className="header-container" id="container-header">
        <div className="image-header" style={{width: `${widthBackground/2 + 80 }px`, transform: `translateX(${-(widthBackground/2 - 30 )}px)`}}>
          <img src={ICONS.icon_logo} /> <span style={{cursor: 'pointer'}}>FTM Co.</span>
        </div>
        <ul className="d-flex">
          <li>About</li>
          <li>News</li>
        </ul>
      </Container>
    </div>
  );
};

export default Header;

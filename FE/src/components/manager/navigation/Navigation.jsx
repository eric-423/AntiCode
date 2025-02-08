import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./Navigation.css";
import Logo from "./logo/Logo";
import Menu from "./menu/Menu";
import NAVIGATION from "../../../constant/MenuNavigation";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import useMediaQuery from "../../../hook/useMediaQuery";

const Navigation = () => {
  const isSmall = useMediaQuery("(max-inline-size: 1500px)");
  const [width, setWidth] = useState();
  const handleWidthBaseOnWindow = () => {
    const widthRoot = document.getElementById("root").clientWidth;
    setWidth(widthRoot - 250);
  };
  window.addEventListener("resize", () => {
    handleWidthBaseOnWindow();
  });
  useEffect(() => {
    handleWidthBaseOnWindow();
  }, []);
  return (
    <Row className="manager">
      <Col xl={2} lg={3} md={4} className="navigation-manager">
        <Logo />
        <Menu list={NAVIGATION.LISTS_MENU_NAVIGATION} />
      </Col>
      <Col
        xl={10}
        lg={9}
        md={8}
        style={!isSmall ? { inlineSize: `${width}px` } : null}
      >
        <Row className="header-manager-container">
          <Header />
        </Row>
        <Row  className="content-manager-container ">
          <Outlet />
        </Row>
      </Col>
    </Row>
  );
};

export default Navigation;

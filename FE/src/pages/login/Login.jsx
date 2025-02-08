import React, { useEffect, useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import FormLogin from "../../components/common/form/FormLogin";
import ICONS from "../../constant/Image";
import useMediaQuery from "../../hook/useMediaQuery";
import Header from "../../components/common/header/Header";

const Login = () => {
  const isScreenPhone = useMediaQuery("(max-width: 576px)");
  const isScreenTablet = useMediaQuery("(max-width: 768px)");
  const [widthBackground, setWidthBackground] = useState();
  const handleBackgroundBaseOnWindow = () => {
    const widthContainer = document.getElementById("container");
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
    <>
      {!isScreenTablet ? <Header /> : null}
      <Container id="container">
        <Row className="login-row">
          <Col xl={4} lg={5} md={6} className={!isScreenTablet ? "align-content-end" : null}>
            {isScreenTablet ? (
              <img
                src={ICONS.icon_logo}
                width="120px"
                className="login-logo mb-4"
              />
            ) : null}
            <p
              className={
                isScreenPhone
                  ? "text-login-p-small text-center"
                  : "text-login-p-big"
              }
            >
              Login
            </p>
            {!isScreenPhone ? (
              <>
                <h1 className="text-title-login">Welcome To FTM</h1>
                <p className="sub-text-title">
                  Farm Tasks Management! Please enter your details
                </p>
              </>
            ) : null}

            <FormLogin />
          </Col>
          {!isScreenTablet ? (
            <Col xl={8} lg={7} md={6} className="align-content-center position-relative">
              <div
                className="main-background-login"
                style={{ width: `calc(100% + ${widthBackground}px)` }}
              ></div>
              <div className="block-slogan" id="block-slogan" >
                <span>Farm Tasks Management!</span>
              </div>
            </Col>
          ) : null}
        </Row>
      </Container>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../button/Button";
import "./FormLogin.css";
import ICONS from "../../../../constant/Image";
import useMediaQuery from "../../../../hook/useMediaQuery";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const navigate = useNavigate()
  const isScreenPhone = useMediaQuery("(max-width: 576px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOnClick = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_END_POINT
        }/user/signin?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(!response.ok){
          throw new Error()
      }
      const data = await response.json()
      if(data){
        navigate("/manager")
      }
    } catch (error) {}
  };
  return (
    <>
      <Form
        className={isScreenPhone ? "center-content form mb-4" : "form mb-4"}
      >
        <Form.Group className="mb-3">
          <Form.Label className="text-label-login">Email</Form.Label>
          <Form.Control
            className="input-login"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-label-login">Password</Form.Label>
          <Form.Control
            className="input-login"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <p className="mb-4 text-end text-forgot-password">Forgot password?</p>
        <Button text="Login" handleOnClick={handleOnClick} />
      </Form>
      <div
        className={
          isScreenPhone ? "line-or-line center-content" : "line-or-line"
        }
      >
        <div className="line"></div>or
        <div className="line"></div>
      </div>
      {isScreenPhone ? (
        <div className="login-other">
          <img src={ICONS.icon_google} alt="" />
          <img src={ICONS.icon_apple} alt="" />
        </div>
      ) : (
        <div className="login-other-button">
          <img src={ICONS.icon_google} alt="" />
          <span>Sign in with Google</span>
        </div>
      )}

      <p
        className={!isScreenPhone ? "no-account" : "no-account text-center"}
        style={!isScreenPhone ? { marginBottom: "10vh" } : {}}
      >
        Don't have an account? <span onClick={() => navigate("/registrations")} style={{cursor: "pointer"}}>Sign up</span>
      </p>
    </>
  );
};

export default FormLogin;

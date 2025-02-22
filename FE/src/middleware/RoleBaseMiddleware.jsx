import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../constant/localStorage";

const RoleBaseMiddleware = ({ children, requiredRole }) => {
  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION,
    ""
  );
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const role = jwtDecode(atob(accountLoginInformation))?.role;
      if (role !== requiredRole) navigate("/");
    } catch (error) {
      navigate("/")
    }
  }, accountLoginInformation);
  return children;
};

export default RoleBaseMiddleware;

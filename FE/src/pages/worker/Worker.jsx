import React from "react";
import Header from "../../components/worker/header/Header";
import "./Worker.css";
import { Outlet } from "react-router-dom";
import ROLES from "../../constant/role";
import RoleBaseMiddleware from "../../middleware/RoleBaseMiddleware";

const Worker = () => {
  return (
    <RoleBaseMiddleware requiredRole={ROLES.WORKER}>
      <div className="worker-container">
        <Header />
        <div className="worker-container-content">
          <Outlet />
        </div>
      </div>
    </RoleBaseMiddleware>
  );
};

export default Worker;

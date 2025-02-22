import { jwtDecode } from "jwt-decode";
import ROLES from "../constant/role";

const useRole = (jwtString) => {
  let admin = false;
  let manager = false;
  let worker = false;

  const user = jwtDecode(jwtString);
  if (user && user.role && Array.isArray(user.role)) {
    user.role.map((item) => {
      if (item === ROLES.ADMIN) admin = true;
      if (item === ROLES.MANAGER) manager = true;
      if (item === ROLES.WORKER) worker = true;
    });
  } else {
    if (user && user.role) {
      if (user.role === ROLES.ADMIN) admin = true;
      if (user.role === ROLES.MANAGER) manager = true;
      if (user.role === ROLES.WORKER) worker = true;
    }
  }

  return {
    admin,
    worker,
    manager,
  };
};

export default useRole;

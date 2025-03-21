import Navigation from "../../components/manager/navigation/Navigation";
import RoleBaseMiddleware from "../../middleware/RoleBaseMiddleware";
import ROLES from "../../constant/role";


const Manager = () => {
  return (
    <RoleBaseMiddleware requiredRole={ROLES.MANAGER} >
      <Navigation />
    </RoleBaseMiddleware>
  );
};

export default Manager;

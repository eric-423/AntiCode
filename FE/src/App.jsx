import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Manager from "./pages/manager/Manager";
import Dashboard from "./components/manager/dashboard/Dashboard";
import NAVIGATION from "./constant/MenuNavigation";
import Settings from "./components/manager/settings/Settings";
import PlantType from "./components/manager/plant/type/PlantType";
import Plant from "./components/manager/plant/plant/Plant";
import { ToastContainer } from "react-toastify/unstyled";

function App() {
  const listComponent = [
    {
      name: NAVIGATION.COMPONENTS.SETTINGS,
      component: <Settings />,
    },
    {
      name: NAVIGATION.COMPONENTS.PLAN_TYPE,
      component: <PlantType />,
    },
    {
      name: NAVIGATION.COMPONENTS.DASHBOARD,
      component: <Dashboard />,
    },
    {
      name: NAVIGATION.COMPONENTS.PLANT,
      component: <Plant />,
    },
  ];
  const listRouteNavigation = [];
  NAVIGATION.LISTS_MENU_NAVIGATION.forEach((itemMenu) => {
    itemMenu.data.forEach((item) => {
      if (item.subItems.length > 0) {
        item.subItems.forEach((subItem, index) => {
          if (index === 0) {
            listRouteNavigation.push({
              path: item.path + subItem.path,
              component: listComponent.find(
                (item_component) => item_component.name === subItem.component
              ).component,
            });
          } else {
            listRouteNavigation.push({
              path: item.path + subItem.path,
              component: listComponent.find(
                (item_component) => item_component.name === subItem.component
              ).component,
            });
          }
        });
      } else {
        listRouteNavigation.push({
          path: item.path,
          component: listComponent.find(
            (item_component) => item_component.name === item.component
          ).component,
        });
      }
    });
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/manager/" element={<Manager />}>
          <Route index element={<Dashboard />} />
          {listRouteNavigation.map((item) => (
            <Route path={item.path} element={item.component} />
          ))}
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

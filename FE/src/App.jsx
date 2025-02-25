import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/login/Login'
import Manager from './pages/manager/Manager'
import Dashboard from './components/manager/dashboard/Dashboard'
import NAVIGATION from './constant/MenuNavigation'
import Settings from './components/manager/settings/Settings'
import PlantType from './components/manager/plant/type/PlantType'
import Plant from './components/manager/plant/plant/Plant'
import Location from './components/manager/location/location/Location'
import Farm from './components/manager/location/farm/Farm'
import Area from './components/manager/location/area/Area'
import { ToastContainer } from 'react-toastify/unstyled'
import PlantingLocation from './components/manager/location/plant location/PlantingLocation'
import Register from './pages/register/Register'
import FormRegister from './components/common/form/register/FormRegister'
import VerifyEmail from './components/common/form/register/verify/VerifyEmail'
import Worker from './pages/worker/Worker'
import Tasks from './components/worker/tasks/Tasks'
import Task from './components/manager/task/task/Task'
import Type from './components/manager/task/type/Type'
import Status from './components/manager/task/status/Status'
import Chemical from './components/manager/chemical/Chemical'
import ChemicalType from './components/manager/chemical/type/ChemicalType'
import PlantMedium from './components/manager/plant_medium/PlantMedium'
import PlantPot from './components/manager/plant_pot/PlantPot'
import Equipment from './components/manager/equipment/Equipment'
import EquipmentType from './components/manager/equipment/type/EquipmentType'
import ScheduleTasks from './components/manager/schedule_tasks/ScheduleTasks'
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
    {
      name: NAVIGATION.COMPONENTS.LOCATION,
      component: <Location />,
    },
    {
      name: NAVIGATION.COMPONENTS.FARM,
      component: <Farm />,
    },
    {
      name: NAVIGATION.COMPONENTS.AREA,
      component: <Area />,
    },
    {
      name: NAVIGATION.COMPONENTS.PLANT_LOCATION,
      component: <PlantingLocation />,
    },
    {
      name: NAVIGATION.COMPONENTS.TASK,
      component: <Task />,
    },
    {
      name: NAVIGATION.COMPONENTS.TASK_STATUS,
      component: <Status />,
    },
    {
      name: NAVIGATION.COMPONENTS.TASK_TYPE,
      component: <Type />,
    },
    {
      name: NAVIGATION.COMPONENTS.CHEMICAL,
      component: <Chemical />,
    },
    {
      name: NAVIGATION.COMPONENTS.CHEMICAL_TYPE,
      component: <ChemicalType />,
    },
    {
      name: NAVIGATION.COMPONENTS.PLANT_MEDIUM,
      component: <PlantMedium />,
    },
    {
      name: NAVIGATION.COMPONENTS.PLANT_POT,
      component: <PlantPot />,
      name: NAVIGATION.COMPONENTS.EQUIPMENT,
      component: <Equipment />,
    },
    {
      name: NAVIGATION.COMPONENTS.EQUIPMENT_TYPE,
      component: <EquipmentType />,
    }
    {
      name: NAVIGATION.COMPONENTS.SCHEDULE_TASKS,
      component: <ScheduleTasks />,
    },
  ]
  const listRouteNavigation = []
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
            })
          } else {
            listRouteNavigation.push({
              path: item.path + subItem.path,
              component: listComponent.find(
                (item_component) => item_component.name === subItem.component
              ).component,
            })
          }
        })
      } else {
        listRouteNavigation.push({
          path: item.path,
          component: listComponent.find(
            (item_component) => item_component.name === item.component
          ).component,
        })
      }
    })
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrations/" element={<Register />}>
          <Route index element={<FormRegister />} />
          <Route path="verify-otp" element={<VerifyEmail />} />
        </Route>
        <Route path="/manager/" element={<Manager />}>
          <Route index element={<Dashboard />} />
          {listRouteNavigation.map((item) => (
            <Route path={item.path} element={item.component} />
          ))}
        </Route>
        <Route path='/worker' element={<Worker />} >
          <Route index element={<Tasks />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App

import ICONS from "./Image";


const COMPONENTS = {
  PLANT: "Plant",
  PLAN_TYPE: "Plant Type",
  LOCATION: "Location",
  FARM: "Farm",
  AREA: "Area",
  PLANT_LOCATION: "Plant Location",
  TASK: "Task",
  TASK_TYPE: "Task Type",
  TASK_STATUS: "Task Status",
  DASHBOARD: "Dashboard",
  SETTINGS: "Settings",
  CHEMICAL: "Chemical",
  CHEMICAL_TYPE: "Chemical Type",
  EQUIPMENT: "Equipment",
  EQUIPMENT_TYPE: "Equipment Type",
};

const listMenu = [
  {
    title: "MENU",
    data: [
      {
        nameMenu: "Plant",
        image: ICONS.icon_plant,
        imageActive: ICONS.icon_plant_active,
        sortItem: 1,
        subItems: [
          {
            name: "Plant",
            component: COMPONENTS.PLANT,
            path: "/"
          },
          {
            name: "Plant Type",
            component: COMPONENTS.PLAN_TYPE,
            path: "/plant-type"
          },
        ],
        component: null,
        path: "menu-plant"
      },
      {
        nameMenu: "Chemical",
        image: ICONS.icon_chemical,
        imageActive: ICONS.icon_chemical,
        sortItem: 4,
        component: COMPONENTS.CHEMICAL,
        path: "menu-chemical",
        subItems: [
          {
            name: "Chemical",
            component: COMPONENTS.CHEMICAL,
            path: "/chemical"
          },
          {
            name: "Chemical Type",
            component: COMPONENTS.CHEMICAL_TYPE,
            path: "/chemical-type"
          },
        ]
      },

      {
        nameMenu: "Task",
        image: ICONS.icon_task,
        imageActive: ICONS.icon_task_active,
        sortItem: 3,
        subItems: [
          {
            name: "Task",
            component: COMPONENTS.TASK,
            path: "/"
          },
          {
            name: "Task Type",
            component: COMPONENTS.TASK_TYPE,
            path: "/task-type"
          },
          {
            name: "Task Status",
            component: COMPONENTS.TASK_STATUS,
            path: "/task-status"
          },
        ],
        component: null,
        path: "task"
      },
      {
        nameMenu: "Location",
        image: ICONS.icon_location,
        imageActive: ICONS.icon_location_active,
        sortItem: 2,
        subItems: [
          {
            name: "Location",
            component: COMPONENTS.LOCATION,
            path: "/"
          },
          {
            name: "Farm",
            component: COMPONENTS.FARM,
            path: "/farm"
          },
          {
            name: "Area",
            component: COMPONENTS.AREA,
            path: "/area"
          },
          {
            name: "Plant Location",
            component: COMPONENTS.PLANT_LOCATION,
            path: "/plant-location"
          },
        ],
        component: null,
        path: "location"
      },
      {
        nameMenu: "Dashboard",
        image: ICONS.icon_dashboard,
        imageActive: ICONS.icon_dashboard_active,
        sortItem: 0,
        subItems: [],
        component: COMPONENTS.DASHBOARD,
        path: "menu-dashboard"
      },
      {
        nameMenu: "Equipment",
        image: ICONS.icon_chemical,
        imageActive: ICONS.icon_chemical,
        sortItem: 5,
        component: COMPONENTS.EQUIPMENT,
        path: "equipment",
        subItems: [
          {
            name: "Equipment",
            component: COMPONENTS.EQUIPMENT,
            path: "/"
          },
          {
            name: "Equipment Type",
            component: COMPONENTS.EQUIPMENT_TYPE,
            path: "/equipment-type"
          },
        ]
      },
    ].sort((a, b) => a.sortItem - b.sortItem),
  },
  {
    title: "Settings",
    data: [
      {
        nameMenu: "Settings",
        image: ICONS.icon_setting,
        imageActive: ICONS.icon_setting_active,
        sortItem: 0,
        subItems: [],
        component: COMPONENTS.SETTINGS,
        path: "settings"
      },
    ].sort((a, b) => a.sortItem - b.sortItem),
  },
];

const NAVIGATION = {
  LISTS_MENU_NAVIGATION: listMenu,
  COMPONENTS: COMPONENTS
};

export default NAVIGATION;

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
  PLANT_POT: "Plant Pot",
  PLANT_MEDIUM: "Plant Medium",
  CHEMICAL_TYPE: "Chemical Type",
  EQUIPMENT: "Equipment",
  EQUIPMENT_TYPE: "Equipment Type",
  SCHEDULE_TASKS: "Schedule Tasks",
  USER: "User",
  WATER: "Water"
};

const listMenu = [
  {
    title: "MENU",
    data: [
      {
        nameMenu: "User",
        image: ICONS.icon_schedule,
        imageActive: ICONS.icon_schedule_active,
        sortItem: 1,
        subItems: [],
        component: COMPONENTS.USER,
        path: "user-management",
      },
      {
        nameMenu: "Schedule Tasks",
        image: ICONS.icon_schedule,
        imageActive: ICONS.icon_schedule_active,
        sortItem: 1,
        subItems: [],
        component: COMPONENTS.SCHEDULE_TASKS,
        path: "menu-schedule-tasks",
      },
      {
        nameMenu: "Plant",
        image: ICONS.icon_plant,
        imageActive: ICONS.icon_plant_active,
        sortItem: 1,
        subItems: [
          {
            name: "Plant",
            component: COMPONENTS.PLANT,
            path: "/",
          },
          {
            name: "Plant Type",
            component: COMPONENTS.PLAN_TYPE,
            path: "/plant-type",
          },
        ],
        component: null,
        path: "menu-plant",
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
            path: "/chemical",
          },
          {
            name: "Chemical Type",
            component: COMPONENTS.CHEMICAL_TYPE,
            path: "/chemical-type",
          },
        ],
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
            path: "/",
          },
          {
            name: "Task Type",
            component: COMPONENTS.TASK_TYPE,
            path: "/task-type",
          },
          {
            name: "Task Status",
            component: COMPONENTS.TASK_STATUS,
            path: "/task-status",
          },
        ],
        component: null,
        path: "menu-task",
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
            path: "/",
          },
          {
            name: "Farm",
            component: COMPONENTS.FARM,
            path: "/farm",
          },
          {
            name: "Area",
            component: COMPONENTS.AREA,
            path: "/area",
          },
          {
            name: "Plant Location",
            component: COMPONENTS.PLANT_LOCATION,
            path: "/plant-location",
          },
        ],
        component: null,
        path: "location",
      },
      {
        nameMenu: "Plant Medium",
        image: ICONS.icon_dashboard,
        imageActive: ICONS.icon_dashboard_active,
        sortItem: 3,
        subItems: [],
        component: COMPONENTS.PLANT_MEDIUM,
        path: "menu-plant-medium"
      },
      {
        nameMenu: "Plant Pot",
        image: ICONS.icon_dashboard,
        imageActive: ICONS.icon_dashboard_active,
        sortItem: 4,
        subItems: [],
        component: COMPONENTS.PLANT_POT,
        path: "menu-plant-pot"
      },
      {
        nameMenu: "Dashboard",
        image: ICONS.icon_dashboard,
        imageActive: ICONS.icon_dashboard_active,
        sortItem: 5,
        subItems: [],
        component: COMPONENTS.DASHBOARD,
        path: "menu-dashboard",
      },
      {
        nameMenu: "Equipment",
        image: ICONS.icon_equipment,
        imageActive: ICONS.icon_equipment,
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
      {
        nameMenu: "Water",
        image: ICONS.icon_water,
        imageActive: ICONS.icon_water_active,
        sortItem: 5,
        component: null,
        path: "water",
        subItems: [
          {
            name: "Water",
            component: COMPONENTS.WATER,
            path: "/"
          }
        ]
      }
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
        path: "settings",
      },
    ].sort((a, b) => a.sortItem - b.sortItem),
  },
];

const NAVIGATION = {
  LISTS_MENU_NAVIGATION: listMenu,
  COMPONENTS: COMPONENTS,
};

export default NAVIGATION;

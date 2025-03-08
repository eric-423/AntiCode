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
  WATER: "Water",
  CHAT: "Manager Chat",
};

const listMenu = [
  {
    title: "MENU",
    data: [
      {
        nameMenu: "User",
        image: ICONS.icon_user,
        imageActive: ICONS.icon_user_active,
        sortItem: 10,
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
        nameMenu: "Resources",
        image: ICONS.icon_resources,
        imageActive: ICONS.icon_resource_active,
        sortItem: 4,
        component: "",
        path: "menu-resources",
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
          {
            name: "Equipment",
            component: COMPONENTS.EQUIPMENT,
            path: "/equipment",
          },
          {
            name: "Equipment Type",
            component: COMPONENTS.EQUIPMENT_TYPE,
            path: "/equipment-type",
          },
          {
            name: "Water",
            component: COMPONENTS.WATER,
            path: "/water",
          },
          {
            name: "Plant Pot",
            component: COMPONENTS.PLANT_POT,
            path: "/plant-pot",
          },
          {
            name: "Plant Medium",
            component: COMPONENTS.PLANT_MEDIUM,
            path: "/plant-medium",
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
        nameMenu: "Dashboard",
        image: ICONS.icon_dashboard,
        imageActive: ICONS.icon_dashboard_active,
        sortItem: 0,
        subItems: [],
        component: COMPONENTS.DASHBOARD,
        path: "menu-dashboard",
      },

      {
        nameMenu: "Manager Chat",
        image: ICONS.icon_chat,
        imageActive: ICONS.icon_chat_active,
        sortItem: 10,
        component: COMPONENTS.CHAT,
        path: "chat",
        subItems: [],
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

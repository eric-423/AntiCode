import ICONS from "./Image";


const COMPONENTS = {
  PLANT: "Plant",
  PLAN_TYPE: "Plant Type",
  LOCATION: "Location",
  FARM: "Farm",
  AREA: "Area",
  PLANT_LOCATION: "Plant Location",
  DASHBOARD: "Dashboard",
  SETTINGS: "Settings"
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
        nameMenu: "Location",
        image: ICONS.icon_plant,
        imageActive: ICONS.icon_plant_active,
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

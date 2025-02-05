import NAVIGATION from "../constant/MenuNavigation";

const useMapPath = (pathName) => {
  let title = null;
  if(["/manager","/manager/"].includes(pathName)){
    return "Dashboard"
  }
  NAVIGATION.LISTS_MENU_NAVIGATION.forEach((itemMenu) => {
    Array.isArray(itemMenu.data) &&
      itemMenu.data.forEach((item) => {
        let path = item.path;
        if (item.subItems.length > 0) {
          item.subItems.forEach((subItem) => {
            if (String(pathName).includes(path + subItem.path)) {
              title = subItem.name;
            }
          });
        } else {
          if (String(pathName).includes(path)) {
            title = item.nameMenu;
          }
        }
      });
  });
  return title;
};
export default useMapPath;

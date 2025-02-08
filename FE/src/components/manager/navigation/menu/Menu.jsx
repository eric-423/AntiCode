import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import "./Menu.css";
import ICONS from "../../../../constant/Image";
import { useNavigate } from "react-router-dom";

const Menu = ({ list }) => {
  const navigate = useNavigate();
  const [itemHover, setItemHover] = useState({
    indexMenu: null,
    index: null,
  });
  const [subItemActive, setSubItemActive] = useState({
    indexMenu: null,
    parentItem: null,
    index: null,
    status: false,
  });
  const [itemActive, setItemActive] = useState({
    indexMenu: null,
    index: null,
    status: false,
  });
  const handleHoverItem = (index, indexMenu) => {
    setItemHover({
      indexMenu: indexMenu,
      index: index,
    });
  };
  const handleLeaveItem = () => {
    setItemHover({
      indexMenu: null,
      index: null,
    });
  };
  const handleItemActive = (index, indexMenu, item) => {
    if (Array.isArray(item.subItems) && item.subItems.length > 0) {
      navigate(item.path + item.subItems[0].path);
    } else {
      navigate(item.path);
    }
    if (index === itemActive.index && indexMenu === itemActive.indexMenu) {
      if (itemActive.status) {
        setSubItemActive({
          indexMenu: null,
          parentItem: null,
          index: null,
          status: null,
        });
      } else {
        setSubItemActive({
          indexMenu: indexMenu,
          parentItem: index,
          index: 0,
          status: true,
        });
      }
      setItemActive({
        indexMenu: indexMenu,
        index: index,
        status: !itemActive.status,
      });
    } else {
      setItemActive({
        indexMenu: indexMenu,
        index: index,
        status: true,
      });
      setSubItemActive({
        indexMenu: indexMenu,
        parentItem: index,
        index: 0,
        status: !itemActive.status,
      });
    }
  };
  const hanldeActiveSubItem = (
    indexParent,
    indexSubItem,
    indexMenu,
    subItem,
    item
  ) => {
    navigate(item.path + subItem.path);
    setSubItemActive({
      indexMenu: indexMenu,
      parentItem: indexParent,
      index: indexSubItem,
      status: !subItemActive.status,
    });
  };
  const pathName = window.location.pathname;
  useEffect(() => {
    if (list) {
      if (["/manager", "/manager/"].includes(pathName)) {
        setItemActive({
          indexMenu: 0,
          index: 0,
          status: true,
        });
        return;
      }
      Array.isArray(list) &&
        list.forEach((itemMenu, indexMenu) => {
          Array.isArray(itemMenu.data) &&
            itemMenu.data.forEach((item, index) => {
              const itemPath = String(item.path);
              console.log(pathName)
              if (pathName.includes(itemPath)) {
                setItemActive({
                  indexMenu: indexMenu,
                  index: index,
                  status: true,
                });
                if (Array.isArray(item.subItems) && item.subItems.length > 0) {
                  item.subItems.forEach((subItem, indexSubItem) => {
                    const subItemPath = String(subItem.path);
                    if (pathName.includes(itemPath + subItemPath)) {
                      setSubItemActive({
                        indexMenu: indexMenu,
                        parentItem: index,
                        index: indexSubItem,
                        status: true,
                      });
                    } else {
                      setSubItemActive({
                        indexMenu: indexMenu,
                        parentItem: index,
                        index: 0,
                        status: true,
                      });
                    }
                    return;
                  });
                }
              }
            });
        });
    }
  }, [list]);
  return (
    <Row className="list-navigation">
      {list.map((listMenu, indexMenu) => (
        <>
          <p>{listMenu.title}</p>
          <div>
            <ul id="list-navigation">
              {listMenu.data.map((item, index) => (
                <li
                  className={
                    indexMenu === itemActive.indexMenu &&
                    index == itemActive.index &&
                    itemActive.status
                      ? "active"
                      : ""
                  }
                >
                  <div
                    onClick={() => handleItemActive(index, indexMenu, item)}
                    onMouseEnter={() => handleHoverItem(index, indexMenu)}
                    onMouseLeave={() => handleLeaveItem()}
                    className="menu-item"
                  >
                    <img
                      src={
                        (index === itemHover.index &&
                          indexMenu === itemHover.indexMenu) ||
                        (index === itemActive.index &&
                          itemActive.status &&
                          indexMenu === itemActive.indexMenu)
                          ? item.imageActive
                          : item.image
                      }
                      alt=""
                    />
                    <span>{item.nameMenu}</span>
                    {item.subItems.length > 0 &&
                    ((index === itemHover.index &&
                      indexMenu === itemHover.indexMenu) ||
                      (index === itemActive.index &&
                        itemActive.status &&
                        indexMenu === subItemActive.indexMenu)) ? (
                      <img
                        className={"more-item-navigation"}
                        style={
                          itemActive.status &&
                          index === itemActive.index &&
                          indexMenu === subItemActive.indexMenu
                            ? { transform: `rotate(${180}deg)` }
                            : { transform: `rotate(${0}deg)` }
                        }
                        src={ICONS.icon_arrow_active}
                        alt=""
                      />
                    ) : null}
                  </div>
                  {item.subItems.length > 0 ? (
                    <div
                      className={
                        index === itemActive.index &&
                        itemActive.status &&
                        indexMenu === subItemActive.indexMenu
                          ? "sub-items-active"
                          : "sub-items-non-active"
                      }
                      style={
                        index === itemActive.index &&
                        itemActive.status &&
                        indexMenu === subItemActive.indexMenu
                          ? { height: `${item.subItems.length * 40 + 20}px` }
                          : null
                      }
                    >
                      {item.subItems.map((subItem, indexSubItem) => (
                        <div className="sub-item">
                          <span
                            onClick={() =>
                              hanldeActiveSubItem(
                                index,
                                indexSubItem,
                                indexMenu,
                                subItem,
                                item
                              )
                            }
                            className={
                              indexSubItem === subItemActive.index &&
                              subItemActive
                                ? "active"
                                : ""
                            }
                          >
                            {subItem.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </>
      ))}
    </Row>
  );
};

export default Menu;

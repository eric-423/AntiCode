import React, { useEffect, useState } from "react";
import "./CardTask.css";
import ICONS from "../../../../../constant/Image";
import axios from "axios";
import BASE from "../../../../../constant/base";
import useFormattedDate from "../../../../../hook/useFormatDate";
import useCompareDate from "../../../../../hook/useCompareDate";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../constant/localStorage";
import { jwtDecode } from "jwt-decode";
import ROLES from "../../../../../constant/role";

const CardTask = ({
  index,
  item,
  isBoxShadow = false,
  titleTask,
  setList,
  listTask,
  taskStatusId,
  setShowModalDetail,
  setItemDetail,
}) => {
  const [workerAssigned, setWorkerAssigned] = useState();
  const [refreshDataManager, setRefreshDataManager] = useLocalStorage(
    LOCALSTORAGE.REFRESH_TASK_MANAGER,
    ""
  );
  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION,
    ""
  );
  const [refreshDataUser, setRefreshDataUser] = useLocalStorage(
    LOCALSTORAGE.REFRESH_TASK_USER,
    ""
  );

  const handleDrag = (event, _index, titleTask, taskStatusId, item) => {
    event.dataTransfer.setData("titleTask", titleTask);
    event.dataTransfer.setData("index", _index);
    event.dataTransfer.setData("item", JSON.stringify(item));
    event.dataTransfer.setData("taskStatusPrevious", taskStatusId);
  };

  const handleDrop = (event, index, titleTask) => {
    event.preventDefault();
    const _titleTask = event.dataTransfer.getData("titleTask");
    const _index = event.dataTransfer.getData("index");
    if (titleTask === _titleTask) {
      let previousList = [...listTask];
      [previousList[index], previousList[_index]] = [
        previousList[_index],
        previousList[index],
      ];
      setList(previousList);
    }
  };

  const handleShowModalDetail = () => {
    setShowModalDetail(true);
    setItemDetail(item);
  };

  const handleFetchUserAssigned = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/task/users-assigned?taskID=${item.taskId}`
      );
      if (!response || response.status !== 200) throw new Error();
      setWorkerAssigned(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      refreshDataUser &&
      refreshDataUser !== "" &&
      String(jwtDecode(atob(accountLoginInformation))?.id) ===
        String(refreshDataUser)
    ) {
      handleFetchUserAssigned();
      setRefreshDataUser()
    }
  }, [refreshDataUser]);

  useEffect(() => {
    if (
      refreshDataManager &&
      refreshDataManager !== "" &&
      jwtDecode(atob(accountLoginInformation))?.role === ROLES.MANAGER
    ) {
      handleFetchUserAssigned();
      setRefreshDataManager();
    }
  }, [refreshDataManager]);

  useEffect(() => {
    if (!workerAssigned) {
      handleFetchUserAssigned();
    }
  }, []);

  return (
    <div
      className="card-task-container"
      onDragStart={(event) =>
        handleDrag(event, index, titleTask, taskStatusId, item)
      }
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop(event, index, titleTask)}
      draggable="true"
      onClick={() => handleShowModalDetail()}
      style={{
        boxShadow: isBoxShadow && "0px 0px 1px 1px rgba(0,0,0,0.06)",
      }}
    >
      <div className="header-card-task-container">
        <div className="task-name">
          <span>{item.taskTypeName}</span>
        </div>
        <img
          src={ICONS.icon_menu}
          width="20px"
          height="20px"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="body-card-task-container">
        <span>{item.taskDescription}</span>
      </div>
      <div className="footer-card-task-container">
        <div className="due-date-group">
          <img src={ICONS.icon_watch} width="18px" height="18px" />
          <span
            style={{
              color:
                useCompareDate(item.dueDate, new Date()) > -1 ? null : "red",
            }}
          >
            {useFormattedDate(item.dueDate, "MMM dd")}
          </span>
        </div>
        <div>
          <img src={ICONS.icon_message} width="18px" height="18px" />
        </div>
        <div className="people-assigned-group">
          {workerAssigned !== undefined && workerAssigned.length > 0 && (
            <div>
              <span>{String(workerAssigned[0]?.userName).charAt(0)}</span>
            </div>
          )}
          {workerAssigned && workerAssigned.length > 2 && (
            <div>
              <span>+{workerAssigned.length - 1}</span>
            </div>
          )}
          {workerAssigned && workerAssigned.length == 2 && (
            <div>
              <span>{String(workerAssigned[1]?.userName).charAt(0)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardTask;

import React, { useEffect, useState } from "react";
import "./TaskColumn.css";
import ICONS from "../../../../../constant/Image";
import CardTask from "../card_task/CardTask";
import BASE from "../../../../../constant/base";
import axios from "axios";

import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../constant/localStorage";
import ROLES from "../../../../../constant/role";
import { jwtDecode } from "jwt-decode";

const TaskColumn = ({
  titleTask,
  isBoxShadow,
  taskStatusId,
  setShowModalDetail,
  setItemDetail,
}) => {
  const [listTasks, setListTasks] = useState();
  const [refreshData, setRefreshData] = useLocalStorage(
    LOCALSTORAGE.REFRESH_TASKS_DATA,
    ""
  );
  const [refreshDataUser, setRefreshDataUser] = useLocalStorage(
    LOCALSTORAGE.REFRESH_TASK_USER,
    ""
  );
  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION,
    ""
  );
  const handleFetchListTasks = async () => {
    try {
      const user = jwtDecode(atob(accountLoginInformation));
      let response;
      if (user?.role === ROLES.MANAGER) {
        response = await axios.get(
          `${BASE.BASE_URL}/task/task-status?statusId=${taskStatusId}`
        );
      } else if (user?.role === ROLES.WORKER) {
        response = await axios.get(
          `${BASE.BASE_URL}/task/user-task?userId=${user?.id}&statusId=${taskStatusId}`
        );
      }
      if (!response || response.status !== 200) throw new Error();
      setListTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrop = async (event, taskStatusId) => {
    event.preventDefault();
    const _taskStatusPrev = event.dataTransfer.getData("taskStatusPrevious");
    if (taskStatusId === Number(_taskStatusPrev)) return;
    const _itemPrev = JSON.parse(event.dataTransfer.getData("item"));
    const item = {
      taskId: _itemPrev.taskId,
      createdAt: _itemPrev.createdAt,
      completedAt: _itemPrev.completedAt,
      taskDescription: _itemPrev.taskDescription,
      taskStatus: taskStatusId,
      taskType: _itemPrev.taskTypeId,
    };
    try {
      const response = await axios.put(`${BASE.BASE_URL}/task`, item);
      if (!response) throw new Error();
      if (taskStatusId || taskStatusId === _taskStatusPrev) {
        setRefreshData([taskStatusId, Number(_taskStatusPrev)]);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {

    if (
      refreshDataUser &&
      refreshDataUser !== "" &&
      String(jwtDecode(atob(accountLoginInformation))?.id) ===
        String(refreshDataUser)
    ) {
      handleFetchListTasks();
      setRefreshDataUser();
    }
  }, [refreshDataUser]);

  useEffect(() => {
    if (
      Array.isArray(refreshData) &&
      (refreshData.includes(Number(taskStatusId)) ||
        refreshData.includes(String(taskStatusId)))
    ) {
      handleFetchListTasks();
      setRefreshData(
        refreshData.filter((item) => Number(item) !== Number(taskStatusId))
      );
    }
  }, [refreshData]);

  useEffect(() => {
    if (!listTasks) {
      handleFetchListTasks();
    }
  }, []);

  return (
    <div className="column-task-container">
      <div className="column-task-title">
        <h6 className="column-task-title-h6">{titleTask}</h6>
        <img
          src={ICONS.icon_menu}
          width="24px"
          height="24px"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div
        className="column-container-tasks"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => handleDrop(event, taskStatusId)}
      >
        {listTasks &&
          Array.isArray(listTasks) &&
          listTasks.map((item, index) => (
            <CardTask
              item={item}
              index={index}
              isBoxShadow={isBoxShadow}
              titleTask={titleTask}
              setList={setListTasks}
              listTask={listTasks}
              taskStatusId={taskStatusId}
              setShowModalDetail={setShowModalDetail}
              setItemDetail={setItemDetail}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskColumn;

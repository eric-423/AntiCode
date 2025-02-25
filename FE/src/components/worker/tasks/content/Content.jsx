import React, { useEffect, useState } from "react";
import "./Content.css";
import { Col, Row } from "react-bootstrap";
import TaskColumn from "./task_column/TaskColumn";
import axios from "axios";
import BASE from "../../../../constant/base";
import LOCALSTORAGE from "../../../../constant/localStorage";
import useLocalStorage from "use-local-storage";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Modal from "../../../manager/schedule_tasks/modal/Modal";

const Content = () => {
  const [status, setStatus] = useState();
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [itemDetail, setItemDetail] = useState();
  const [client, setClient] = useState();
  const [refreshData, setRefreshData] = useLocalStorage(
    LOCALSTORAGE.REFRESH_TASKS_DATA,
    ""
  );
  const [refreshDataUser, setRefreshDataUser] = useLocalStorage(
    LOCALSTORAGE.REFRESH_TASK_USER,
    ""
  );

  const handleFetchTaskStatus = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/task-status`);
      if (!response || response.status !== 200) throw new Error();
      setStatus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConnectWebSocket = async () => {
    const socket = new SockJS(`${BASE.BASE_URL}/web-socket`);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
    });
    client.onConnect = () => {
      client.subscribe("/topic/tasks", (message) => {
        setRefreshData(
          JSON.stringify(message.body).replaceAll(`\"`, ``).split(`|`)
        );
      });
      client.subscribe("/topic/tasks/users", (message) => {
        const userID = JSON.stringify(message.body).replaceAll(`\"`, ``);
        setTimeout(() => {
          setRefreshDataUser(userID);
        }, 2000);
      });
    };
    client.activate();
    setClient(client);
  };

  useEffect(() => {
    if (!status) {
      handleFetchTaskStatus();
    }
  }, []);

  useEffect(() => {
    if (!client) {
      handleConnectWebSocket();
    }
    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, []);
  return (
    <div className="worker-tasks-content">
      <Row>
        <h4 className="worker-tasks-content-h4">
          Your Tasks
        </h4>
      </Row>

      <Row className="worker-tasks-column-task-container">
        {status &&
          status
            .filter(
              (item) =>
                String(item.taskStatusName).toLocaleLowerCase() !==
                  "completed" &&
                String(item.taskStatusName).toLocaleLowerCase() !==
                  "initial"
            )
            .map((item) => (
              <Col>
                <TaskColumn
                  titleTask={item.taskStatusName}
                  isBoxShadow={true}
                  taskStatusId={item.taskStatusId}
                  setShowModalDetail={setShowModalDetail}
                  setItemDetail={setItemDetail}
                />
              </Col>
            ))}
      </Row>
      {showModalDetail && (
        <Modal
          setShowModalDetail={setShowModalDetail}
          itemDetail={itemDetail}
          setItemDetail={setItemDetail}
        />
      )}
    </div>
  );
};

export default Content;

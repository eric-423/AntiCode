import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Header.css";
import ICONS from "../../../constant/Image";
import SearchBar from "../../common/search_bar/SearchBar";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../constant/localStorage";
import { jwtDecode } from "jwt-decode";
import WorkerChat from "../../worker_chat/WorkerChat";

const Header = () => {
  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION
  );
  const handleLogout = () => {
    if (accountLoginInformation != "") {
      setAccountLoginInformation("");
    }
  };
  const [showProfile, setShowProfile] = useState(false);
  const [account, setAccount] = useState();

  useEffect(() => {
    if (!account && accountLoginInformation) {
      setAccount(jwtDecode(atob(accountLoginInformation)));
    }
  }, []);
  useEffect(() => {
    fetchAllManager();
  }, [])

  const [switchManager, setSwitchManager] = useState(false)
  const [managerId, setManagerId] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [managerList, setManagerList] = useState([]);

  const fetchAllManager = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/user/managers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${atob(accountLoginInformation)}`,
        },
      });
      if (response) {
        const data = await response.json();
        console.log(data);
        if (data) {
          setManagerList(data);
        }
      }
    } catch (error) {
      console.error("Error fetching manager data:", error);
    }
  }


  return (
    <div className="header-worker">
      <div className="header-worker-container">
        <div className="header-wroker-logo">
          <img src={ICONS.icon_logo} />
          <span style={{ cursor: "pointer" }}>FTM Co.</span>
          <SearchBar />
        </div>
        <ul className="d-flex ul-header ">
          <li>Tasks</li>
          <li>News</li>
        </ul>

        <div className="message-noti">

          <div
            className="avatar"
            onClick={() => setSwitchManager(!switchManager)}
          >
            <img src={ICONS.icon_message} alt="" />
            {switchManager && (

              <ul className="drop-down-profile">

                {managerList &&
                  managerList.map((manager) => (
                    <li key={manager.id} onClick={() => {
                      setManagerId(manager.id);
                      setIsOpen(!isOpen);
                    }}>
                      {manager.userName}
                    </li>
                  ))
                }

                <li>manager 1</li>
                <li onClick={() => setIsOpen(!isOpen)}>manager 2</li>
              </ul>
            )}
          </div>

          <div style={{ boxShadow: "none", background: "none" }}>
            <img src={ICONS.icon_notification} alt="" />
          </div>
          <div style={{
            width: "max-content",
            display: "flex",
            columnGap: "10px"
          }}>

            <div className="name-role-profile">
              <span>{account && account.name}</span>
            </div>

            <div
              className="avatar"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              {showProfile && (
                <ul className="drop-down-profile">
                  <li>Profile</li>
                  <li onClick={() => handleLogout()}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>


      {
        isOpen && (
          <WorkerChat managerId={managerId} setIsOpen={setIsOpen} isOpen={isOpen} />
        )
      }


    </div >
  );
};

export default Header;

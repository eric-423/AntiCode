import { Card } from "react-bootstrap";
import "./CardPlantType.css";
import ICONS from "../../../../../../constant/Image";
import { toast } from "react-toastify/unstyled";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE from "../../../../../../constant/localStorage";


const CardPlantType = ({ item, setRefreshData, setUpdateItem }) => {

  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth]);


  const showToastMessageSuccess = () => {
    toast.success("Equipment type was deleted !", {
      position: "top-right",
    });
  };
  const showToastMessageFail = () => {
    toast.error("Equipment can not delete !", {
      position: "top-right",
    });
  };

  const handleDeleteItem = async (item) => {
    console.log(item)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT
        }/chemical-type/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!data) throw new Error();
      showToastMessageSuccess();
    } catch (error) {
      console.log(error)
      showToastMessageFail()
    } finally {
      setRefreshData(prev => !prev)
    }
  };
  const handleUpdateItem = (item) => {
    setUpdateItem(item)
  }

  return (
    <Card className="card-plant-type" style={{ backgroundColor: item.deleted ? "#f8d7da" : "#d4edda", textAlign: 'center' }}>
      <Card.Header className="card-header pb-2" style={{ display: 'flex', justifyContent: 'center', minWidth: '200px' }} >
        <div className="container-icon">
          <img src={ICONS.icon_update} onClick={() => handleUpdateItem(item)} />
        </div>
        <div className="container-icon" onClick={() => handleDeleteItem(item)}>
          <img src={ICONS.icon_delete} />
        </div>
      </Card.Header>
      <Card.Body className="card-body" >
        <Card.Title className="card-title-plant-type">{item.name}</Card.Title>
        <Card.Text className="card-text-plant-type">
          {item.description}
        </Card.Text>
        <Card.Text className="card-text-plant-type" style={{ color: item.deleted ? "red" : "green" }}>
          {
            item.deleted ? "Deleted" : "Active"
          }
        </Card.Text>
      </Card.Body>
    </Card>
  );
};


CardPlantType.propTypes = {
  item: PropTypes.object.isRequired,
  setRefreshData: PropTypes.func.isRequired,
  setUpdateItem: PropTypes.func.isRequired,
};

export default CardPlantType;

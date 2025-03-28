import { useEffect, useState } from 'react'
import './Table.css'
import Header from '../../../../common/table/header/Header'
import Body from './body/Body'
import useLocalStorage from 'use-local-storage'
import LOCALSTORAGE from '../../../../../constant/localStorage'

const Table = ({ listTitle, refreshData, setRefreshData, farmId }) => {
  const [itemsActive, setItemsActive] = useState([])
  const [selectedArea, setselectedArea] = useLocalStorage(
    'manager_area_selected',
    ''
  )
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])
  const [listItems, setListItems] = useState()
  const handleFetchArea = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/area/farm/${farmId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,

          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setListItems(data)
        console.log(data);

      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSelectItem = (item_index) => {
    setItemsActive([item_index.areaId])
  }
  useEffect(() => {
    setselectedArea(itemsActive)
  }, [itemsActive])
  useEffect(() => {
    handleFetchArea()
  }, [refreshData, farmId])
  return (
    <>
      <Header listTitle={listTitle} />
      <div className="container-table-body">
        {listItems && listItems.length > 0 ? (
          listItems.map((item, index) => (
            <Body
              key={item.areaId}
              handleSelectItem={handleSelectItem}
              itemsActive={itemsActive}
              item={item}
              index={index}
              setRefreshData={setRefreshData}
              listTitle={listTitle}
            />
          ))) : (
          <div>No data</div>
        )}
      </div>
    </>
  )
}

export default Table

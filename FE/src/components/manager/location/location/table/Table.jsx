import { useEffect, useState } from 'react'
import './Table.css'
import Header from '../../../../common/table/header/Header'
import Body from './body/Body'
import useLocalStorage from 'use-local-storage'

const Table = ({ listTitle, refreshData, setRefreshData, areaId }) => {
  const [itemsActive, setItemsActive] = useState([])
  const [selectedLocation, setSelectedLocation] = useLocalStorage(
    'manager_location_selected',
    ''
  )
  const [listItems, setListItems] = useState()
  const handleFetchLocation = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/location/api/${areaId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data)

        setListItems(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSelectItem = (item_index) => {
    setItemsActive([item_index.locationId])
  }
  useEffect(() => {
    setSelectedLocation(itemsActive)
  }, [itemsActive])
  useEffect(() => {
    handleFetchLocation()
  }, [refreshData, areaId])
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
          ))):(
            <div>No data</div>
          )}
      </div>
    </>
  )
}

export default Table

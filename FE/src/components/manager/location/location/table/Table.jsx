import { useEffect, useState } from 'react'
import './Table.css'
import Header from '../../../../common/table/header/Header'
import Body from './body/Body'
import useLocalStorage from 'use-local-storage'

const Table = ({ listTitle, refreshData, setRefreshData }) => {
  const [itemsActive, setItemsActive] = useState([])
  const [selectedLocation, setSelectedLocation] = useLocalStorage(
    'manager_location_selected',
    ''
  )
  const [listItems, setListItems] = useState()
  const handleFetchLocation = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/location`,
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

        setListItems(data.data)
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
  }, [refreshData])
  return (
    <>
      <Header listTitle={listTitle} />
      <div className="container-table-body">
        {listItems &&
          listItems.map((item, index) => (
            <Body
              key={index}
              handleSelectItem={handleSelectItem}
              itemsActive={itemsActive}
              item={item}
              index={index}
              setRefreshData={setRefreshData}
              listTitle={listTitle}
            />
          ))}
      </div>
    </>
  )
}

export default Table

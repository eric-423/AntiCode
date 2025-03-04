import { useEffect, useState } from 'react'
import './Table.css'
import Header from '../../../../common/table/header/Header'
import Body from './body/Body'
import useLocalStorage from 'use-local-storage'

const Table = ({ listTitle, refreshData, setRefreshData }) => {
  const [itemsActive, setItemsActive] = useState([])
  const [selectedArea, setselectedArea] = useLocalStorage(
    'manager_area_selected',
    ''
  )
  const [listItems, setListItems] = useState()
  const handleFetchArea = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/area`,
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
    setItemsActive([item_index.areaId])
  }
  useEffect(() => {
    setselectedArea(itemsActive)
  }, [itemsActive])
  useEffect(() => {
    handleFetchArea()
  }, [refreshData])
  return (
    <>
      <Header listTitle={listTitle} />
      <div className="container-table-body">
        {listItems &&
          listItems.map((item, index) => (
            <Body
              key={item.areaId}
              handleSelectItem={handleSelectItem}
              itemsActive={itemsActive}
              item={item}
              index={index}
              setRefreshData={setRefreshData}
            />
          ))}
      </div>
    </>
  )
}

export default Table

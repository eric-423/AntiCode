import { useState } from 'react'
import './PlantPot.css'
import ToolBar from './tool_bar/ToolBar'
import Table from './table/Table'

const PlantPot = () => {
  const [refreshData, setRefreshData] = useState(false)
  const listTitle = [
    {
      name: 'No.',
      column: 0.5,
    },
    {
      name: 'Name',
      column: 1.75,
    },
    {
      name: 'Material',
      column: 1.75,
    },
    {
      name: 'Quantity',
      column: 1.5,
    },
    {
      name: '',
      column: 1,
    },
  ]

  return (
    <div className="plant-container">
      <ToolBar setRefreshData={setRefreshData} />
      <Table
        listTitle={listTitle}
        refreshData={refreshData}
        setRefreshData={setRefreshData}
      />
    </div>
  )
}

export default PlantPot

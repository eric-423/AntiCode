import { useState } from 'react'
import './PlantMedium.css'
import ToolBar from './tool_bar/ToolBar'
import Table from './table/Table'

const PlantMedium = () => {
  const [refreshData, setRefreshData] = useState(false)
  const listTitle = [
    {
      name: 'No.',
      column: 0.5,
    },
    {
      name: 'Medium Name',
      column: 1.75,
    },
    {
      name: 'Description',
      column: 1.75,
    },
    {
      name: 'Weight',
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

export default PlantMedium

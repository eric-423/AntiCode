import { useState } from 'react'
import './PlantLocation.css'
import ToolBar from './tool_bar/ToolBar'
import Table from './table/Table'

const PlantingLocation = () => {
  const [refreshData, setRefreshData] = useState(false)
  const listTitle = [
    {
      name: 'No.',
      column: 0.5,
    },
    {
      name: 'Location Name',
      column: 1.75,
    },
    {
      name: 'Plant Name',
      column: 1.75,
    },
    {
      name: 'Start Date',
      column: 1.5,
    },
    {
      name: 'End Date',
      column: 1.5,
    },
    {
      name: 'Is Harvest',
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

export default PlantingLocation

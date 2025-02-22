import React, { useEffect, useState } from 'react'
import './PlantLocation.css'
import ToolBar from './tool_bar/ToolBar'
import Table from './table/Table'

const Task = () => {
  const [refreshData, setRefreshData] = useState(false)
  const listTitle = [
    {
      name: 'No.',
      column: 0.5,
    },
    {
      name: 'Type',
      column: 1.75,
    },
    {
      name: 'Start Date',
      column: 1.5,
    },
    {
      name: 'Complete Date',
      column: 1.5,
    },
    {
        name: 'Description',
        column: 1.75,
    },
    {
      name: 'Status',
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

export default Task

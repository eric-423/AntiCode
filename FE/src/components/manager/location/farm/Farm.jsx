import React, { useEffect, useState } from 'react'
import './Farm.css'
import ToolBar from './tool_bar/ToolBar'
import Table from './table/Table'

const Farm = () => {
  const [refreshData, setRefreshData] = useState(false)
  const listTitle = [
    {
      name: 'Id',
      column: 0.5,
    },
    {
      name: 'Name',
      column: 1.5,
    },
    {
      name: 'Extent',
      column: 1.75,
    },
    {
      name: 'Address',
      column: 2.5,
    },
    {
      name: '',
      column: 0.5,
    },
  ]

  return (
    <div className="plant-container">
      <ToolBar setRefreshData={setRefreshData} />
      <Table listTitle={listTitle} refreshData={refreshData} />
    </div>
  )
}

export default Farm

import React, { useEffect, useState } from 'react'
import './Area.css'
import ToolBar from './tool_bar/ToolBar'
import Table from './table/Table'

const Area = () => {
  const [refreshData, setRefreshData] = useState(false)
  const listTitle = [
    {
      name: 'No.',
      column: 0.5,
    },
    {
      name: 'Area Name',
      column: 1.75,
    },
    {
      name: 'Extent',
      column: 1.75,
    },
    {
      name: 'Width',
      column: 1.5,
    },
    {
      name: 'Length',
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

export default Area

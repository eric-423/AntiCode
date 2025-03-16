import React, { useEffect, useState } from 'react'
import './Location.css'
import ToolBar from './tool_bar/ToolBar'
import Table from './table/Table'
import { useParams } from 'react-router-dom'


const Location = () => {
  const { areaId } = useParams()
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
        areaId={areaId}
      />
    </div>
  )
}

export default Location

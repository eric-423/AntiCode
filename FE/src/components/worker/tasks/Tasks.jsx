import React from 'react'
import './Tasks.css'
import Content from './content/Content'
import StatusBar from './status_bar/StatusBar'

const Tasks = () => {
  return (
    <div className='worker-tasks-container d-flex'>
        <Content />
        <StatusBar />
    </div>
  )
}

export default Tasks
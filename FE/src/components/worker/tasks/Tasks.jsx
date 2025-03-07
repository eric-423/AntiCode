import React from 'react'
import './Tasks.css'
import Content from './content/Content'
import StatusBar from './status_bar/StatusBar'
import WorkerChat from '../../worker_chat/WorkerChat'
const Tasks = () => {
  return (
    <div className='worker-tasks-container d-flex'>
      <Content />
      <StatusBar />
      <WorkerChat />
    </div>
  )
}

export default Tasks
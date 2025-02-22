import React from 'react'
import './TaskColumn.css'
import ICONS from '../../../../../constant/Image'
import CardTask from '../card_task/CardTask'

const TaskColumn = ({titleTask, listTask}) => {
  return (
    <div className='column-task-container'>
        <div className='column-task-title'>
            <h6 className='column-task-title-h6'>{titleTask}</h6>
            <img src={ICONS.icon_menu} width="24px" height="24px" style={{cursor:"pointer"}}/>
        </div>
        <div className='column-container-tasks' >
          {listTask && Array.isArray(listTask) && listTask.map((item, index) => (
             <CardTask  item={item} index={index} />
          ))}
         
        </div>
    </div>
  )
}

export default TaskColumn
import React from 'react'
import './Filter.css'
import ICONS from '../../../constant/Image'

const Filter = () => {
  return (
    <div className='filter-group'>
        <span>
            Filter
        </span>
        <img src={ICONS.icon_filter} />
    </div>
  )
}

export default Filter
import React from 'react'
import Header from '../../components/worker/header/Header'
import './Worker.css'
import { Outlet } from 'react-router-dom'

const Worker = () => {
  return (
    <div className='worker-container'>
        <Header />
        <div className='worker-container-content'>
            <Outlet />
        </div>
    </div>
  )
}

export default Worker
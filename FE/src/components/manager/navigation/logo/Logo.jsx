import React from 'react'
import { Row } from 'react-bootstrap'
import ICONS from '../../../../constant/Image'
import './Logo.css'

const Logo = () => {
  return (
    <Row className='manager-logo'>
        <img src={ICONS.icon_logo} />
        <span style={{cursor: 'pointer'}}>FTM Co.</span>
    </Row>
  )
}

export default Logo
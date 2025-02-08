import React from 'react'
import './Button.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Button = ({text, handleOnClick}) => {
  return (
    <div onClick={() => handleOnClick()} className='button-common'>
        <span className='text-login'>{text}</span>
    </div>
  )
}

export default Button
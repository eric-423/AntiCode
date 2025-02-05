import React from 'react'
import './SearchBar.css'
import ICONS from '../../../constant/Image'
const SearchBar = () => {
  return (
    <div className='search-bar'>
       <img  src={ICONS.icon_search}/>
       <input type='text' placeholder='Search...'/>
    </div>
  )
}

export default SearchBar
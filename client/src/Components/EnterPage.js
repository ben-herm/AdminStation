import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import bg from '../img/bookBG.jpeg'
import '../styles/main.scss'
const EnterPage = () => {
  const bgc = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroudnPosition: 'top',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <div style={bgc} className='enterPage'>
      <div className='nav-page'>
        <h1>Admin Station</h1>
        <Link to='/list'>
          <button className='welcome-btn'>Enter Admin Area</button>
        </Link>
      </div>
    </div>
  )
}
export default EnterPage

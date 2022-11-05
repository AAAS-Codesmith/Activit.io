import React from 'react'
import { Link } from 'react-router-dom'

function HomeButton() {

  return (
    <div>
      <Link to='/' className='home-button-link'>
        <button className='home-button button'
          onClick={() => {
            console.log('Clicking home button')
          }}>
          Home
        </button>
      </Link>

    </div>
  )
}

export default HomeButton;

import React from 'react';
import { Link } from 'react-router-dom';

const ActivityCard = () => {
  return (
    <div>
      <Link to='/activities' >
        <button className='button' onClick={() => {
          console.log('Move to activity')
        }}>
          ACTIVITY
        </button>
      </Link>
    </div>
  )
}

export default ActivityCard;
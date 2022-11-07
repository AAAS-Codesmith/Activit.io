import React from 'react';
import { Link } from 'react-router-dom';

const ActivityCard = (props) => {
  return (
    <div>
      <Link
        to='/activities'
        state={props}
      >
        <button className='button' onClick={console.log('Move to activity')}>
          <div>
            <h2>{props.activity}</h2>
            <p>with {props.teamName}</p>
          </div>
        </button>
      </Link>
    </div>
  )
}

export default ActivityCard;
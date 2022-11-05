import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = () => {
  return (
    <div>
      <Link to='/teamInfo'>
        <button className='button' onClick={
          () => {
            console.log('Going to team info');
          }}>
          TEAM
        </button>
      </Link>
    </div>
  )
}

export default TeamCard;
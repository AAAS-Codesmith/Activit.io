import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = (props) => {
  return (
    <div>
      <Link to='/teamInfo'>
        <button onClick={(e) => {
          console.log('Going to ', props.teamName ,' info');
        }}>
          <p>Team: {props.teamName}</p>
          <p>Members: {props.teamMembers.length}</p>
        </button>
      </Link>
    </div>
  )
}

export default TeamCard;
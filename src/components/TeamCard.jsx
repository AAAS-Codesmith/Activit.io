import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = (props) => {
  console.log('Teamcard props', props)
  const testFn = () => console.log('ahhhhh');
  return (
    <div>
      {/* Passing props from 
          TotalTeamDisplay -> 
          current TeamCard ->
          TeamInfo */}
      <Link
        to='/teamInfo'
        state={props}
      >
        <button className='card-button button-hover' onClick={(e) => {
          console.log('Going to ', props.teamName, ' info');
        }}>
          <p>Team: {props.teamName}</p>
          <p>Members: {props.teamMembers.length}</p>
        </button>
      </Link>
    </div >
  )
}

export default TeamCard;
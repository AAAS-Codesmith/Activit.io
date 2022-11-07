import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = (props) => {
  console.log('Teamcard props', props)
  // Assemble names into a string
  const members = props.teamMembers.reduce((team, member) => `${team}, ${member}`)

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
          <h2>{props.teamName}</h2>
          <p>ft. {members}</p>
        </button>
      </Link>
    </div >
  )
}

export default TeamCard;
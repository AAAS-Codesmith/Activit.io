import React from 'react'
import TeamCard from './TeamCard.jsx';
import { Link } from 'react-router-dom';

function TotalTeamDisplay() {
  // Populate with teams from DB we're on
  const teamsArr = [];
  // For the current user, get an array of objects where each object has:
  /* {
      team_id,
      teamName,
      teamMembers,
     } */
  // Eventually will be mapped from DB
  teamsArr.push(
    <TeamCard />
  )
  return (
    <div className='total-team-display flex-column flex-center container-card'>
      <h1>Total Team Display</h1>
      <Link to='/createTeam'>
        <button className='button'>
          Create Team
        </button>
      </Link>
      <div className='teams-scroll-container'>
        <div className='teams-scroll'>
          {/* <TeamCard team_id={team_id}> */}
          {/* Test case below delete whenever */}
          {teamsArr}
        </div>
      </div>
    </div>
  )
}

export default TotalTeamDisplay;

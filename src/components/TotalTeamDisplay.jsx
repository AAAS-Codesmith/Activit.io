import React from 'react'
import TeamCard from './TeamCard.jsx';

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
    <div>
      <h1>Total Team Display</h1>
      <div className='TeamsScrollContainer'>
        <div className='TeamsScroll'>
          {/* <TeamCard team_id={team_id}> */}
          {/* Test case below delete whenever */}
          {teamsArr}
        </div>
      </div>
    </div>
  )
}

export default TotalTeamDisplay

import React from 'react'
import TeamCard from './TeamCard.jsx';
import { Link } from 'react-router-dom';

function TotalTeamDisplay() {
  // Populate with teams from DB we're on
  // Teams will have the following info we will need to drill down
  /*
  team_id,
  teamName,
  teamMembers: [],
  activities: []
  */
  const dummyTeamsArr = [
    {
      team_id: 0,
      teamName: 'AAAS',
      teamMembers: ['Ahsunn', 'Aleks', 'Azaa', 'Steeb'],
      activities: ['Setting up Team Card display'],
    }
  ];
  // Parse through to create team card displays
  const teamCardDisplay = dummyTeamsArr.map(team =>
    <TeamCard
      key={team.team_id}
      teamName={team.teamName}
      teamMembers={team.teamMembers}
      activities={team.activities}
      />
  );
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
          {/* Test case below delete whenever */}
          {teamCardDisplay}
        </div>
      </div>
    </div>
  )
}

export default TotalTeamDisplay;

import React, { useContext } from 'react'
import TeamCard from './TeamCard.jsx';
import { TeamsContext } from '../App.jsx';
import { Link } from 'react-router-dom';

function TotalTeamDisplay() {
  // TotalTeams State Arr from App.jsx
  const teamsContextData = useContext(TeamsContext);
  console.log('Context data', teamsContextData);

  // Set initial state
  const [totalTeams, setUpdateTeams] = React.useState(teamsContextData);

  // Parse through to create team card displays
  const teamCardDisplay = totalTeams.map(team => {
    return (
      <TeamCard
        key={team.team_id}
        teamName={team.teamName}
        teamMembers={team.teamMembers}
        teamActivities={team.teamActivities}
      />
    )
  }
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
          {teamCardDisplay}
        </div>
      </div>
    </div >
  )
}

export default TotalTeamDisplay;

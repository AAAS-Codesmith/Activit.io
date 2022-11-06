import React from 'react'
import TeamCard from './TeamCard.jsx';
import { Link } from 'react-router-dom';

function TotalTeamDisplay() {
  // Alex:Backend Replace with Fetch GET from DB
  const dummyTeamsArr = [
    {
      team_id: 0,
      teamName: 'AAAS Test Long String Title Test',
      teamMembers: ['Ahsunn', 'Aleks', 'Azaa', 'Steeb'],
      teamActivities: ['Testing initial team'],
    },
    {
      team_id: 1,
      teamName: 'AAAS Test Two',
      teamMembers: ['Jared', 'Katrina', 'Kristin', 'Camera'],
      teamActivities: ['Testing multiple teams'],
    }
  ];

  // Set initial state
  const [totalTeams, setUpdateTeams] = React.useState(dummyTeamsArr)

  const updateTeams = (data) => {
    console.log('test button')
    // setUpdateTeams(data);
    setUpdateTeams([{
        team_id: 0,
      teamName: 'TESSSST',
      teamMembers: ['ahh', 'ahh', 'ahh', 'ahh'],
      teamActivities: ['Testing initial team'],
    }])
  }

  function test() {
    console.log('hi')
  }

  // Parse through to create team card displays
  const teamCardDisplay = totalTeams.map(team => {
    // console.log(updateTeams)
    return (
      <TeamCard
        key={team.team_id}
        teamName={team.teamName}
        teamMembers={team.teamMembers}
        teamActivities={team.teamActivities}
        // teamFunction={updateTeams}
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

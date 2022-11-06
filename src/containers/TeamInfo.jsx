/*
  TeamInfo Page goals: 
    [x]See Team info (TeamID, Team Members, List of activities)
    [x]Display all activities from DB as components
      [x]Alex:Alex set up state of page from info on the DB call
      [x]Info is drilled in from specific team id reference in component above (TotalTeamDisplay)
    []Create 'Add Activity' button
      []Fetches from API for an activity based on group size (other info/preferences can be stretch)
      []Adds activity to our DB into our specific team's activities
      []Alex:Alex Resync DB to state with hooks
*/
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function TeamInfo(props) {
  console.log('props . sync function?', props.sync)
  // Storing location information sent from Link 
  const location = useLocation();
  // Initialize state, dummy default data
  const [teamInfo, setUpdateTeam] = React.useState({
    teamName: 'Dummy Data',
    teamMembers: ['User1', 'User2', 'User3', 'User4'],
    teamActivities: ['Dummy Event'],
  });

  // UseEffect Testing
  useEffect(() => {
    // Double checking current state and updated states
    if (JSON.stringify(location.state) !== JSON.stringify(teamInfo)) {
      console.log('Old team info', teamInfo);
      console.log('New linked data', location.state);
      // Updating if different with new linked data
      setUpdateTeam({ ...location.state });
    }
  })

  // Populate team members + activities
  const teamMembers = teamInfo.teamMembers.map(ele =>
    <li key={ele}>{ele}</li>
  )
  const activities = teamInfo.teamActivities.map(activity =>
    <li key={activity}>{activity}</li>
  )

  return (
    <div className='team-info container-card flex-column flex-center'>
      <h1>{teamInfo.teamName}</h1>
      <h2>Team Members</h2>
      {teamMembers}
      <h2>Activities</h2>
      {activities}
      <button
        className='button align-self-end'
        onClick={() => {
          console.log('Updating activities')
          // Goals
          // Create fetch POST adding activity to current Team DB
          // Updates state in TotalTeamDisplay
          // New updating teamActivities propagates down back here

          // Alex:Alex fix this - Fires in App.jsx but no state change yet.
          props.sync([
            {
              team_id: 0,
              teamName: 'Swap Data?',
              teamMembers: ['Ahsunn', 'Aleks', 'Azaa', 'Steeb'],
              teamActivities: ['Testing initial team'],
            }
          ])
        }
        }>
        Add Activity
      </button>
    </div>
  )
}

export default TeamInfo;
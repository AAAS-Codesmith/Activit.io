/*
  TeamInfo Page goals: 
    -See Team info (TeamID, Team Members, List of activities)
    -Display all activities from DB as components
      -Alex:Alex set up state of page from info on the DB call
      -Info is drilled in from specific team id reference in component above (TotalTeamDisplay)
    -Create 'Add Activity' button
      -Fetches from API for an activity based on group size (other info/preferences can be stretch)
      -Adds activity to our DB into our specific team's activities
      -Alex:Alex Resync DB to state with hooks
*/
import React, { useEffect, useState } from 'react';

function TeamInfo() {
  // Initialize state, dummy data temp
  const [teamInfo, updateTeam] = React.useState({
    teamName: 'Testing - AAAS',
    teamMembers: ['Ahsunn', 'Aleks', 'Azaa', 'Steeb'],
    teamActivities: ['Creating a scratch project'],
  });

  // UseEffect Testing
  useEffect(() => {
    console.log('TeamInfo updated!')
    console.log(teamInfo)
  })

  // Populate team members + activities
  const teamMembers = teamInfo.teamMembers.map(ele =>
    <li key={ele}>{ele}</li>
  )
  const activities = teamInfo.teamActivities.map(activity =>
    <li key={activity}>{activity}</li>
  )

  return (
    <div className='team-info'>
      <h1>{teamInfo.teamName}</h1>
      <h2>Team Members</h2>
      {teamMembers}
      <h2>Activities</h2>
      {activities}
      <button
        onClick={() => updateTeam(
          {
            ...teamInfo,
            teamActivities: [...teamInfo.teamActivities, 'new activity temp']
          }
        )}>
        Add Activity
      </button>
    </div>
  )
}

export default TeamInfo;
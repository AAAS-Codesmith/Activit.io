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
import React, { useEffect, useState, useContext } from 'react';
import { TeamsContext } from '../App.jsx';
import { useLocation } from 'react-router-dom';


function TeamInfo(props) {
  // Storing location information sent fom Link 
  const location = useLocation();
  console.log('location states teamName', location.state.teamName)
  const teamContextFilter = useContext(TeamsContext);
  const specificTeam = teamContextFilter.filter(obj => obj.teamName === location.state.teamName)
  console.log('teamContextFilter', teamContextFilter);
  console.log('specificTeam', specificTeam);
  // Initialize state, dummy default data
  const [teamInfo, setUpdateTeam] = React.useState(...specificTeam);
  console.log('Current team info state:', teamInfo);


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

          // Add running
          // useState => Add running
          // sync->App.jsx = update state + DB
          const arrActivities = ['run', 'walk', 'movie', 'party'];
          const testActvity = arrActivities[Math.floor(Math.random() * arrActivities.length)];
          const newActivityArr = [...teamInfo.teamActivities].concat(testActvity)
          // Alex:Alex fix this - Fires in App.jsx but no state change yet.
          props.sync([
            {
              team_id: 0,
              teamName: 'AAAS Test Long String Title Test',
              teamMembers: ['Ahsunn', 'Aleks', 'Azaa', 'Steeb'],
              teamActivities: newActivityArr,
            }
          ])
          setUpdateTeam({...teamInfo, teamActivities: newActivityArr})
        }
        }>
        Add Activity
      </button>
    </div>
  )
}

export default TeamInfo;
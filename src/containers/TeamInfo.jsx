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
  // Passing in total teams state from App.jsx (Arr of Objects)
  const totalTeamsArr = useContext(TeamsContext);
  // Filter to find this specific team's info from totalTeams
  const currTeam = totalTeamsArr.filter(obj => obj.teamName === location.state.teamName)
  console.log('totalTeamsArr', totalTeamsArr);
  console.log('currTeam', currTeam);

  // Initialize state to currTeams data (Obj)
  // *currTeam is a single object inside of an array which is why the spread
  const [teamInfo, setUpdateTeam] = React.useState(...currTeam);
  console.log('Current team info state:', teamInfo);

  // Generate an activity.
  // Alex:Backend - Fetch activity from API and parse into following
  const getActivity = () => {
    // Test data to generate random activity (replace with API fetch)
    const arrActivities = ['Run', 'Walk', 'Movies', 'Party', 'Cry', 'APC'];
    let testActivity = arrActivities[Math.floor(Math.random() * arrActivities.length)];

    // clone to keep track of current team to update current team info state with
    let currTeamClone;
    // clone of total teams state to update App.jsx with
    const totalTeamsClone = [...totalTeamsArr];
    // Iterating to find our currentTeam to mutate
    for (const team of totalTeamsClone) {
      if (team.teamName === location.state.teamName) {
        // Ensures we don't double the same activity in the same team
        // ** Infinite loop if we click more than the data I set up on arrActivities
        while (team.teamActivities.includes(testActivity)) {
          testActivity = arrActivities[Math.floor(Math.random() * arrActivities.length)];
        }
        // Add to our totalTeams specific team activities
        team.teamActivities.push(testActivity);
        // Assign this team's info to our currTeamClone
        currTeamClone = team;
      }
    }

    // useState helper updates our App.jsx total state for this user
    // (Arr of objects)
    props.sync(totalTeamsClone)
    // useState to update our current page's data
    setUpdateTeam({ ...currTeamClone })
  }

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
          getActivity();
        }}>
        Add Activity
      </button>
    </div>
  )
}

export default TeamInfo;
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
import React from 'react'
import { Link } from 'react-router-dom';


function TeamInfo() {
  return (
    <div className='team-info'>
      <h1>Team Info</h1>
    </div>
  )
}

export default TeamInfo;
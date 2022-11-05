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

// const teamMembers = props.teamMembers.map(name => {
//   <li>{name}</li>
// })

// const activities = props.activities.map(activity => {
//   <li>{activity}</li>
// })

function TeamInfo(props) {
  return (
    <div className='team-info'>
      {/* <h1>{props.teamName}</h1> */}
      <h2>Team Members</h2>
      {/* {teamMembers} */}
      <h2>Activities</h2>
      {/* {activities} */}
    </div>
  )
}

export default TeamInfo;
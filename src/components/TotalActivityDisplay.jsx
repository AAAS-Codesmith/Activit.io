import React from 'react'
import ActivityCard from './ActivityCard.jsx';

function TotalActivityDisplay() {
  // Alex:DB - Expecting array of activites that have been registered
  // Alex:Self - Will need identifying data so I can drill the right 
  // Team name, members, and activity info into the Card Activity when clicked
  // to display on the ActivityCard component
  const activitesArr = [];
  // Test data
  activitesArr.push(
    <ActivityCard key="temp"/>
  )
  return (
    <div className='total-activity-display flex-column flex-center container-card'>
      <h1>Total Activity Display</h1>
      {activitesArr}
    </div>
  )
}

export default TotalActivityDisplay

import React from 'react'
import ActivityCard from './ActivityCard.jsx';

function TotalActivityDisplay() {
  // Map from DB later with all activites subscribed to
  const activitesArr = [];
  // Test data
  activitesArr.push(
    <ActivityCard />
  )
  return (
    <div>
      <h1>Total Activity Display</h1>
      {activitesArr}
    </div>
  )
}

export default TotalActivityDisplay

import React from 'react'
import TotalTeamDisplay from '../components/TotalTeamDisplay.jsx';
import TotalActivityDisplay from '../components/TotalActivityDisplay.jsx';

function Home() {
  return (
    <div className='flex-column flex-center home '>
      <h1>Who's down to hang?</h1>
      <TotalTeamDisplay />
      <h1>Choose an activity!</h1>
      <TotalActivityDisplay />
    </div>
  )
}

export default Home;

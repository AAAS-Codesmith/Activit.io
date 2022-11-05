import React from 'react'
import TotalTeamDisplay from '../components/TotalTeamDisplay.jsx';
import TotalActivityDisplay from '../components/TotalActivityDisplay.jsx';

function Home() {
  return (
    <div className='flex-column home'>
      <h1>Home</h1>
      <TotalTeamDisplay />
      <TotalActivityDisplay />
    </div>
  )
}

export default Home;

import React from 'react'
import { useLocation } from 'react-router-dom';
import TotalTeamDisplay from '../components/TotalTeamDisplay.jsx';
import TotalActivityDisplay from '../components/TotalActivityDisplay.jsx';

function Home() {
  const location = useLocation();
  console.log(location.state, 'userData currently in state');
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

import React from 'react'
import { useLocation } from 'react-router-dom';
import TotalTeamDisplay from '../components/TotalTeamDisplay.jsx';
import TotalActivityDisplay from '../components/TotalActivityDisplay.jsx';

function Home() {
  const location = useLocation();
  console.log(location.state, 'userData currently in state');
  return (
    <div className="flex-column flex-center home ">
      <h1>Welcome to Activ-8</h1>
      <TotalTeamDisplay />
      <hr></hr>
      <h1>Generate A Random Activity!</h1>
      <TotalActivityDisplay />
    </div>
  );
}

export default Home;

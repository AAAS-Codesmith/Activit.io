import { Routes, Route } from "react-router-dom";
import React, { useEffect, createContext } from 'react';

import LoginPage from './containers/LoginPage.jsx';
import HomeButton from './components/HomeButton.jsx';
import Home from './containers/Home.jsx';
import CreateTeam from './containers/CreateTeam.jsx';
import TeamInfo from './containers/TeamInfo.jsx';
import ActivityInfo from './containers/ActivityInfo.jsx';

export const TeamsContext = React.createContext(null);

function App() {
  // Initialize state to be array of teams w/associated activities
  const [userData, setUserData] = React.useState([]);

  // Goal: Pass setUserData to be invoked with fetched data anytime new data is created
  function syncStatetoDB(data) {
    console.log('Updating state with DB change');
    setUserData(data);
  }

  // useEffect like componentDidMount - One time call
  useEffect(() => {
    // Replace with fetch GET call to give us array of teams with associated activities
    setUserData([
      {
        team_id: 0,
        teamName: 'Wonderpuss Bois',
        teamMembers: ['Me', 'Kim', 'Pete', 'Ari'],
        teamActivities: ['Stir drama'],
      },
      {
        team_id: 1,
        teamName: 'Codesmith Squad',
        teamMembers: ['Me', 'Jared', 'Katrina', 'Will'],
        teamActivities: ['Get an APC'],
      }
    ])
  }, []);

  return (
    <TeamsContext.Provider value={userData}>
      <div className='main-app flex-column flex-center'>
        <HomeButton />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/createTeam' element={<CreateTeam sync={syncStatetoDB} />} />
          <Route path='/teamInfo' element={<TeamInfo sync={syncStatetoDB} />} />
          <Route path='/activities' element={<ActivityInfo sync={syncStatetoDB} />} />
        </Routes>
      </div>
    </TeamsContext.Provider>
  )
}


export default App;

import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

import LoginPage from './containers/LoginPage.jsx';
import HomeButton from './components/HomeButton.jsx';
import Home from './containers/Home.jsx';
import CreateTeam from './containers/CreateTeam.jsx';
import TeamInfo from './containers/TeamInfo.jsx';
import ActivityInfo from './containers/ActivityInfo.jsx';


function App() {

  return (
    <div className='main-app flex-column flex-center'>
      <HomeButton />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/createTeam' element={<CreateTeam />} />
        <Route path='/teamInfo' element={<TeamInfo />} />
        <Route path='/activities' element={<ActivityInfo />} />
      </Routes>
    </div>
  )
}

/*
document.getElementById('test').innerText = 'yooo'
*/
export default App;

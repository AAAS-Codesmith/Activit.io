import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

import LoginPage from './containers/LoginPage.jsx';
import HomeButton from './components/HomeButton.jsx';
import Home from './containers/Home.jsx';
import CreateTeam from './containers/CreateTeam.jsx';
import TeamInfo from './containers/TeamInfo.jsx';
import ActivityInfo from './containers/ActivityInfo.jsx';


function App() {

  const handleClick = () => {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        const fetchTestDiv = document.createElement('div');
        fetchTestDiv.innerText = data;
        document.getElementById('root').appendChild(fetchTestDiv);
      })
    console.log('Pressed!');
  }

  return (
    <div className='main-app flex-column flex-center'>
      <HomeButton />
      <Routes>
        {/* <Route path='/' element={<LoginPage />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/createTeam' element={<CreateTeam />} />
        <Route path='/teamInfo' element={<TeamInfo />} />
        <Route path='/activities' element={<ActivityInfo />} />
      </Routes>
      <a>
        <button className='button' onClick={handleClick}>Fetch test button!</button>
      </a>
    </div>
  )
}

/*
document.getElementById('test').innerText = 'yooo'
*/
export default App;

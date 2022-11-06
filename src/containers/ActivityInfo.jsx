import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ActivityInfo = () => {
  const navigate = useNavigate();
  // Alex:Backend - What I expect to get more or less to populate state/page
  // Alex:Alex - State starts empty, populated based on drilled in data
  // from what we clicked on on the TotalActivityDisplay component
  const dummyDBData = {
    team_id: 'AAAS',
    team_members: ['Ahsunn', 'Aleks', 'Azaa', 'Steeb'],
    team_activity: 'Creating a scratch project',
    // Add more data from API/DB if time allows later
  }

  const deleteActivity = () => {
    // Alex:Backend + Self - Add  DELETE functionality
    console.log('Deleting activity and returning home');
    navigate('/home');

  }

  const friendsArr = dummyDBData.team_members.map(name => <li key={'temp' + name}>{name}</li>);
  return (
    <div className='flex-column flex-center activity-info container-card'>
      <h1>Name of Activity depending on info passed down</h1>
      <div className='flex-column'>
        <h2>Activity: {dummyDBData.team_activity}</h2>
        <h2>Team: {dummyDBData.team_id}</h2>
        <h2>People i'm going with</h2>
        {friendsArr}
        <Link to='/home'>
          <button
            className='button'
            onClick={() => {
              console.log('Going from Activity to Home')
              navigate('/home')
            }}>
            Go Back
          </button>
        </Link>
        <button
          className='button align-self-end'
          onClick={deleteActivity} >
          Delete Activity
        </button>
      </div>
    </div>
  )
}

export default ActivityInfo;
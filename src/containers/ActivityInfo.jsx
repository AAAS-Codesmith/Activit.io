import React from 'react';

const ActivityInfo = () => {

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
    console.log('Deleting activity');
  }

  const friendsArr = dummyDBData.team_members.map(name => <li key={'temp' + name}>{name}</li>);
  return (
    <div className='flex-column flex-center activity-info'>
      <h1>Name of Activity depending on info passed down</h1>
      <div>
        <h2>Activity: {dummyDBData.team_activity}</h2>
        <h2>Team: {dummyDBData.team_id}</h2>
        <h2>People i'm going with</h2>
        {friendsArr}
        <button className='button' onClick={deleteActivity}>Delete Activity</button>
      </div>
    </div>
  )
}

export default ActivityInfo;
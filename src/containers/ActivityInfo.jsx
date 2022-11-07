import React, { useContext } from 'react';
import { TeamsContext } from '../App.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ActivityInfo = (props) => {
  // useNavigate hook to help redirect pages
  const navigate = useNavigate();
  // useLocation hook to help keep state/props from Link before
  const location = useLocation();
  const totalTeamsArr = useContext(TeamsContext);

  // Initial state set to current activities props with associated team information
  const [currActivity, setCurrActivity] = React.useState(location.state);
  console.log('currActivity props', currActivity);


  const deleteActivity = () => {
    // Alex:Backend DELETE functionality
    console.log('Deleting activity and returning home');
    // Find current team in our context data to remove activity
    const teamsContextClone = [...totalTeamsArr];
    for (const team of teamsContextClone) {
      if (team.teamName === currActivity.teamName) {
        const activityIdx = team.teamActivities.indexOf(currActivity.activity);
        team.teamActivities.splice(activityIdx, 1);
        break;
      }
    }
    alert('Deleted activity!');
    props.sync(teamsContextClone);
    navigate('/home');
  }

  // Mapping team members
  const friendsArr = currActivity.teamMembers.map(name => <li key={name}>{name}</li>);

  return (
    <div className='flex-column flex-center activity-info container-card'>
      <h1>{currActivity.activity}</h1>
      <div className='flex-column'>
        <h2>Team: {currActivity.teamName}</h2>
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
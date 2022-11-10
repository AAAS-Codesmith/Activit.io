import React, { useEffect, useState, useContext } from 'react';
import { TeamsContext } from '../App.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

function TeamInfo(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const totalTeamsArr = useContext(TeamsContext);

  // SELECT TEAM
  const currTeam = totalTeamsArr.filter(obj => obj.teamName === location.state.teamName)
  // Initialize state to currTeams data (Obj)
  // *currTeam is a single object inside of an array which is why the spread

  // SET LIST OPTIONS STATE
  const [endOfList, setListEnd] = useState(false);
  // SET TEAM STATE
  const [teamInfo, setUpdateTeam] = React.useState(...currTeam);
  
  // Alex:Backend - Fetch activity from API and parse into following
  // GET ACTIVITY
  const getActivity = async (counter = 0) => {
    // Get random activity based on team size
    const testActivity = await fetch(`api/activity/people/${teamInfo.teamMembers.length}`)
      .then(res => res.json())
      .then(activityData => {
        // if the teamActivities array is empty, add the first activity
        if (teamInfo.teamActivities[0] === undefined) updateTeamData(activityData);
        else {
          // if the fetched activity is already on your list, 
          // make another request to the bored api to retrieve a new activity
          for (const obj of teamInfo.teamActivities) {
            if (obj.activity === activityData.activity) {
              if (counter < 10) {
                return getActivity(counter + 1);
              }
              // after 4 failed attempts to get new activity, stop trying
              else return setListEnd(true);
              //return announceEndOfActivities();
            }
          }
          return updateTeamData(activityData);
        }
      })
      .catch(err => console.error('Error in fetching activity from api: ', err));
    }
    
  const updateTeamData = (activityData) => {
    // Create clones to manipulate and update state with
    let currTeamClone;
    const totalTeamsClone = [...totalTeamsArr];
    for (const team of totalTeamsClone) {
      if (team.teamName === location.state.teamName) {
        // Make a POST request to add activity into current group
        fetch('db/addActivity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "team_id": teamInfo.team_id,
            "activity": {
              activity: activityData.activity,
              type: activityData.type,
              price: activityData.price,
              participants: activityData.participants
            }
          })
        })
          .catch(err => console.log('Err from POST activity:', err))
        // Concurrently update state below
        team.teamActivities.push(activityData);
        currTeamClone = team;
      }
    }
    props.sync(totalTeamsClone)
    setUpdateTeam({ ...currTeamClone })
  }

  const announceEndOfActivities = () => {
    console.log('END OF ACTIVITIES!');

  }

  const deleteTeam = () => {
    console.log('Deleting team:', teamInfo.teamName);
    const deletionClone = [...totalTeamsArr];
    for (let i = 0; i < deletionClone.length; i++) {
      if (deletionClone[i].teamName === teamInfo.teamName) {
        deletionClone.splice(i, 1);
      }
    }
    alert('Team has been deleted!');
    props.sync(deletionClone);
    navigate('/home')
  }

  // Populate team members + activities
  const teamMembers = teamInfo.teamMembers.map(ele =>
    <li key={ele}>{ele}</li>
  )
  const activities = teamInfo.teamActivities.map(activity =>
    <li key={activity.activity}>{activity.activity}</li>
  )
  // const price = map over teamInfo.price then render
  return (
    <div className='team-info container-card flex-column flex-center'>
      <h1>{teamInfo.teamName}</h1>
      <h2>Team Members</h2>
      {teamMembers}
      <h2>Activities</h2>
      <div className='list'>
        {activities}
      </div>
      <div>
      <button
        className='button'
        onClick={() => deleteTeam()}>
        Delete Team
      </button>
      <>
      {endOfList
        ? <span>No More Activities</span>
        : <button
        className='button align-self-end'
        onClick={() => {
          console.log('Updating activities')
          getActivity();
        }}>
        Add Activity
      </button>
      }
      </>
      </div>
    </div>
  )
}

export default TeamInfo;
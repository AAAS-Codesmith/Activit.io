import React, { useEffect, useState, useContext } from 'react';
import { TeamsContext } from '../App.jsx';
import { useNavigate, useLocation } from 'react-router-dom';


function TeamInfo(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const totalTeamsArr = useContext(TeamsContext);

  const currTeam = totalTeamsArr.filter(obj => obj.teamName === location.state.teamName)
  console.log('totalTeamsArr', totalTeamsArr);
  console.log('currTeam', currTeam);

  // Initialize state to currTeams data (Obj)
  // *currTeam is a single object inside of an array which is why the spread
  const [teamInfo, setUpdateTeam] = React.useState(...currTeam);
  console.log('Current team info state:', teamInfo);

  // Split the team members string by commas
  console.log('teamInfo.teamMembers: ', teamInfo.teamMembers);
  // const teamMembersArr = (teamInfo.teamMembers[0]).split(',');
  
  // Alex:Backend - Fetch activity from API and parse into following
  const getActivity = async () => {
    // Get random activity based on team size
    const testActivity = await fetch(`api/activity/people/${teamInfo.teamMembers.length}`)
      .then(res => res.json())
      .then(activityData => {
        //Activity data: Object with associated deets
        console.log('Current fetched activity:', activityData)
        
        // Create clones to manipulate and update state with
        let currTeamClone;
        const totalTeamsClone = [...totalTeamsArr];
        for (const team of totalTeamsClone) {
          if (team.teamName === location.state.teamName) {
            // Make a POST request to add activity into current group
            console.log('starting fetch request to add activity')
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
              .then(res => res.json)
              .then(data => console.log('post data', data))
              .catch(err => console.log('Err from POST activity:', err))

            
            // Concurrently update state below
            team.teamActivities.push(activityData);
            // push into another KV pair => team.activityPrice.push(activityData.price)
            currTeamClone = team;
          }
        }
        props.sync(totalTeamsClone)
        setUpdateTeam({ ...currTeamClone })
      })
      .catch(err => console.error('Error in fetching activity from api: ', err));
      
    //   Data coming back looks like this
    //   {
    //     "activity": "Take your dog on a walk",
    //     "type": "relaxation",
    //     "participants": 1,
    //     "price": 0,
    //     "link": "",
    //     "key": "9318514",
    //     "accessibility": 0.2
    // }

    // Hardcoded Test data to generate random activity (replace with API fetch)
    // const arrActivities = ['Run', 'Walk', 'Movies', 'Party', 'Cry', 'APC'];
    // let testActivity = arrActivities[Math.floor(Math.random() * arrActivities.length)];

    // clone to keep track of current team to update current team info state with
    // let currTeamClone;
    // // clone of total teams state to update App.jsx with
    // const totalTeamsClone = [...totalTeamsArr];
    // // Iterating to find our currentTeam to mutate
    // for (const team of totalTeamsClone) {
    //   if (team.teamName === location.state.teamName) {
    //     // Ensures we don't double the same activity in the same team
    //     // while (team.teamActivities.includes(testActivity)) {
    //     //   testActivity = arrActivities[Math.floor(Math.random() * arrActivities.length)];
    //     // }
    //     // Add to our totalTeams specific team activities
    //     team.teamActivities.push(testActivity);
    //     // Assign this team's info to our currTeamClone
    //     currTeamClone = team;
    //   }
    // }

    // // useState helper updates our App.jsx total state for this user
    // props.sync(totalTeamsClone)
    // setUpdateTeam({ ...currTeamClone })
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
      <button
        className='button align-self-end'
        onClick={() => {
          console.log('Updating activities')
          getActivity();
        }}>
        Add Activity
      </button>
      </div>
    </div>
  )
}

export default TeamInfo;
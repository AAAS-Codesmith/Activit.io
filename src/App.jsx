import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, createContext } from "react";

import LoginPage from "./containers/LoginPage.jsx";
import HomeButton from "./components/HomeButton.jsx";
import Home from "./containers/Home.jsx";
import CreateTeam from "./containers/CreateTeam.jsx";
import TeamInfo from "./containers/TeamInfo.jsx";
import ActivityInfo from "./containers/ActivityInfo.jsx";

export const TeamsContext = React.createContext({});

function App() {
  const location = useLocation();
  console.log("location state - username:", location.state);
  // Initialize state to be array of teams w/associated activities
  const [userData, setUserData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(location.state); //username of the user

  // Goal: Pass setUserData to be invoked with fetched data anytime new data is created
  function syncStatetoDB(data) {
    // console.log("Updating state with DB change");
    setUserData(data);
  }

  function syncUser(username) {
    // console.log("Succesful login, setting current user:", username);
    setCurrentUser(username);
  }

  useEffect(() => {
    const asyncFn = async () => {
      const fetchedUserTeams = await fetch(`/db/user/${currentUser}`);
      const data = await fetchedUserTeams.json();

      const fetchedTeams = [];
      for (let team_id of Object.keys(data[0].teams)) {
        const teamInfo = await fetch(`/db/teaminfo/${team_id}`);
        const teamData = await teamInfo.json();
        fetchedTeams.push(teamData);
      }

      const arrOfFetchedTeams = fetchedTeams.map((arrObj) => arrObj[0]);
      setUserData(arrOfFetchedTeams);
    };
    asyncFn();
  }, [currentUser]);

  return (
    <TeamsContext.Provider value={userData}>
      <div className="main-app flex-column flex-center">
        <HomeButton />
        <Routes>
          <Route path="/" element={<LoginPage setUser={syncUser} />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/createTeam"
            element={<CreateTeam sync={syncStatetoDB} username={currentUser} />}
          />
          <Route path="/teamInfo" element={<TeamInfo sync={syncStatetoDB} />} />
          <Route
            path="/activities"
            element={<ActivityInfo sync={syncStatetoDB} />}
          />
        </Routes>
      </div>
    </TeamsContext.Provider>
  );
}

export default App;

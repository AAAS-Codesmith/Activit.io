import { Routes, Route, useLocation, Link } from "react-router-dom";
import React, { useEffect, createContext, useContext, useState } from "react";

import LoginPage from "./containers/LoginPage.jsx";
import HomeButton from "./components/HomeButton.jsx";
import UserProfile from "./containers/UserProfile.jsx";
import UserProfileButton from "./components/UserProfileButton.jsx";
import Home from "./containers/Home.jsx";
import CreateTeam from "./containers/CreateTeam.jsx";
import TeamInfo from "./containers/TeamInfo.jsx";
import ActivityInfo from "./containers/ActivityInfo.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

export const TeamsContext = React.createContext({});
// export const UserProfileContext = React.createContext({});

function App() {
  const location = useLocation();
  console.log("location state - username:", location);
  // Initialize state to be array of teams w/associated activities
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState(location.state); //username of the user

  // Goal: Pass setUserData to be invoked with fetched data anytime new data is created
  function syncStatetoDB(data) {
    // console.log("Updating state with DB change");
    setUserData(data);
  }
console.log(userData, 'userData inside App component')
  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const fetchedUserTeams = await fetch(`/db/user/${currentUser}`);
  //     const data = await fetchedUserTeams.json();

  //     const fetchedTeams = [];
  //     for (let team_id of Object.keys(data[0].teams)) {
  //       const teamInfo = await fetch(`/db/teaminfo/${team_id}`);
  //       const teamData = await teamInfo.json();
  //       fetchedTeams.push(teamData);
  //     }

  //     const arrOfFetchedTeams = fetchedTeams.map((arrObj) => arrObj[0]);
  //     setUserData(arrOfFetchedTeams);
  //   };
  //   asyncFn();
  // }, [currentUser]);

  return (
    <TeamsContext.Provider value={userData}>
      <div>
        <NavBar />
      </div>
      <div className="main-app flex-column flex-center">
        {/* <HomeButton />
        <UserProfileButton /> */}
        <Routes>
          <Route path="/" element={<LoginPage setUserData={setUserData}/>} />
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
            <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </TeamsContext.Provider>
  );
}

export default App;

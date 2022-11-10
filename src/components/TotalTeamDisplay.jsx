import React, { useContext, useEffect } from "react";
import TeamCard from "./TeamCard.jsx";
import { TeamsContext } from "../App.jsx";
import { Link } from "react-router-dom";

function TotalTeamDisplay() {
  // TotalTeams State Arr from App.jsx
  const teamsContextData = useContext(TeamsContext);
  console.log("Context data", teamsContextData);

  // Set initial state
  const [totalTeams, setUpdateTeams] = React.useState(teamsContextData);

  // Goals: Update after we render current users info
  useEffect(() => setUpdateTeams(teamsContextData), [teamsContextData]);

  // Parse through to create team card displays
  const teamCardDisplay = totalTeams.teams.map((team) => {
    return (
      <div>
        {team ? (
          <TeamCard
            key={team.team_id}
            teamName={team.teamName}
            teamMembers={team.teamMembers}
            teamActivities={team.teamActivities}
          />
        ) : null}
      </div>
    );
  });

  return (
    // previous className: "total-team-display flex-column flex-center container-card"
    <div className="total-team-display">
      <h1>Your Teams</h1>
      <div className="teams-scroll-container">
        <div className="teams-scroll">
          {teamCardDisplay.length ? teamCardDisplay : <h2>Make a squad!</h2>}
        </div>
        <Link to="/createTeam">
          <button className="button-create-team">Create New Team</button>
        </Link>
      </div>
    </div>
  );
}

export default TotalTeamDisplay;

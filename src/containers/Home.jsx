import React from "react";
import TotalTeamDisplay from "../components/TotalTeamDisplay.jsx";
import TotalActivityDisplay from "../components/TotalActivityDisplay.jsx";

function Home() {
  return (
    <div className="flex-column flex-center home ">
      <h1>Create Your Team!</h1>
      <TotalTeamDisplay />
      <h1>Generate A Random Activity!</h1>
      <TotalActivityDisplay />
    </div>
  );
}

export default Home;

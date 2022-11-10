import React from "react";
import TotalTeamDisplay from "../components/TotalTeamDisplay.jsx";
import TotalActivityDisplay from "../components/TotalActivityDisplay.jsx";

function Home() {
  return (
    <div className="flex-column flex-center home ">
      <h1>Welcome to Activ-8</h1>
      <TotalTeamDisplay />
      <hr></hr>
      <h1>Generate A Random Activity!</h1>
      <TotalActivityDisplay />
    </div>
  );
}

export default Home;

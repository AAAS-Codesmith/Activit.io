import React, { useContext, useEffect } from "react";
import TeamCard from "./TeamCard.jsx";
import { TeamsContext } from "../App.jsx";
import { Link } from "react-router-dom";

const UserInfo = () => {
  return (
    <div>
      <h2 className="user-profile">Welcome to profile!</h2>
    </div>
  );
};

export default UserInfo;

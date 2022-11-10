import React, { useContext, useEffect, useState } from "react";
import UserProfileCard from "../components/UserProfileCard.jsx";
import { TeamsContext } from "../App.jsx";
import { Link } from "react-router-dom";

const UserInfo = () => {
  return (
    <div>
      <h2 className="user-profile">Welcome to Profile</h2>
      <UserProfileCard />
    </div>
  );
};

export default UserInfo;

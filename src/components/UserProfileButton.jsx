import React from "react";
import { Link, useLocation } from "react-router-dom";

function UserInfoButton() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  else
    return (
      <div className="user-button">
        <Link to="/userprofile" className="user-button-link">
          <button
            className="user-button"
            onClick={() => {
              console.log("Clicking user-button button");
            }}
          >
            Profile
          </button>
        </Link>
      </div>
    );
}

export default UserInfoButton;

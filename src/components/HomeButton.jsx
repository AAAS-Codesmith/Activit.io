import React from "react";
import { Link, useLocation } from "react-router-dom";

function HomeButton() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  else
    return (
      <div className="home-button">
        <Link to="/home" className="home-button-link">
          <button
            className="home-button"
            onClick={() => {
              console.log("Clicking home button");
            }}
          >
            Home
          </button>
        </Link>
      </div>
    );
}

export default HomeButton;

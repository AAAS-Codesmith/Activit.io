import React from "react";
import { Link } from "react-router-dom";

const RegisterButtons = ({ swapLogin, registerAccount }) => {
  return (
    <div>
      <Link to="/">
        <button className={"button"} onClick={swapLogin}>
          Cancel
        </button>
      </Link>

      <button className={"button"} onClick={registerAccount}>
        Sign Up
      </button>
    </div>
  );
};

export default RegisterButtons;

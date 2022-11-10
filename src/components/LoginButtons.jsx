import React from "react";

const LoginButtons = ({ swapRegister, loginUser }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <button className="button" onClick={swapRegister}>
        Register
      </button>

      <button className="button" onClick={loginUser}>
        Login
      </button>
    </div>
  );
};

export default LoginButtons;

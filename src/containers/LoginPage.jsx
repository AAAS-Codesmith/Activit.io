import React from "react";
import LoginButtons from "../components/LoginButtons.jsx";
import RegisterButtons from "../components/RegisterButtons.jsx";
import LogIn from "../components/LogIn.jsx";
import Register from "../components/Register.jsx";
import axios, { AxiosHeaders } from "axios";

const LoginPage = (props) => {
  // Boolean flag for conditional rendering
  const [accountCreation, setAccountCreation] = React.useState(false);
  // Access current user/pw state here. Updates w/useState so dont need to query
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login_success, setLoginSuccess] = React.useState(false);

  ////////////////////////////////
  ////// Handler Functions //////
  ////////////////////////////////
  // Swap Register/Login flag for conditional rendering
  function registerPage() {
    clearFields();
    setAccountCreation(!accountCreation);
  }

  // Registration Body
  function registerAccount() {
    console.log(
      "Registering Account!\n" + "Username:",
      username,
      "\nPassword:",
      password
    );
    clearFields();
    // Alex:Backend Submit POST request with <username> and <password>

    // Ahsan: Backend Work
    // Send POST request to backend with username and password
    // Backend will check if username is valid and, if so, will add to database
    // If valid, will return true, else false
    const serverResponse = axios
      .post("/db/register", {
        username,
        password,
      })
      .then((response) => {
        return response.register_response;
      });

    console.log("Server Response: ", serverResponse);
    return serverResponse;
  }
  // Clear User/PW fields
  function clearFields() {
    document.querySelector("#username").value = "";
    document.querySelector("#password").value = "";
  }

  // Conditional Rendering on Login/Register
  const greeting = !accountCreation ? <LogIn /> : <Register />;

  const landingButtons = !accountCreation ? (
    <LoginButtons
      swapRegister={registerPage}
      username={username}
      password={password}
      setUser={props.setUser}
    />
  ) : (
    <RegisterButtons
      swapLogin={registerPage}
      registerAccount={registerAccount}
      accountCreation={accountCreation}
      setAccountCreation={setAccountCreation}
    />
  );
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="login-page-container flex-column"
      style={{ alignItems: "center" }}
    >
      <div className="login-page flex-column flex-center container-card">
        <h1 className="welcome-to-activ8">Welcome to Activ-8</h1>
        {greeting}
        <form className="form" onSubmit={handleSubmit}>
          <p>
            Username:
            <input
              id="username"
              type="text"
              className="form-input-box"
              onChange={() =>
                setUsername(document.querySelector("#username").value)
              }
            ></input>
          </p>
          <p>
            Password:
            <input
              id="password"
              type="password"
              className="form-input-box"
              onChange={() =>
                setPassword(document.querySelector("#password").value)
              }
            ></input>
          </p>
          {landingButtons}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

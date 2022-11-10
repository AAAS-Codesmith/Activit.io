import React, { useState } from "react";
import LoginButtons from "../components/LoginButtons.jsx";
import RegisterButtons from "../components/RegisterButtons.jsx";
import GoogleAuth from "../components/GoogleAuth.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = ({setUserData}) => {
  const navigate = useNavigate();
  const [accountCreation, setAccountCreation] = useState(false);
  // const [resgister, setRegister] = useState(false);
  const [userObj, setUserObj] = useState({
    email: "",
    username: "",
    password: "",
  });

  ////////////////////////////////
  ////// Handler Functions //////
  ////////////////////////////////
  // Clear User/PW fields
  function clearFields() {
    setUserObj({
      email: "",
      username: "",
      password: "",
    });
  }

  // Swap Register/Login flag for conditional rendering
  function swapForms() {
    clearFields();
    setAccountCreation(!accountCreation);
  }

  // Registration Body
  async function registerAccount() {
    clearFields();
    await fetch("/db/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userObj }),
    })
      .then((response) => {
        console.log(response, "response");
        if (response.ok && response.status === 200) return response.json();
        throw new Error("Email already exits or some other thing went wrong."); //Fetch promises only reject with a TypeError when a network error occurs. Since 4xx and 5xx responses aren't network errors, there's nothing to catch. Hence, the need to throw an error ourself here to use.
      })
      .then((response) => {
        console.log(response, "response");
        setUserData(response.user_info)
        return navigate("/home");
      })
      .catch((error) => console.log(error));
  }

  async function loginUser() {
    clearFields();
    console.log(userObj, "userObj");
    await fetch("/db/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        if (response.ok && response.status === 200) return response.json();
        throw new Error(
          "Email and password don't match or Some other thing went wrong."
        );
      })
      .then((response) => {
        console.log(response, "login response");
        setUserData({...response.user_info, teams: [ {team_id: "xxxxxxxxx",teamName: "Activ-8", teamMembers: ['rest', 'graph', 'somemore'], activities: [ {
          activity: "Take your dog on a walk",
          type: "relaxation",
          price: 0,
          participants: 1,
        }]}] })
        return navigate("/home");
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('name', name);
    console.log('value', value);
    setUserObj({ ...userObj, [name]: value });
  };

  return (
    <div
      className="login-page-container flex-column"
      style={{ alignItems: "center" }}
    >
      <div className="login-page flex-column flex-center container-card">
        <h1>Welcome to Activ-8</h1>
        {/* Conditional Rendering on Login/Register */}
        {!accountCreation ? <h2>Please log in</h2> : <h2>Please sign up</h2>}
        <form className="form" onSubmit={handleSubmit}>
          <p>
            <label>
              Email:
              <input
                id="email"
                type="email"
                className="form-input-box"
                name="email"
                value={userObj.email}
                onChange={(e) => handleInputChange(e)}
              ></input>
            </label>
          </p>
          {/* render username field only on registration form but not on login form */}
          {accountCreation ? (
            <p>
              <label>
                Username:
                <input
                  id="username"
                  type="text"
                  className="form-input-box"
                  name="username"
                  value={userObj.username}
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </label>
            </p>
          ) : null}

          <p>
            <label>
              Password:
              <input
                id="password"
                type="password"
                className="form-input-box"
                name="password"
                value={userObj.password}
                onChange={(e) => handleInputChange(e)}
              ></input>
            </label>
          </p>
          {/* conditional rendering of auth buttons */}
          {!accountCreation ? (
            <LoginButtons swapRegister={swapForms} loginUser={loginUser} />
          ) : (
            <RegisterButtons
              swapLogin={swapForms}
              registerAccount={registerAccount}
            />
          )}
          {/* Google Auth Signup/Signin */}
          <GoogleAuth />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

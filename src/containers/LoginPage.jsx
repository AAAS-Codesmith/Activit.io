import React from 'react';
import LoginButtons from '../components/LoginButtons.jsx';
import RegisterButtons from '../components/RegisterButtons.jsx';
import LogIn from '../components/LogIn.jsx';
import Register from '../components/Register.jsx';

const LoginPage = () => {
  // Boolean flag for conditional rendering
  const [accountCreation, setAccountCreation] = React.useState(false);
  // Access current user/pw state here. Updates w/useState so dont need to query
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  ////////////////////////////////
  ////// Handler Functions //////
  ////////////////////////////////
  // Swap Register/Login flag for conditional rendering
  function registerPage() {
    clearFields();
    setAccountCreation(!accountCreation);
  }
  // Login Attempts
  function loginAccount() {
    console.log('Login attempted!\n' + 'Username:', username, '\nPassword:', password);
    clearFields();
    // Alex: Backend
    // Check auth for login using <username> and <password>
    // Return boolean for conditional redirect in LoginButtons
    // true = login succesful, false = alert!
    // Details in LoginButtons.jsx
    return true;
  }
  // Registration Body
  function registerAccount() {
    console.log('Registering Account!\n' + 'Username:', username, '\nPassword:', password);
    clearFields();
    // Alex:Backend Submit POST request with <username> and <password>


  }
  // Clear User/PW fields
  function clearFields() {
    document.querySelector('#username').value = '';
    document.querySelector('#password').value = '';
  }

  // Conditional Rendering on Login/Register
  const greeting = !accountCreation
    ? <LogIn />
    : <Register />

  const landingButtons = !accountCreation
    ? <LoginButtons
      swapRegister={registerPage}
      loginAccount={loginAccount} />
    : <RegisterButtons
      swapLogin={registerPage}
      registerAccount={registerAccount} />


  return (
    <div>
      <h1>Wonderpuss Says Hello!</h1>
      {greeting}
      <form>
        <p>
          Username:
          <input
            id='username'
            type='text'
            onChange={() => setUsername(document.querySelector('#username').value)}
          >
          </input>
        </p>
        <p>
          Password:
          <input
            id='password'
            type='password'
            onChange={() => setPassword(document.querySelector('#password').value)}
          >
          </input>
        </p>
        {landingButtons}
      </form>
    </div>
  )
}

export default LoginPage;
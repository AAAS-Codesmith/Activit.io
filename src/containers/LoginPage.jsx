import React from 'react';
import LoginButtons from '../components/LoginButtons.jsx';
import RegisterButtons from '../components/RegisterButtons.jsx';
import LogIn from '../components/LogIn.jsx';
import Register from '../components/Register.jsx';

const LoginPage = () => {
  const [accountCreation, setAccountCreation] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  ////////////////////////////////
  ////// Handler Functions //////
  ////////////////////////////////
  // Swap Register/Login flag
  function registerPage() {    
    setAccountCreation(!accountCreation);
  }
  // Login
  function loginAccount() {
    console.log('Login attempted!\n' + 'Username:', username, '\nPassword:', password);
    // Check auth for login using <username> and <password>
    // Return boolean for conditional redirect in LoginButtons
    // true = login succesful, false = alert!
    // Details in LoginButtons.jsx
    return true;
  }
  // Registration Body
  function registerAccount() {
    console.log('Registering Account!\n' + 'Username:', username, '\nPassword:', password);
    // Clears fields after registerring
    // Submit POST request with <username> and <password>

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
      <h1>Welcome!</h1>
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
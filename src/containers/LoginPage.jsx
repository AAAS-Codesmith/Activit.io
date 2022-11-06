import React from 'react';
import LoginButtons from '../components/LoginButtons.jsx';
import RegisterButtons from '../components/RegisterButtons.jsx';
import AccountInformation from '../components/AccountInformation.jsx';


const LoginPage = () => {
  const [accountCreation, setAccountCreation] = React.useState(false);

  function registerPage() {
    console.log('Switching Login/Registration');
    setAccountCreation(!accountCreation);
  }

  let landingButtons;
  if (accountCreation === false) landingButtons = <LoginButtons handleClick={registerPage}/>
  else landingButtons = <RegisterButtons handleClick={registerPage}/>
  return (
    <div>
      <AccountInformation />
      {landingButtons}
    </div>
  )
}

export default LoginPage;
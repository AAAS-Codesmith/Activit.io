import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterButtons = (props) => {
  return (
    <div>
      <Link to='/'>
        <button className={"button"} onClick={props.swapLogin}>
          Cancel
        </button>
      </Link>
      <Link>
        <button className={"button"} onClick={() => {
          if (props.registerAccount()) {
            alert('Account created! Please log in!');
            props.setAccountCreation(!props.accountCreation);
          } else {
            alert('Bad registration!');
          }
        }}>
          Sign Up
        </button>
      </Link>
    </div>
  )
}

export default RegisterButtons;
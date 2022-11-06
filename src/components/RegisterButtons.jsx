import React from 'react';
import { Link } from 'react-router-dom';

const RegisterButtons = (props) => {
  return (
    <div>
      <Link to='/'>
        <button onClick={props.swapLogin}>
          Cancel
        </button>
      </Link>
      <Link>
        <button onClick={props.registerAccount}>Sign Up</button>
      </Link>
    </div>
  )
}

export default RegisterButtons;
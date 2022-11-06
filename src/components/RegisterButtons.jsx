import React from 'react';
import { Link } from 'react-router-dom';

const RegisterButtons = (props) => {
  return (
    <div>
      <Link to='/'>
        <button onClick={props.handleClick}>Cancel</button>
      </Link>
      <Link>
        <button>Sign Up</button>
      </Link>
    </div>
  )
}

export default RegisterButtons;
import React from 'react';
import { Link } from 'react-router-dom';

const LoginButtons = (props) => {
  return (
    <div>
      <Link>
        <button onClick={props.handleClick}>Register</button>
      </Link>
      <Link to='/home'>
        <button>Login</button>
      </Link>
    </div>
  )
}

export default LoginButtons;
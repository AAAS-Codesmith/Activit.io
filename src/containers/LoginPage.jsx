import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <Link >
        <button>Register</button>
      </Link>
      <Link to='/home'>
        <button>Login</button>
      </Link>
    </div>
  )
}

export default LoginPage;
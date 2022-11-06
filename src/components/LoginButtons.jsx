import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginButtons = (props) => {
  // Navigate hook for login conditional
  const navigate = useNavigate();
  return (
    <div>
      <Link>
        <button onClick={props.swapRegister}>
          Register
        </button>
      </Link>

      <button onClick={() => {
        // Conditional login or wrong
        return props.loginAccount()
          ? navigate('/home')
          : alert('Wrong login information!');
      }}>
        Login
      </button>

    </div>
  )
}

export default LoginButtons;
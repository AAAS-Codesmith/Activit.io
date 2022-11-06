import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginButtons = (props) => {
  // Navigate hook for login conditional
  const navigate = useNavigate();

  const handleClick = () => {
    
    // console.log('boolResp from handleClick ', boolResp);
    // if(boolResp === true) navigate('/home')
    // else {
    //   console.log('else block in handleClick');
    //   alert('Login failed')
    // }

    fetch('/db/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: props.username, password: props.password})
      })
      .then(res => res.json())
      .then(data => {
        console.log('Login response: ', data.login_success);
        if(data.login_success === true) return navigate('/home');
      })
      .catch(err => {
        console.error('Error: ', err);
        return alert('Login failed');
      });

  }
  
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Link>
        <button className='button' onClick={props.swapRegister}>
          Register
        </button>
      </Link>


      <button className='button' onClick={() => {
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
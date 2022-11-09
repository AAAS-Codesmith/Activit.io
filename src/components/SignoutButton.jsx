import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie";

function SignoutButton() {
  const location = useLocation();
  if (location.pathname === '/') return null;
  function handleRemoveCookie() {
    removeCookie('token', { path: '/' });
  }
  return (
    <div className='signout-button'>
      <Link to='/' className='signout-button-link'>
        <button className='signout-button button'
          onClick={() => {
            console.log(`Cookie: ${JSON.stringify(cookies.token)}`)
            handleRemoveCookie();
          }}>
          Sign Out
        </button>
      </Link>
    </div>
  )
}

export default SignoutButton;

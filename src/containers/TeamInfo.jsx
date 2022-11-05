import React from 'react'
import { Link } from 'react-router-dom';

function TeamInfo() {
  return (
    <div>
      <h1>Team Info</h1>

      <Link to='/createTeam'>
        <button>
          Create Team
        </button>
      </Link>
    </div>
  )
}

export default TeamInfo;
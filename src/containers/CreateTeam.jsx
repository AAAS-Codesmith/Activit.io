import React from 'react';
import { Link } from 'react-router-dom';

function CreateTeam() {
  return (
    <div>
      <h1>Create Team</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log('Team Creation Submitted!')
      }}>
        <span>Team name:</span>
        <input type='text'></input>
        <br></br>
        <span>Member 1</span>
        <input type='text'></input>
        <br></br>
        <span>Member 2</span>
        <input type='text'></input>
        <br></br>
        <span>Member 3</span>
        <input type='text'></input>
        <br></br>
        <span>Member 4</span>
        <input type='text'></input>
        <br></br>
        <Link to='/teamInfo'><button>Cancel</button></Link>
        <input type='submit' value='Create'></input>
      </form>
    </div>
  )
}

export default CreateTeam;

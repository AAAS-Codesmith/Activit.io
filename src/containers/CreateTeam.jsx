import React from 'react';
import { Link } from 'react-router-dom';


const createTeam = () => {
  // Alex:Ahsan - Double check what info you need to put into DB
  console.log('Team ID + Members deposited into DB')
}

function CreateTeam() {
  return (
    <div className='create-team flex-column flex-center container-card'>
      <h1>Create Team</h1>
      <form className='form' onSubmit={(e) => {
        e.preventDefault();
        console.log('Team Creation Submitted!')
        createTeam();
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
        <Link to='/'><button>Cancel</button></Link>
        <input type='submit' value='Create'></input>
      </form>
    </div>
  )
}

export default CreateTeam;

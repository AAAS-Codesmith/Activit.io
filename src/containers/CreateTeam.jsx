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
        <div>
          <label for='name'>Team name:</label>
          <input type='text'></input>
        </div>
        <div>
          <label for='member'>Member 1</label>
          <input type='text'></input>
        </div>
        <div>
          <label for='member'>Member 2</label>
          <input type='text'></input>
        </div>
        <div>
          <label for='member'>Member 3</label>
          <input type='text'></input>
        </div>
        <div>
          <label for='member'>Member 4</label>
          <input type='text'></input>
        </div>
        <Link to='/'><button>Cancel</button></Link>
        <input type='submit' value='Create'></input>
      </form>
    </div>
  )
}

export default CreateTeam;

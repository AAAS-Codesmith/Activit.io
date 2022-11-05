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
      <form className='form flex-column' onSubmit={(e) => {
        e.preventDefault();
        console.log('Team Creation Submitted!')
        createTeam();
      }}>
        <div>
          <label for='name'>Team name:</label>
          <input className="form-input-box" type='text'></input>
        </div>
        <div>
          <label for='member'>Member 1</label>
          <input className="form-input-box" type='text'></input>
        </div>
        <div>
          <label for='member'>Member 2</label>
          <input className="form-input-box" type='text'></input>
        </div>
        <div>
          <label for='member'>Member 3</label>
          <input className="form-input-box" type='text'></input>
        </div>
        <div>
          <label for='member'>Member 4</label>
          <input className="form-input-box" type='text'></input>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Link to='/'><button className='button'>Cancel</button></Link>
          <input className='button align-self-end' type='submit' value='Create'></input>
        </div>
      </form>
    </div>
  )
}

export default CreateTeam;

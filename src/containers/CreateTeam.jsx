import React from 'react';
import { Link } from 'react-router-dom';

function CreateTeam() {
  const [teamName, setTeamName] = React.useState('');
  const [memberOne, setMemberOne] = React.useState('');
  const [memberTwo, setMemberTwo] = React.useState('');
  const [memberThree, setMemberThree] = React.useState('');
  const [memberFour, setMemberFour] = React.useState('');

  const createTeam = (formData) => {
    // Alex:Ahsan - Double check what info you need to put into DB
    console.log('Team ID + Members deposited into DB')
    console.log(`
      Team Name: ${teamName}
      Member1: ${memberOne}
      Member2: ${memberTwo}
      Member3: ${memberThree}
      Member4: ${memberFour}
    `)
    // Todo: Parse into acceptable data syntax for DB
  }

  return (
    <div className='create-team flex-column flex-center container-card'>
      <h1>Create Team</h1>
      <form className='form flex-column' onSubmit={(e) => {
        e.preventDefault();
        console.log('Team Creation Submitted!')
        createTeam(e.target.value);
      }}>
        <div>
          <label for='name'>Team name:</label>
          <input
            required
            id='team-name'
            className="form-input-box"
            type='text'
            onChange={() => setTeamName(document.querySelector('#team-name').value)}
          >
          </input>
        </div>
        <div>
          <label for='member'>Member 1</label>
          <input
            required
            id='member1'
            className="form-input-box"
            type='text'
            onChange={() => setMemberOne(document.querySelector('#member1').value)}
          >

          </input>
        </div>
        <div>
          <label for='member'>Member 2</label>
          <input
            id='member2'
            className="form-input-box"
            type='text'
            onChange={() => setMemberTwo(document.querySelector('#member2').value)}
          >

          </input>
        </div>
        <div>
          <label for='member'>Member 3</label>
          <input
            id='member3'
            className="form-input-box"
            type='text'
            onChange={() => setMemberThree(document.querySelector('#member3').value)}
          >
          </input>
        </div>
        <div>
          <label for='member'>Member 4</label>
          <input
            id='member4'
            className="form-input-box"
            type='text'
            onChange={() => setMemberFour(document.querySelector('#member4').value)}
          >
          </input>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/home'><button className='button'>Cancel</button></Link>
          <input
            className='button align-self-end'
            type='submit'
            value='Create'
          >
          </input>
        </div>
      </form>
    </div>
  )
}

export default CreateTeam;

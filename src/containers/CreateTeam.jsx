import React from 'react';
import { Link } from 'react-router-dom';
import NewMemberEntry from '../components/NewMemberEntry.jsx';
import CreateMemberButtons from '../components/CreateMemberButtons.jsx';

function CreateTeam() {
  const [teamName, setTeamName] = React.useState('');
  const [memberOne, setMemberOne] = React.useState('');
  const [memberTwo, setMemberTwo] = React.useState('');
  const [memberThree, setMemberThree] = React.useState('');
  const [memberFour, setMemberFour] = React.useState('');

  // State to track how many teammates you have
  const [memberLength, setMemberLength] = React.useState(1);
  const [memberEntries, setMemberEntries] = React.useState([]);
  // Stretch: Add a remove member feature to remove last additional
  // Will only appear if more than 1 member
  // Will disappear if only 1 member available. Can't delete yourself.

  //////////////////////////////////
  //// Modifying Member Entries ////
  //////////////////////////////////
  // No HTTP request here. Just state changes for member input rendering purposes.
  const addMember = () => {
    console.log('adding Member');
    setMemberEntries([...memberEntries].concat(<NewMemberEntry memberNum={memberLength + 1} />));
  }

  const deleteMember = () => {
    const memberClone = [...memberEntries];
    console.log('deleting member:', memberClone.pop());
    setMemberEntries(memberClone);
  }

  const createTeam = (formData) => {
    // Alex:Ahsan - Double check what info you need to put into DB
    // Form needs to be modified to take in data from submit
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
        console.log(e)
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
        {/* Default current user entry. Immutable. */}
        <div id='members-container'>
          <label for='member'>Member 1</label>
          <input
            required
            readonly
            unselectable="on"
            id='member1'
            className="form-input-box"
            type='text'
            value='Readonly Static - Current User'
          >
          </input>
        </div>
        {/* Populated via state array */}
        {memberEntries}
        {/* Can be refactored for more efficient variables */}
        <CreateMemberButtons 
          memberLength={memberLength}
          memberEntries={memberEntries}
          setMemberLength={setMemberLength}
          addMember={addMember}
          deleteMember={deleteMember}
        />

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

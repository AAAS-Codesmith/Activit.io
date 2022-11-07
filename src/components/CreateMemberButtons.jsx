import React from 'react';


/*
Bugs
When you hit 'Add Team Member' - it triggers createTeam()
  This was temporarily negated by having new member entry fields be required
When you hit 'Delete Member' - it triggers createTeam()
  Can be replicated even if hitting delete when no new member fields are available
  ONLY triggers createTeam() if Team name 
*/

const CreateMemberButtons = (props) => {
  console.log('memberLength', props.memberLength)
  console.log('memberEntires', props.memberEntries)
  return (
    <div>
      <button onClick={() => {
        if (props.memberEntries.length) {
          props.setMemberLength(props.memberLength - 1);
          props.deleteMember();
        } else {
          alert('Don\'t delete yourself!');
        }
      }}>Delete Member</button>
      <button onClick={() => {
        if (props.memberLength === 4)
          alert(`
            Too many friends!
            Focus on the ones you have here!
          `)
        else {
          props.setMemberLength(props.memberLength + 1);
          props.addMember();
        }
      }}>Add Team Member</button>
    </div>
  )
}

export default CreateMemberButtons;
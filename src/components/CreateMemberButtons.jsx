import React from 'react';

const CreateMemberButtons = (props) => {
  return (
    <div>
      <button onClick={() => {
        if (props.memberEntries.length) {
          props.setMemberLength(props.memberLength - 1);
        } else {
          alert('Don\'t delete yourself!');
        }
        props.deleteMember();
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
import React from 'react';

const NewMemberEntry = (props) => {
  return (
    <div>
      <label for='member'>Member {props.memberNum}</label>
      <input
        required
        className="form-input-box new-members"
        type='text'
      >
      </input>
    </div>
  )
}

export default NewMemberEntry;
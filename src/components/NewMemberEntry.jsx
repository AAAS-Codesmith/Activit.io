import React from 'react';

const NewMemberEntry = (props) => {
  return (
    <div>
      <label for='member'>Member {props.memberNum}</label>
      <input
        className="form-input-box"
        type='text'
      >
      </input>
    </div>
  )
}

export default NewMemberEntry;
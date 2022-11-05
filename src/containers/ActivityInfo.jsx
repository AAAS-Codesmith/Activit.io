import React from 'react';

const ActivityInfo = () => {
  // Developing elements for people we're going with
  const friendArr = [];
  
  const dummyData = ['Ahsunn', 'Aleks', 'Azaa', 'Steeb'];
  dummyData.forEach(friend => {
    friendArr.push(
      <li>{friend}</li>
    )
  })
  return (
    <div>
      <h1>Name of Activity depending on info passed down</h1>
      <div>
        <h2>People i'm going with</h2>
        {friendArr}
      </div>
    </div>
  )
}

export default ActivityInfo;
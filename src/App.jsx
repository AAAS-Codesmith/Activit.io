import React from 'react'

function App() {
  
  const handleClick = () => {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        document.getElementById('test').innerText = data;
      })
    console.log('Pressed!')
    console.log('Test from steve')
  }

  return (
    <div className='mainApp'>
      <h1 id='test'>Hello World</h1>
      <button className='button' onClick={handleClick}>Press!</button>
    </div>
  )
}

/*
document.getElementById('test').innerText = 'yooo'
*/
export default App;

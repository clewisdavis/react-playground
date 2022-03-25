// App.js
import React, { useState } from 'react';
import './App.css';
import ColorChangeButton from './ColorChangeButton'

function App() {
  const [color, setColor] = useState('')
  return (
    <div className={`react-root ${color}`}>
      <div className='centered'>
        <h1>Color Picker</h1>
        <ColorChangeButton color='red' />
        <ColorChangeButton color='blue' />
        <ColorChangeButton color='yellow' />
        <button className='red' onClick={() => setColor('red')}>
          red
        </button>
        <button className='blue' onClick={() => setColor('blue')}>blue</button>
        <button className='yellow' onClick={() => setColor('yellow')}>yellow</button>
      </div>
    </div>
  );
}

export default App;

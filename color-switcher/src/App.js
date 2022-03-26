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
        <ColorChangeButton color='red' type='button' setColor={setColor} />
        <ColorChangeButton color='blue' type='button' setColor={setColor} />
        <ColorChangeButton color='yellow' type='button' setColor={setColor} />
      </div>
    </div>
  );
}

export default App;

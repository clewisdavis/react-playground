// App.js
import React, { useState } from 'react';
import './App.css';
import ColorChangeButton from './ColorChangeButton'

function App() {
  const [color, setColor] = useState('');
  const [active, setActive] = useState('');
  return (
    <div className={`react-root ${color}`}>
      <div className='centered'>
        <h1>Color Picker</h1>
        <ColorChangeButton active='active' setActive={setActive} color='red' type='button' setColor={setColor} />
        <ColorChangeButton active='active' setActive={setActive} color='blue' type='button' setColor={setColor} />
        <ColorChangeButton active='active' setActive={setActive} color='yellow' type='button' setColor={setColor} />
      </div>
    </div>
  );
}

export default App;

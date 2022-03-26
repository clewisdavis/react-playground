# Notes from React Beginners Guide

[Beginners Guide to React 2020](https://welearncode.com/beginners-guide-react-2020/)

## React State

- Any variables we want to have changed while our app is running need to be store din state.
- This will cause React to automatically update our component's appearance each time a state variable updates.
- In order to utilize state, we need to import `useState` hook from React.
- React has Hooks, which allow us to write components using just functions.
- Hooks are functions that allow us to "hook into" React features.
- Import with `useState`

```JAVASCRIPT
+ import React, { useState } from 'react'
import './App.css'
```

- The `useState` hook takes on argument, what the initial value of state will be. It returns two values in an array.
- The first is the value of the state variable, the second is a function that will allow us to update state.

## React Props

- Two more important features important in React, components and props.
- In our color picker example, `App` is actually a component.
- But we want to make our component small and reusable.
- Our buttons follow a pattern. Has a className and an onClick event.
- We can easily make this into a component, `ColorChangeButton`
- Create a new file in `src/` folder called `ColorChangeButton.js`
- Then create a component in this file.

```JAVASCRIPT
// ColorChangeButton.js
import React from 'react'

function ColorChangeButton () {
  return (
    <button>Hi!</button>
  )
}

export default ColorChangeButton
```

- Now go back and add to our App.js and import `ColorChangeButton`

```JAVASCRIPT
// App.js

import React, { useState } from 'react'
import './App.css'
import ColorChangeButton from './ColorChangeButton'
```

- In our JSX code, we will create thre instances of our `ColorChangeButton`

```JAVASCRIPT
 // App.js
  return (
    <div className={`react-root ${color}`}>
      <div className='centered'>
        <h1>Color Picker</h1>
        <ColorChangeButton />
        <ColorChangeButton />
        <ColorChangeButton />
        <button className='red' onClick={() => setColor('red')}>red</button>
        <button className='blue' onClick={() => setColor('blue')}>blue</button>
        <button className='yellow' onClick={() => setColor('yellow')}>yellow</button>
      </div>
    </div>
  )
```

- Now you should see three button on the page.
- But they all say the same thing, we want to update the color and text.
- **React uses unidirectional data flow**, which means we can nly pass data from a parent component to a child component.
- We will use `props` to pass data from one component to another.
- I our parent component, `App`, we can add props. In this case `color` is the name of oour prop and the value comes after the equals sign.
- `<ColorChangeButton color='red' />`

```JAVASCRIPT
 // App.js
  return (
    <div className={`react-root ${color}`}>
      <div className='centered'>
        <h1>Color Picker</h1>
+        <ColorChangeButton color='red' />
+        <ColorChangeButton color='blue' />
+        <ColorChangeButton color='yellow' />
        <button className='red' onClick={() => setColor('red')}>red</button>
        <button className='blue' onClick={() => setColor('blue')}>blue</button>
        <button className='yellow' onClick={() => setColor('yellow')}>yellow</button>
      </div>
    </div>
  )
```

- Now we need to us ethos props in our child compoennt `ColorChangeButton.js`
- First you need to modify the function to take the parameter props

```JAVASCRIPT
// ColorChangeButton.js
function ColorChangeButton (props) {
  ...
}
```

- Then you can console.log(props) to see what it returns. Add this before the return statement.
- It's an object! **react combines each prop we send from the parent component into an object with key value pairs in the child**
- So to access our color in our child component, we would do `props.color`.
- Now, make our button display our color as text.
- And add teh color as a class to the button so the correct color displays onClick

```JAVASCRIPT
// ColorChangeButton.js
import React from 'react'

function ColorChangeButton (props) {
  return (
    <button className={props.color}>{props.color}</button>
  )
}

export default ColorChangeButton
```

- Now our button looks right, we need to make the click event work.
- One issue we have is that `setColor` is defined in our `App` component, we don't have access to it in `ColorChangeButton`.
- But, we have a way to pass data from a parent compoennt to a chile component with `props`
- Let's pass `setColor` function down as a prop to out `ColorChangeButton` component

```JAVASCRIPT
//App.js
return (
    <div className={`react-root ${color}`}>
      <div className='centered'>
        <h1>Color Picker</h1>
        <ColorChangeButton color='red' setColor={setColor} />
        <ColorChangeButton color='blue' setColor={setColor} />
        <ColorChangeButton color='yellow' setColor={setColor} />
      </div>
    </div>
)
```

- Now if you go to `ColorChangeButton` and console.log what the props are, you see you have a second item in the object.
- And then add the setColor function to the `ColorChangeButton` component

```JAVASCRIPT
function ColorChangeButton(props) {
  return (
   <button className={props.color} onClick={() => props.setColor(props.color)}>
      {props.color}
    </button>
  )
}

export default ColorChangeButton
```

- Now each button works, passing the state change function down from parent to child components is called inverse data flow.

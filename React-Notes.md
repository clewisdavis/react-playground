# React Doc Notes

Going through the [React tutorial docs](https://reactjs.org/tutorial/tutorial.html). To get more experience with the framework. Wanting to get more familiar with the basic concepts and how to work with them.

In this tutorial we will build a small game that goes through the concepts.

- Setup for the tutorial
- Overview of the fundamentals, components, props and state
- Building the game, the most common techniques in React dev
- Adding Time Travel, deeper insight

## What are we building?

- We will build an interactive [tic-tac-toe](https://codepen.io/gaearon/pen/gWWZgR?editors=0010) game in React.

## Prerequisites

- Some base knowledge of HTML and JAVASCRIPT. If you need a refresher, you can refer to the [MDN guides](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript).

## Setup for the game

- Setting up your local dev environment.
  - 1. Make sure you a recent version of `Node.js` is installed.
  - 2. Follow the instructions for [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) for a new project.
- Run `npx create-react-app my-app`
  - You need to have Node 14.0.0 and npm 5.6 or higher on your machine
  - Under the hood, it uses Babel and webpack, but you don't need to know anything about them.
  - To optimize, run `npm run build` to create a build folder.

## Overview

- What is React? React is a delarative JS library for building user interfaces. It let's you compose complex UIs from small and isolated pieces of code called "components".
- Start with `React.Component` subclasses

```JAVASCRIPT
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />
```

- We use components to tell React what we want to see on screen.
- When our data changes, React will update and re-render our components.
- The example above, `ShoppingList` is a React component class, or react component type.
- A component takes in parameters, called `props` (shrot for properties) and returns a hierarchy of views to display via the `render` method.

- The `render` method returns a description fo what you want to see on the screen. React take teh desciption and displays the result.
- `render` returns a React element, which is a lightweight description of what to render.
- JSX makes these structures easier to write. The `<div/>` syntax is transformed at build time to `React.createElement('div')`.
- The example above is equivalent to.

```JAVASCRIPT
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

- JSX come with the full power of JS. You can put any JS expressions within braces inside JSX.
- Each React element is a JS object that you can store in a variable or pass around in your program.

- The `ShoppingList` component above only renders built-in DOM components like `<div />` and `<li />`. But you can compose and render custom react components too.
We can now refer to the whole shopping list by writing `<ShoppingList />`.
- Each React component is encapsulated and can operate independently, allows you to build complex UIs from simple components.

## Inspecting the Starter Code

- In the tic-tac-toe starter files, the styles are pre-defined.
- In `index.js` you will see we have three React components:
  - Square
  - Board
  - Game
- The Square component renders a single `<button>` and teh Board renders 9 squares.
- The Game component renders a board with a placeholder values which we will modify later.
- And currently not interactive components.

```JAVASCRIPT

```

## Passing Data Through Props

- To start, let's pass some data from our Board component to our Square component
- We strongly recomment typing code by hand as you are workign through the tutorial and no using copy/paste. This will help you develop muscle memory and a stronger understanding.
- I the Board's `renderSquare` method, chang eh code to pass a prop called `vallue` to the Square:

```JAVASCRIPT
class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />
    }
}
```

- Chang eSquare's `render` method to show that value by replacing the `{ TODO }` with `{this.props.value}:`

```JAVASCRIPT
class Square extends React.Component {
    render() {
        return (
            <button className="square">
              {this.props.value}
            </button>
        );
    }
}
```

- You just passed a prop from the parent Board component to a child Square component.
- Passing props is how information flows in React apps, from parents to children.

## Making an Interactive Component

- Let's fill the Square component with an "X" when we click it.
- First, change the button tag that is returned form the Square component's `render()` function to this:

```JAVASCRIPT
class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={function() { consold.log('click'); }}>
              {this.props.value}
            </button>
        )
    }
}
```

- Next step, we want the Square component to "remember" that it got clicked, and fill it with an "X" mark.
- To "remember" things, components use **state**.
- React components can have state by setting `this.state` in their constructors.
- `this.state` should be considered private to the React component it's defined in.
- Let's store the current value of the Square in `this.state`, and change when Square is clicked.

- First, we add a constructor to teh class and initialize the state:

```JAVASCRIPT
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
}
```

- NOTE: In JS classes, you ned to always call `super` when defining the constructor of a subclass. All React component classes that have a `constructor` should start wtih a `super(props)` call.

- Now change the Square's `render` method to display the current state value when clicked:
  - Replace `this.props.value` with `this.state.value` inside the `<button>` tag.
  - Update the onClick handler with `onClick={ () => this.setState({value: 'X'})}
  - Put the `className` and `onClick` props on seperate lines for better readability.

- Final code should look like this:

```JAVASCRIPT
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"        
        onClick={() => this.setState({value: 'X'})}      
      >
        {this.state.value}      
      </button>
    );
  }
}
```

- By calling `this.setState` form an `onClick` handler int he Square's `render` method, we tell react to re-render that Square whenever it's `<button>` is clicked.
- After the update, the Square's `this.state.value` will be `'X'`, so we will see the X on the game board.
- When you call `setState` in a component, React automatically updates teh child components inside of it too.

## Developer Tools

- The React Devtools extension for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [FF](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) lets you inspect a React component tree with your browser dev tools
- Allow you to check the props and state of your React components
- After installing, inspect an element in your React app. You will see two React tabs, Components and Profiler.

## Completing the Game

To complete out tic-tac-toe game. We need a way to alternate placing "X"'s and "O"'s on the board. And determine a winner.

### Lifting State Up

- Currently each Square component maintains the game's state.
- To check for a winner, we wil maintain the value of each of the 9 squares in one location.
- The best approach is to store the game's state in the parent Board component.
- The Board component can tell each Square what to display by passing a prop, just like we did when we passed a number to each Square.

**To collect data from multiple children, or have two child components communicate with each other, you need to declare the shared state in their parent component.**

**The parent component can pass the state back down to the children by using props; this keep the child components in sync with each other and with the parent component.**

- Lifting state into a parent component is common when React components are refactored
- First, add a constructor to the Board and set the Board's initial state to contain an array of 9 nulls, corresponding to the 9 squares.

```JAVASCRIPT
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Arry(9).fill(null),
        };
    }

    renderSquare(i) {
        return <Square value={i} />
    }
}
```

- Now, we modify the Board to instruct each individual Square about it's current value, X, O, or null
- We have already defined the `squares` array in the Boards constructor, and we need to modify the Boards `renderSquare` method to read from it.

```JAVASCRIPT
renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
}
```

- Each square will now receive a `value` prop that will either be `X`, `O`, or `null` for empty squares.

- Next we need to change what happens when a Square is clicked.
- The Board component maintains which squares are filled.
- We nee dto create a way for the Square t update teh Board's state.
- Since hte state is considered private to a component, cannot update the Board's state directly from Square.

- We need to pass down a function form the Board to the Square, and have Square call that function when a square is clicked.
- Update the `renderSquare` method in Board to:

```JAVASCRIPT
renderSquare(i) {
    return (
        <Square
          value={this.state.square[i]}
          onClick={() => this.handleClick(i)}
        />
    );
}
```

- Now we are passing down two props from Board to Square: `value` and `onClick`.  The `onClick` prop is a function that Square can call when clicked. Now make the updates to Square:
  - Replace `this.state.value` with `this.props.value` in teh Square `render` method
  - Replace `this.setState()` with `this.props.onClick()` in the Squares `render` method
  - Delete the `constructor` from Square because Square no longer keeps track of the game's state.

- When a Square is clicked, the `onClick` function provided by the Board is called. Here is what's happening
  - 1. Teh `onClick` prop on the build-in DOM `<button>` component tells React to set up an click event listener.
  - 2. When the button is clicked, React will call the `onClick` event handler that is defined in Square's `render()` method.
  - 3. This event handler calls `this.props.onClick()`. The Square's `onClick` prop was specified by the Board.
  - 4. Since the Board passed `onClick={() => this.handleClick(i)}` to Square, the Square calls the Board's `handleClick(i)` when clicked.
  - 5. We have not defined the `handleClick()` method yet, so our code crashes. If you click a square now, you should see a red error screen, saying something like "this.handleClick is not a function"

- **NOTE**: The DOM `<button>` element's `onClick` attribute has a special meaning to React because it is a built-in component. For custom components like Square, the naming is up to you.
- We could give any name to the Squares's `onClick` prop or Boards `handleClick` method, and the code woudl work the asme.
- In React, it's conventional to use `on[Event]` names for props which represent events and `handle[Event]` for methods which handle the events.

- When we try to click a Square, we should get an error because we haven't defined `handleCLick` yet. Add `handleClick` to the Board Class.

```JAVASCRIPT
handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
}
```

- However, now state is stored in the Board component instead of the individual Square components.
- When the Board's state changes, teh Square components re-render automatically. Keeping the state of all squares in the Board Component will allow it to determine the winner.
- Since the Square components no longer maintain state, the Sqaure components receive values from the Board component and inform the Board component when they are clicked.
- In React terms, the Square components are now **controlled components**. The Board has full control over them.

- Note how in `handleClick` we call `.slice()` to create a copy of the `squares` array to modify instead of modifying the existing array.

## Why Immutability is important

- In the tutorial, we suggested creating a copy fo the `squares` array using the `slice()` method instead of modifying the existing array.
- There are generally two approaches to changing data.
  - First, to mutate teh data by directly changing the data's values.
  - Second, is to replace the date with a new copy which has the desired changes.

- **Data change with Mutation**

```JAVASCRIPT
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player iis {score: 2, name: 'Jeff'}
```

- Data Change without Mutation

```JAVASCRIPT
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
//Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write: 
// var newPlayer = {...player, score: 2};
```

- the end result is the same but by not mutating directly, we gain several benefits.

### Complex Features Become Simple

- Immutability makes complex features much easier to implement.
- Later in this game, we will implement "time travel" for the games history.
- The ability to undo and redo certain actions is common in apps.
- Avoiding direct data mutaion lets us keep previous versions of the game history and reuse them later.

### Detecting Changes

- Detecting changes in mutable objects is difficult because they are modified directly.
- This detection requires teh mutable object to be compared to previous copies of itself and the entire object tree traversed.
- **Detecting changes in immutable objects is easier.**
- If the immutable object that is being referenced is differ than the previous one, the object has changed.

### Determining When to Re-Render in React

- The main benefit of immutability is that it hehlps you build pure components in React.
- Immutable data can easily determine if changes have been made, which helps determine when a component requires re-rendering.
- For more about [pure components](https://reactjs.org/docs/optimizing-performance.html#examples) and when to use `shouldComponentUpdate()`

## Function Components

- We will now change the Square to be a function component.
- In React, function components are a simpler way to write components that only contain a `render` method and don't have their own state.
- Instead of defining a class which extends `React.Component`, we can write a function that takes `props` as input and returns what should be rendered.
- Function components are less tedious to write than classes, and many components can be expressed this way.

- Update the Square class with this function:

```JAVASCRIPT
function Square(props) {
    return(
        <button 
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
```

- We have changed `this.props` to `props` both times it appears.

## Taking Turns

- We now need to fix an obvious defect in our tic-tac-toe game: the O's cannot be marked on the board.
- We will set the first move to be "X" by default. We can set this default by modifying the initial state in our Board constructor:

```JAVASCRIPT
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }
}
```

- each time a player moves, `xIsNext` (boolean) will be flipped to determine which player goes next and the game's state will be saved.
- We will update he Board's `handleClick` function to flip the value of `xIsNext`

```JAVASCRIPT
handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
    })
}
```

- With this change, "X"s and "O"s can take turns!

- Let's also change the "status" text in Board's `render` so that it displays which player has the next turn:

```JAVASCRIPT
render() {
    const status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');

    return(
        // the rest of the Board's component
    )
}
```

## Declaring a Winner

- Nwo that we show which player turn is next, we should also show when the game is won and there are no more turns to make. Use this helper function and paste end of file.

```JAVASCRIPT
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

- Given an array of 9 squares, this funtion wil check for a winner and return 'X', 'O' or `null` as appropriate.

- We wil call `calculateWinner(squares)` in the Board's `render` function to check if a player has won. If a player has won, e can display text "Winner: X" or "Winner: O".
- We will replace e the `status` declaration in Board's `render` function with this code.

```JAVASCRIPT
render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (this.status.xIsNext ? 'X' : 'O');
    }

    return (
        // rest of component code
    )
}
```

- Now we can change the Board's `handleClick` funciton to return early by ignoring a click if someone has won teh game or if a Square is already filled:

```JAVASCRIPT
handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = this.state.xUsNext ? 'X' : 'O';
    this.setState({
        squares: squares,
        xUsNex: !this.state.xIsNext,
    });
}
```

## Adding Time Travel

- Let's make it possible to go back in time to the previous moves in the game.

### Storing the History of Moves

- If we mutated the `squares` array, implementing time travel would be very difficult.
- However, we used `slice()` to create a new copy of squares array after every move and treated it as immutable.
- This will allow us to store every past version of the squares array, and navigate between the turns that have already happened.

- First, we will store the past `squares` arrays in another array called `history`. This `history` array represents all the board states, from the first to the last move.
- And decided which component should own the the `history` state.

### Lifting State Up, Again

- Top level Game component to display a list of past moves. It will need access to the `history` to do that, so we will place the `history` state in the top level Game component.

- Placing the `history` state into the Game component lets us remove the `squares` state from it's child Board component.
- Just like we lifted state up from the Square component into the Board component, we are now lifting tit up form the Board, into the top level Game component.

- This give the Game component full control over the Board's date, and let's it instruct teh Board to render previous turns from `history`.

- First set upt he initial state for the Game component within its constructor:

```JAVASCRIPT
class Game extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          history: [{
              squares: Array(9).fill(null),
          }],
          xIsNext: true,
      }
  }
}
```

- Next, we will have the Board component receive `squares` and `onClick` props from the Game component.
- Since we now have a single click handler in Board for many Squares, we need to pass the location of each Square into the `onClick` handler to indicate which Square was clicked.
  - Delete the `constructor` in Board
  - Replace `this.state.squares[i]` with `this.props.squares[i]` in Board's `renderSquare`
  - Replace `this.handleClick(i)` with `this.props.onClick(i)` in Board's `renderSquare`

```JAVASCRIPT
// In the Board Component
renderSquare(i) {
    return (
        <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
    )
}
```

- We will update the Game components `render` function to use th emost recent history entry to determine and display the game's status:

```JAVASCRIPT
  render() {
    const history = this.state.history;    
    const current = history[history.length - 1];    
    const winner = calculateWinner(current.squares);    
    let status;    
    if (winner) {
              status = 'Winner: ' + winner;    
              } else {
                        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
              }
    return (
      <div className="game">
        <div className="game-board">
          <Board            squares={current.squares}            onClick={(i) => this.handleClick(i)}          />        </div>
        <div className="game-info">
          <div>{status}</div>          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

- Since the Game Component is now rendering the game's status, we can remove the corresponding code from the Board's `render` method.

- Finally, we need to move the `handleClick` method from the Board component to the Game component.
- We also need to modify `handleClick` because the Game component's state is structured differently.
- Within the Game's `handleClick` method, we concatenate new history entries onto `history`

```JAVASCRIPT
handleClick(i) {
    const history = this.state.history;
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        history: history.concat([{
            squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
    });
}
```

- At this point teh Board component only needs the `renderSquare` and `render` methods. The game's state and the `handleClick` method should be in the Game component.

### Showing the Past Moves

- Since we are recording teh tic-tac-toe game's history, we can now display it toht eplaye ras a list of past moves.
- We learned earlier that React elements are first class JS objects; we can pass them aroudn in our applications
- To render multipel items in React, we can use an array of React elements.

- In JS, arrays have a `map()` method commonly used to mapping date to other data, for example

```JAVASCRIPT
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2);
```

- Using the `map` method, we can map our history of moves to React elements representing button on teh scree, and display a list of buttons to jump to past moves.

- Let's `map` over the `history` in teh Game's `render` method:

```JAVASCRIPT
const moves = history.map((step, move) => {
    const desc = move ?
        'Go to move #' + move :
        'Go to game start';
    return (
        <li>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
    );
});
```

- As we iterate through `history` array, `step` variable refers to the current `history` element value, and `move` refers to the current `history` element index.
- We are only interested in `move` here, hence `step` is not getting assigned to anything.

- For each move int he tic-tax-toe game's history, we create a list item `<li>` which contains a button `<button>`.
- The button ahs a `onCLick` handler which calls a method called `this.jumpTo()`.
- We haven't implemented the `jumpTo()` method yet. Fro now, we see a list of the moves that have occurred in the game and a warning in dev tools.
- *warning: each child in an array or iterator should have a unique "key" prop.*

### Picking a Key

- When we render a list, React stores some info about each rendered list item.
- We could have added, removed, re-arranged or update the list's items.
- Imagine the following scenario:

- updating from:

```HTML
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

- To:

```HTML
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

- A human reading the difference, would say we simply sapped Alexa and Ben's ordering and inserted Claudia.
- But React is a computer program and does not know what we intended.
- React does not know our intentions, we need to specify a *key* property for each lsit item to differentiate each list item from it's siblings.
- One option would be to use teh strings. `alexa` `ben` `claudia`
- If we were displaying date from a database, Alexa, Ben and Lcaudia's databse IDs could be used as keys.

```HTML
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

- When a list is re-rendered, React takes each list items key and searches teh previous list items for a matching key.
- If teh current list has a key that didn't exist before, React creates a component.
- If the current list is missing a key that existed in previous list, React destroys the previous components.
- If two keys match, the corresponding component is moved.
- Keys tell React about the identity of each component which allows React to maintain state between re-renders.
- If a components key changes, the component will be destroyed and re-created with a new state.

- `key` is a special and reserved property in React (along with the `ref`).
When an element is created, React extracts the `key` property and stores teh key direclty on teh returend element.
- Even though `key` may look like it belongs in `props`, `key` cannot be referenced using `this.props.key`.
- React automatically uses `key` to decide which components to update.
- A component cannot inquire about its `key`.

- **It is strongly recommended that you assign proper keys whenever you build dynamic lists.**
- If you don't have an appropriate key,  you may want to consider restructuring your data so that you do.

- If no key is specified, React will present a warning and use the array index as a key by default.
- Using the array index as a key is problematic when trying to re-order a list items or inserting/removing list items.
- Explicitly passing `key={i}` silences the warning but has the same problems as array indices and is not recommened in most cases.

- Keys to not not need to be globally unique; they only need tobe unique between comoponents and their siblings.

### Implementing Time Travel

- In teh tic-tax-toe game's history, each past move has a unique ID with it
- It's the sequential number of the move.
- Teh moves are never re-ordered, deleted or inserted in the middle. So it is save to use the move index as a key.

- In the Game component `render` method, add teh key as `<li key={move}>` and React wraning about keys should disappear:

```JAVASCRIPT
const moves = history.map((step, move) => {
    const dec = move ?
        'Go to move #' + move :
        'Go to game start';
    return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
    );
});
```

- Clicking any of the list items buttons throws an error because the `jumpTo` method is undefined.
- Before we implement `jumpTo`, we add `stepNumber` to the Game components state to indecate which step we are currently viewing.

- First, add `stepNumber: 0` to the initial state in Game's `constructor`:

```JAVASCRIPT
class Game extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }
}
```

- next we will define the `jumpTo` method in the Game to update the `stepNumber.
- We also set `xIsNext` to true if the number that we are changing `stepNumber` to is even:

```JAVASCRIPT
jumpTo(step) {
    this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
    });
}
```

- Notice in `jumpTo` meothos, we haven't update `history` property of the state.
- That is becaus state updates are merged or in more simple words React will update only the properties mentioned in `steState` method leaving teh remainng state as is.

- We will now make changes to the Game's `handleClick` method which fires when you click on a square.

- the `stepNumber` state we added reflects the move displayed to the users now
- After we make a new move, we need to update the `stepNumber` by adding `stepNumber:history.length` as part fo the `this.setState` argument.
- This ensures we don't get stuck showing the same after a new one has been made.

- We will also replace reading `this.state.history` with `this.state.history.slice(0, this.state.stepNumber + 1)`.
- This ensures that is we go back in time and then make a new move from that point. We throw away al the future history that would be now be incorrect.

```JAVASCRIPT
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        history: history.concat([{
            squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
    });
  }
```

- Finally we will modify the Game component `render` methos from always rendering the last move to rendering the currently selected ove according to `stepNumber`:

```JAVASCRIPT
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    //REST OF CODE
```

- If we click on any step in game's history, the tic tac toe board should immediately update to show what the board looked like after that step occurred.

### Wrap Up

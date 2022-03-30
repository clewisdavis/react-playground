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

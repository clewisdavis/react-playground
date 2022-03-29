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

# React Main Concepts Notes

My notes from going through the [main concepts](https://reactjs.org/docs/hello-world.html) section of documentation.

The smallest React example looks like this:

```JAVASCRIPT
ReactDOM
    .creatRoot(document.getElementById('root'))
    .render(<h1>Hello, world!</h1>);
```

- It displays a heading saying "hello world" on the page.
- Check out this [code pen](https://codepen.io/gaearon/pen/MjrdWg?editors=1010) and play around with the page.

## How to read this guide

From this guide, we will go over the building blocks of React apps: elements and compnents. Once you master them, you can create complex apps from small reusable pieces.

This is a compliment guide to the [tic-tac-toe tutorial](https://github.com/clewisdavis/react-playground/blob/main/React-Notes.md).

First, look at a step-by-step guid on main React concepts. Every section build on teh knowledge in earlier sections. You can learn most of React by reading the "main concepts" guide chapters in teh order they appear.

## Knowledge Level Assumptions

React is a JS library, and assume you have some basic understanding of the JS language. You can brush up on your [JS on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). You don't want to be learning JS and React at the same time.

## Intro to JSX

- Consider this variable declaration:

```JAVASCRIPT
const element = <h1>Hello World!</h1>;
```

- It is called JSX, and a syntax extension to JS.
- It's recommneded using in React to describe what the UI should look like.
- JSX may remind you of a template language, but it comes with the full power of JS.

- JSX produces React elements. Below are the basics of JSX and how to get started.

### Why JSX?

- React embraces the fact rendering logic is inherently coupled with other UI logic: how events are handled, state changes over time and how data is prepared for display.
- Instead of artificially seperating technologies by putting markup adn logic in seperate files. react
- React separates concerns with loosely coupled units called "components" that contain both.
- React doesn't require using JSX, btu most peopel find it helpful as a visual aid hwen wroking tih the UI inside the JS code.

### Embedding Expressions in JSX

- In this example, we declare a variable called `name` and then use it inside JSX by wrapping it in curly braces.

```JAVASCRIPT
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

- You can put any valid JS expression inside the curly braces in JSX.
- For example, `2 + 2`, or `formatName(user)` are al valid JS expressions.

- In the example below, we embed the result of callign a JS function, `formatName(user)` into an `<h1>` element.
  
```JAVASCRIPT
funciton formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    <h1>
      Hello, {formatName(user)}!
    </h1>
)
```

### JSX is an Expression Too

- After compilation, JSX expressions become regular JS function calls and evaluate to JS objects.
- This mean you can use JSX inside of `if` statment and `for` loops, assign it to variables, accept as arguments and return it from functions:

```JAVASCRIPT
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, stranger.</h1>
}
```

### Specifying Attributes with JSX

- You may use quotes to specify string literals as attributes:

```JAVASCRIPT
const element = <a href="https://www.reactjs.org"> link </a>;
```

- You may also use curly braces to embed a JS expressoin in an attribute:

```JAVASCRIPT
const element = <img src={user.avatarUrl}></img>;
```

- Don't put quotes aroudn curly braces when embedding a JS expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

- **warning** Since JSX is closer to JS than to HTML and React DOM uses `camelCase` property naming convention instead of HTML attribute names. For example `class` becomes `className` in JSX and `tabindex` becomes `tabIndex`.

### Specifying Children in JSX

- If a tag is empty, you may close it immediately with `/>` like XML:

```JAVASCRIPT
const element = <img src={user.avatarUrl} />;
```

- JSX tags may contain children:

```JAVASCRIPT
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX Prevents Injection Attacks

- It is sav eto embed user inptu in JSX:

```JAVASCRIPT
const title = response. potentiallyMaliciousInput;
//This is save:
const element = <h1>{title}</h1>;
```

- By default, React DOM `escapes` any values embedded in JSX before rendering them. This it ensures that you can neve rinject anything that not explicitly written in you app.
- Everything is converted to a string befor ebeing rendered. This helps prevent XSS cross site scripting attacks.

### JSX Represents Objects

- Babel compiles JSX down to `React.createElement()` calls.
- These two examples are identical:

```JAVASCRIPT
const element = (
    <h1 className="greeting">
      Hello, world!
    </h1>
)
```

```JAVASCRIPT
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
```

- React.createElement() performs a few checks to help you write bug free code but essentially creates an object like this:

```JAVASCRIPT
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

- These objects are called "React elements". Youc an think of them as descriptions of what you want to see on the screen.
- react reads these objects and uses them to construct the DOM and keep it up to date.

- We will explore rendering React elements to the DOM in the next section.
- **TIP** recommend using the [Babel language definition](https://babeljs.io/docs/en/editors) for your editor

## Rendering Elements

- Let's say there is a `<div>` somewhere in your HTML file.

```HTML
<div id="root"></div>
```

- We call this a "root" DOM node because everything inside it will be managed by React DOM.
- Apps built with just React usually have a single root DOM node.
- **If you are integrating React into an existing app**, you may have as many isolated root DOM nodes as you like.

- To render a React element, first pass the DOM element to `ReactDOM.createRoot()`, then pass the React element to `root.render()`

```JAVASCRIPT
const element = <h1>Hello World</h1>;
const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(element);
```

- Try this [CodePen](https://codepen.io/gaearon/pen/edyBaE?editors=1010)

### Updating the Rendered Element

- React element are immutable (unchangeable). Once you create an elemtn, you can't change it's children or attributes.
- And element is like a single frame in a movie: it represents the UI at a certain point in time

- With our knowledge so far, the only wayt o update the UI is to create a new element, and pass it to `root.renter()`.
- Like tis ticking clock example:

```JAVASCRIPT
//first pass the DOM element to .createRoot() method
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tick() {
    const element = (
        <div>
          <h1>Hello world!</h1>
          <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    root.render(elemnt);
}

setInterval(tick, 1000);
```

- Check out the [codePen](https://codepen.io/gaearon/pen/gwoJeZ?editors=1010)

- NOTE: In practice, most React apps only call `root.render()` once. In upcoming sectoins we will learn how such ode gets encapsulated into [`stateful components`](https://reactjs.org/docs/state-and-lifecycle.html)

### React Only Updates What's Necessary

- React DOM compares the elements and it's children to the previous one, and only applies DOM updates necessary to bring the DOM to the desired state.
- You can see for yourself by looking at the [last exampl](https://codepen.io/gaearon/pen/gwoJeZ?editors=1010)e in the browser tools

- Even though we create an element describing the whole UI tree on every tick, only the text node whose contents hae changed gets updated by React DOM.

- In our experience, thinking about how the UI should look at any given moment, rather than how to change it over time, eliminates a whole class of bugs.

## Components and Props

- Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
- **Conceptually, components are like JS functions.** They accept arbitrary inputs (called props) and return React elements describing what should appear on the screen.

### Function and Class Components

- The simplest way to define a component is to write a JS function:

```JAVASCRIPT
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- This function si a valid React component because it accepts a single prop (short for properties) object argument with data and returns a React element.
- We call such components "function components" because they are literally JS functions.

- You can also use an ES6 class to define a component:

```JAVASCRIPT
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

- The above examples are equivalent in React's point of view.
- Function and Class components both have some additional features that we wil discuss in the future sections.

### Rendering a Component

- Previously, we only encountered React elements that represent DOM tags:

```JAVASCRIPT
const element = <div />;
```

- However, elements can also represent user-defined components:

```JAVASCRIPT
const element = <Welcome name="Sara" />;
```

- When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object "props".
- For example; this code renders "Hello, Sara" on the page:

```JAVASCRIPT
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);
```

- Recap of what's going on in this example:

1. We call `root.render()` with the `<Welcome name="Sara" />` element.
2. React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3. Our `Welcome` component returns a `<h1>Hello, Sare<h1>` element as the result.
4. react DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`

- **NOTE: Always start component names with a capital letter.**

### Composing Components

- Components can refer to other components in their output. This lets us us the same component abstraction for any level of detail. A button, form, dialog a screen: in React apps, all those are commonly expressed as components.

- For example we can create an `App` component that renders `Welcome` many times:

```JAVASCRIPT
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Audrey" />
      <Welcome name="Alex" />
      <Welcome name="Arden" />
    </div>
  )
}
```

- Typically, new React apps have a single `App` component at the very top. However, if you integrate React into an existing app, you might start bottom up with a small component like `Button` and gradually work your way to the top of the view hierarchy.

### Extracting Components

- Don't be afraid to split components into smaller components.
- For example, thsi `Comment` component:

```JAVASCRIPT
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
       <img className="Avatar"
        src={props.author.avatarUrl}
        alt={props.author.name}
       />
       <div className+"UserInfo-name">
        {props.author.name}
       </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

- It accepts `author` (an object), `text` (a string), and `date` (a date) as props, and describes a comment on a social media website.
- This component can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. We can extract a few components from it.

- First we extract `Avatar`:

```JAVASCRIPT
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

- The `Avatar` doesn't need to knwo that is is being rendered inside a `Comment`. This is why we have given its prop a more generic name: `user` rather than `author`.

- **We recommend naming props from the components own point of view rather than the context in which it is being used.**

- Now we can simplify `Comment` a tiny bit:

```JAVASCRIPT
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
       <Avatar user={props.author} />
       <div className+"UserInfo-name">
        {props.author.name}
       </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

- Next we wil extract a `UserInto` component that renders an `Avatar` next to the user's name:

```JAVASCRIPT
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

- This lets us simplify `Comment` even further:

```JAVASCRIPT
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

- Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps.
- A good rule of thumb is that is a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on it's own (`App`, `FeedStory`, `Comment`) it is a good candidate to be extracted to separate component.

## Props are Read-Only

- Whether you declare a component as a function or a class, it must never modify it's own props. Consider this `sum` function:

```JAVASCRIPT
function sum(a, b) {
  return a + b;
}
```

- Such functions are called "pure" because they do not attempt to change their inputs, and always return the same result from the same inputs.

- In contrast, this function is impure because it changes its own input:

```JAVASCRIPT
function withdraw(account, amount) {
  account.total -= amount;
}
```

- React is pretty flexible but it has a single strict rule.

- **All React components must act like pure function with respect to their props.**

- Of course, application UIs are dynamic and change over time. In the next section we will introduce the new concept of state.
- State allows React components to change their output over time in response to the users actions, network responses, and anything else, without violating this rule.

## State and Lifecycle

- This section introduces the concept of state and lifecycle in a React component.
- You can find a [detailed API reference here](https://reactjs.org/docs/react-component.html)

- Consider the ticking clock example from one of the [previous sections](https://reactjs.org/docs/rendering-elements.html#updating-the-rendered-element).
- In Rendering Elements, we have only learned one way to update the UI.
- We call `root.render()` to change the rendered output:

```JAVASCRIPT
const root = ReactDOM.createRoot(document.getElementByID('root'));

function tick() {
  const element = (
    <div>
      <h1>hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

- [CodePen Reference](https://codepen.io/gaearon/pen/gwoJeZ?editors=0010)

- In this section, we will learn hwo to make the `Clock` component truly reusable and encapsulated. It will set up it's own timer and update itself every second.

- We can start by encapsulating how the clock looks:

```JAVASCRIPT
const root = ReactDOM.createRoot(document.getElementByID('root'));

function Clock(props) {
  return (
    <div>
      <h1>hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);
```

- However, it misses a crucial requirement: the fact that the `Clock` sets up a timer and updates the UI every second should be an implementation detail of the `Clock`.

- Ideally we want to write this once and have th `Clock` update itself:

```JAVASCRIPT
root.render(<Clock />);
```

- To implement this, we need to add "state" tot he `Clock` component.

- State is similar to props, btu it is private and fully controlled by the component.

## Converting a Function to a Class

- You can convert a function component like `Clock` to a class in five steps:

1. Create an [ES6 class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), with the same name, that extends `React.Component`
2. Add a single empty method to it called `render()`.
3. Move the body of the function into the `render()` method.
4. Replace `props` with `this.props` in the `render()` body.
5. Delete the remaining empty function declaration.

```JAVASCRIPT
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

- [CodePen](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

- `Clock` isi now defined as a class rather than a function.

- The `render` method will be called each time an update happens, but as long as we render `<Clock />` into the asme DOM node, only a single instance of the `Clock` class will be used. This lets us use additional features such as local state and lifecycle methods.

## Adding Local State to a Class

- We will move the `date` form props to state in three steps:

1. Replace `this.props.date` with `this.state.date` in teh `render()` method:

```JAVASCRIPT
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>hello, world</h1>
        <h2>it is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. Add a [class constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#constructor) that assigns the initial `this.state`:

```JAVASCRIPT
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>hello, world</h1>
        <h2>it is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

- Note how we pass `props` to the base constructor:

```JAVASCRIPT
constructor(props) {
  super(props);
  this.state = {date: new Date()};
}
```

- Class components should always call the base constructor with `props`.

3. Remove the `date` prop from the `<Clock />` element:

```JAVASCRIPT
root.render(<Clock />);
```

- We will add teh timer code back to the component itself.
- The result looks like this:

```JAVASCRIPT
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>hello, world</h1>
        <h2>it is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

- [CodePen](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

- Next, we will make the `Clock` set up its own timer and update itself every second.

## Adding Lifecycle Methods to a Class

- In apps with many components, it's very important to free up resources taken by the components when they are destroyed.

- We want to set up a timer whenever the `Clock` is rendered to the DOM for the first time. This is called "mounting" in Rect.

- We also want to clear that timer whenever the DOM produced by the `Clock` is removed. This is called "unmounting" in React.

- We can declare special methods on teh component class to run some code when a component mounts and unmounts:

```JAVASCRIPT
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <div>
        <h1>hello, world</h1>
        <h2>it is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

- **These methods are called "lifecycle methods".**

- The `componentDidMount()` method runs after the component output has been rendered to the DOM. This is a good place to set up a timer:

```JAVASCRIPT
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```

- Note hwo we save the timer ID right on `this` (`this.timerID`).

- While `this.props` is set up by React itself and `this.state` has a special meaning, you are free to add additional fields to the class manually fi you need to store something that doesn't participate int he data flow (like a timer ID).

- We will tear down the timer in the `componentWilUnmount()` lifecycle method:

```JAVASCRIPT
componentWillUnmount() {
  clearInterval(ths.timerID);
}
```

- Finally we will implement a method called `tick()` that the `Clock` component will run every second.

- It will use `this.setState()` to schedule updates tot he component local state:

```JAVASCRIPT
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(ths.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>hello, world</h1>
        <h2>it is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

- Try on [CodePen](https://codepen.io/gaearon/pen/amqdNr?editors=0010)
- Now the clock ticks every second.

- Let's quickly recap what's going on and the order in which methods are called:

1. When `<Clock />` is passed to `root.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.
2. React then calls the `Clock` component's `render()` method. This is how React learns what should be displayed on the screen. React then updates teh DOM to match the `Clock`'s render output.
3. When the `Clock` output is inserted in the DOM, React calls the `componentDidMount()` lifecycle method. Inside it, the `Clock` component asks the browser to set up a timer to call the component's `tick()` method once a second.
4. Every second the browser calls the `tick()` method. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` int he `render()` method will be different, and so the render output will include the updated time. React update the DOM accordingly.
5. If the `Clock` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method so the timer is stopped.

## Using State Correctly

- There are three things you should know about `setState()`.

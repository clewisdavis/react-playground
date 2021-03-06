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

### Do not modify state directly

- For example, this will not re-render a component:

```JAVASCRIPT
// Wrong
this.state.comment = 'Hello';
```

- Instead, use `setState()`:

```JAVASCRIPT
this.setState({comment: 'Hello'});
```

- The only place where you can assign `this.state` is the constructor.

### State Updates May be Asynchronous

- React may batch multiple `setState()` calls into a single update for performance.
- because `this.props` and `this.state` may be updated asynchronously, you shoudl not rely on their values for calculating the next state.

- For example, this code may fail to update teh counter:

```JAVASCRIPT
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
})
```

- To fix it, use a second form of `setState()` that accepts a **function rather than an object**.
- That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

```JAVASCRIPT
// Correct, arrow function
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

- We use an arrow function, but it also works with regular functions:

```JAVASCRIPT
// Correct, regular function
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### State Updates are Merged

- When you call `setState()`, React merges the object you provide into the current state.

- For example, your state may contain several independent variables:

```JAVASCRIPT
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  }
}
```

- Then you can update them independently with separate `setState()` calls:

```JAVASCRIPT
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    })
  })
}
```

- The merging is shallow, so `this.setState({comments})` leaves `this.state.posts` intact, but completely replaces `this.state.comments`.

### The Date Flows Down

- Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn't care whether it is defined as a function or a class.

- This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

- A component may choose to pass its state down as props to its child components:

```JAVASCRIPT
<FormattedDate date={this.state.date} />
```

- The `FormattedDate` component would receive teh `date` in its props and wouldn't know whether it came from the `Clock`'s state, form the `Clock`'s props, or typed by hand:

```JAVASCRIPT
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

- Check out the [CodePen](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

- This is commonly called a "top-down" or "unidirectional" data flow.
- Any state is always owned by some specific component, and any date or UI derived from that state can only affect components "below" them in the tree.

- If you imagine a component tree as a **waterfall of props**, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.

- To show that all components are truly isolated, we can create an `App` component that renders three `<Clock>`'s:

```JAVASCRIPT
function App() {
  return {
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  }
}
```

- Try on [CodePen](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

- Each `Clock` sets up its own timer and updates independently.

- In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time.
- You can use stateless components inside stateful components, and vice versa.

## Handling Events

- Handling events with react elements is very similar to handling events on DOM elements. There are some syntax differences:

  - React events are named using cameCase, rather than lowercase.
  - With JSX you pass a function as the event handler, rather than a string.

- For example, the HTML:

```HTML
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

- is slightly differ in React:

```JAVASCRIPT
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

- Another difference is that you cannot return `false` to prevent default behavior in React.
- You must call `preventDefault` explicitly.
- For example, with plain HTML, to prevent the default form behavior of submitting, you can write:

```HTML
<form onsubmit="console.log('You clicked submit'); return false">
  <button type="submit">Submit</button>
</form>
```

In React, this could instead be:

```JAVASCRIPT
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
```

- Here, `e` is a synthetic event. React defines these synthetic events according to the W3C spec, so you don't need to worry about cross-browser compatibility.
- React events do not work exactly the same as native events.See the [SyntheticEvent](https://reactjs.org/docs/events.html) reference guide to learn more.

- When using React, you generally **don't need to call** `addEventListener` to add listeners to a DOM element after it is created.
- Instead, just provide a listener when the element is initially rendered.

- When you define a component using an ES6 class, a common pattern is for an event handler to be a method on the class
- For example, this `Toggle` component renders a button that lets the user toggle between "ON" and "OFF" states:

```JAVASCRIPT
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make 'this' work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button conClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }


}
```

- See on [CodePen](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

- You have to be careful about the meaning of `this` in JSX callbacks.
- In JS, class methods are not [bound](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) by default.
- **If you forget to bind** `this.handleClick` and pass it to `onClick`, `this` will be `undefined` when the functionality is actually called.

- This is not React-specific behavior; it is part of [how functions work in JavaScript](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/).
- Generally, if you refer to a method without `()` after it, such as `onClick={this.handleClick}`, **you should bind that method.**

- If calling `bind` annoys you, there are two ways you can get around this.
- If you are using the experimental public class fields syntax, you can use class fields to correctly bind callbacks:

```JAVASCRIPT
class LoggingButton extends React.Component {
  // This syntax ensures 'this' is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click Me
      </button>
    );
  }
}
```

- This syntax is enabled by default in [Create React App](https://github.com/facebook/create-react-app).

- If you aren't using class fields syntax, you can sue an arrow function in the callback:

```JAVASCRIPT
class LoggingButton extends React.Component {

  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures 'this' is bound within the handleClick
    return (
      <button onClick={() => this.handleClick)}>
        Click Me
      </button>
    );
  }
}
```

- The problem with this syntax is that a different callback is created each time the `LoggingButton` renders.
- In most cases thi is fine. however, if this callback is passed as a prop to lower components, those components might do an extra re-rendering.
- We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.

## Passing Arguments to Event Handlers

- Inside a loop, it is common to want to pass an extra parameter to an event handler.
- For example, if `id` is the row ID, either of the following would work:

```JAVASCRIPT
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this.id)}>Delete Row</button>
```

- The above two lines are equivalent, and use arrow functions and Function.prototype.bind respectively.

- In both cases, the `e` argument representing the Rect event will be passed as a second argument after the ID.
- With an arrow function, we have to pass it explicitly, ut with bind any further arguments are automatically forwarded.

## Conditional Rendering

- In React, you can create distinct component that encapsulate behavior you need. Then you can render only some of them, depending on the state of your app.

- **Conditional rendering in React works the same way conditions work in JS.**
- Use JS operator like [if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) or the [conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to create elements representing the current state, and let React update the UI to match them.

- Consider these two components:

```JAVASCRIPT
function UserGreeting(props) {
  return (
    <h1>Welcome Back</h1>
  )
}

function GuestGreeting(props) {
  return (
    <h1>Please sign up.</h1>
  )
}
```

- We will create a `Greeting` component that displays either of these components depending on whether a user is logged in:

```JAVASCRIPT
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true};
  <Greeting isLoggedIn={false} />
  document.getElementById('root')
)
```

- Try on [CodePen](https://codepen.io/gaearon/pen/edbMaP?editors=0011)
- This example renders a different greeting depending on the value of `isLoggedIn` prop.

### Element Variables

- You can use variables to store elements. This can help you conditionally render a part fo the component while the rest of the output doesn't change.

- Consider these two new components representing Logout and Login buttons:

```JAVASCRIPT
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  )
}
```

- In the example below, we will create a [stateful component](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class) called `LoginControl`.

- It will render either `<LoginButton>` or `<LogoutButton />` depending on it's current state. It will also render a `<Greeting />` from teh previous example:

```JAVASCRIPT
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.renter(
  <LoginControl />,
  document.getElementById('root')
);
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/QKzrgB?editors=0010)

- While declaring a variable and using an `if` statement is a fine way to conditionally render a component, sometimes you might want to use a shorter syntax. There are a few ways to inline conditions in JSX, explained below.

### Inline If with Logical && Operator

- You may embed expression in JSX by wrapping them in curly braces.
This includes the JS logical `&&` [operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND). It can be hand for conditionally including an element:

```JAVASCRIPT
funciton Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: react', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root');
);
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

- It works because in JS, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`.

- Therefore, if the condition is `true`, the element right after `&&` will appear in the output. If it is `false`, React will skip it.

- Note that returning a falsy expression wil still cause the element after `&&` to be skipped but will return the falsy expression.
- In the example below, `<div>0</div>` will be returned by the render method.

```JAVASCRIPT
render() {
  const count = 0;
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}
    </div>
  )
}
```

### Inline If-Else with Conditional Operator

- Another method for conditionally rendering elements inline is to use the JS conditional operator [condition ? true : false](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

- In the example below, we use it to conditionally render a small block of text.

```JAVASCRIPT
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  )
}
```

It can also be used for larger expressions although it is less obvious what's going on:

```JAVASCRIPT
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  )
}
```

- Just like in JS, it is up to you to choose an appropriate style based on waht you and your team consider more readable.
- **Also remember that whenever conditions become too complex**, it might be a good time to [extract a component](https://reactjs.org/docs/components-and-props.html#extracting-components).

### Preventing Component from Rendering

- In rare cases yo might want a component to hide itself even though it was rendered by another component. To do this return `null` instead of it's render output.

- Example, the `WarningBanner />` is rendered depending on teh value of the prop called `warn`. If the value of the prop is `false`, then the component does not render:

```JAVASCRIPT
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner war={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />
  document.getElementById('root')
);
```

- Try on [CodePen](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

- Turning `null` from a components `render` method deos not affect the firing of the component's lifecycle methods. For instance `componentDidUpdate` will still be called.

## Lists and Keys

- First, let's review how you transform lists in JS.

- Given the code below, we use the [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function to take an array of `numbers` and double their values. We assign the new array returned by `map()` to the variable `doubled` and log it:

```JAVASCRIPT
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

- Ths code logs `[2, 4, 6, 8, 10]` to the console.
- In React, transforming arrays into lists of [elements](https://reactjs.org/docs/rendering-elements.html) is nearly identical.

### Rendering Multiple Components

- You can build collections of elements and include them in JSX using curly braces `{}`.

- Below, we loop through the `numbers` array using the JS `map()` function. We return a `<li>` for each item. Finaly, we assign the resulting array of elements to `listItems`

```JAVASCRIPT
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
  <li>{number}</li>
);
```

- Then, we can include the entire `listItems` array inside a `<ul>` element:

```JAVASCRIPT
<ul>{listItems}</ul>
```

- Try on [CodePen](https://codepen.io/gaearon/pen/GjPyQM?editors=0011)

- This code displays a bullet list of numbers between 1 and 5.

### Basic List Component

- Usually you would render lists inside a component.

- We can refactor the previous example into a component that accepts an array of `numbers` and outputs a list of elements.

```JAVASCRIPT
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NumberList numbers={numbers} />
);
```

- When you run this code, you will be given a warning that a key should be provided for list items.
- A "key" is a special string attribute you need to include when creating lists of elements. We will discuss why it's important int he next section.

- Let's assign a `key` to our list items inside `numbers.map()` and fix the missing key issue.

```JAVASCRIPT
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NumberList numbers={numbers} />
);
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/jMXYRR?editors=0011)

### Keys

- Keys help React identify which items have changed, are added, or are removed.
- Keys should be given to the elements inside the array to give the elements a stable identity:

```JAVASCRIPT
const numbers = [1, 2, 3, 4, 5];
const listITems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

- The best way to pick a key is to use a string that uniquely identifies a list item amoung its siblings. Most often you would use IDs from your data as keys:

```JAVASCRIPT
const todoItems = todos.map((todo) =>
 <li key={todo.id}>
   {todo.text}
 <li>
)
```

- When you don't have stable IDs for rendered items, you may use the item index as a key as a last resort:

```JAVASCRIPT
const todoItems = todos.map((todo, index) =>
// Ony do this if items have no stable IDs
 <li key={index}>
   {todo.text}
 <li>
)
```

- We don't recommend using indexes for keys if the order of items may change.
- This can negatively impact performance and may cause issues with component state.
- Check out Pokorny's article for an [in-depth explanation](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318) on the negative impact of using an index as a key.

- Also, an [in-depth explanation](https://reactjs.org/docs/reconciliation.html#recursing-on-children) about why keys are necessary if you are intersted in learning more.

### Extracting Components with Keys

- Keys only make sense in the context of the surrounding array.

- For example, if you extract a `ListItem` component, you should keep the key on the `<ListItem />` elements in the array rather than on the `<li>` element in the `ListItem` itself.

- Example: Incorrect Key Usage

```JAVASCRIPT
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong, There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong, the key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

- Example: Correct Key Usage

```JAVASCRIPT
function ListItem(props) {
  const value = props.value;
  return (
    // Correct, There is no need to specify the key here:
    <li>
      {props.value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct, Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

- **A good rule of thumb is that elements inside the `map()` call needs keys.**

## Keys Must Only Be Unique Among Siblings

- Keys used within arrays should be unique among their siblings. However, they don't need to be globally unique. We can use the same keys when we produce two different arrays:

```JAVASCRIPT
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.title}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
        <hr/>
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Blog posts={posts} />);
```

- Try on [CodePen](https://codepen.io/gaearon/pen/NReYGN?editors=0010)

- Keys serve as a hint to React but they dont' get passed to your components.
- If you need the same value in your component, pass it explicitly as a prop with a different name:

```JAVASCRIPT
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title}
  />
);
```

- With the example above, the `Post` component can read `props.id`, but not `props.key`.

### Embedding map() in JSX

- In the examples above we declared a separate `listItems` variable and included it in JSX:

```JAVASCRIPT
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
  <ListItem key={number.toString()}
            value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

- JSX allow [embedding any expression](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx) in curly braces so we could inline the `map()` result:

```JAVASCRIPT
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItems key={number.toString()} 
                   value={number} />
      )}
    </ul>
  );
}
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/BLvYMB?editors=0010)

- Sometimes this results in clearer code, but this style can also be abused.
- Like in JS, it is up to you to decide whether it is worth extracting a variable for readability.
- Keep in mind that if the `map()` body is too nested, it might be a good time to [extract a component](https://reactjs.org/docs/components-and-props.html#extracting-components).

## Forms

- HTML form elements work a bit differently from other DOM elements in React, because form elements naturally keep some internal state. For example, this form in plain HTL accepts a single name:

```JAVASCRIPT
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

- This form has the default HTML form behavior of browsing to a new page when the user submits the form.
- If you want this behavior in React, it just works.
- But in most cases, it's convenient to have a JS function that handles the submission of the form and has access to the data that the user entered into the form.
- The standard way to achieve this is with a technique called "controlled components".

### Controlled Components

- In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintin their own state and update it based on user input.
- In React, mutable state is typicaly kept in the state property of components, and only updated with [setState()](https://reactjs.org/docs/react-component.html#setstate).

- We can combine the two by making the React state be the "single source of truth". Then the React component that renders a form also controls what happens in that form on subsequent user input.
- An input form element whose value is controlled by React in this way is called a "controlled component.

- For example, if we want to make the previous example log the name when it is submitted, we can write the form as a controlled component:

```JAVASCRIPT
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

- Try it on [Code Pen](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

- Since the `value` attribute is set on our form element, teh displayed value will always be `this.staate.value`, making the React state the source of truth.
- Since `handleChange` runs on every keystroke to update the React state, the displayed value will update as the user types.

- With a controlled component, the input's value is always driven by the React state.
- While this mean you have to type a bit more code, you can now pass the value to other UI elements too, or reset it from other event handlers.

### The textarea Tag

- In HTML, a `<textarea>` element defines its text by tis children:

```HTML
<textarea>
  Hello there, this is the text area.
</textarea>
```

- In React, a `<textarea>` uses a `<value>` attribute instead. this way, a form using a `<textarea>` can be written very similarly to a form that uses a single line input:

```JAVASCRIPT
class EssayForm extends React.Component {
  constructor(props) {
    super(super);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event:target.value});
  }

  handleSUbmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

- Notice that `this.state.value` is initialized in the constructor, sot hat the text area starts off with some text in it.

### The select Tag

- In HTML, `<select>` creates a drop-down list. For example, this HTML creates a drop down list of flavors:

```HTML
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

- Note that the Coconut option is initially selected, because of the `selected` attribute.
- React, instead of using the `selected` attribute, uses a `value` attribute on the root `select` tag.
- This is more convenient in a controlled component because you only need to udpate it in one place. For example:

```JAVASCRIPT
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    render (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

- Overall, this makes it sot hat `<input type="text">`, `<textarea>`, and `<select>` all work very similarly = they all accept a `value` attribute tha tyou can use to implement a controlled component.

- NOTE: You can pass an array into the `value` attribute, allowing you to select multiple options in a `select` tag:

```JAVASCRIPT
  <select multiple={true} value={['B', 'C']}>
```

### The file input tag

- In HTML, an `<input type="file">` lets teh user choose one or more files from their device storage to be upladed to a server or manipulated by JS via the File API

```HTML
  <input type="file" />
```

- Because its value is read-only, it is an **uncontrolled** component in React. It is discussed together with other uncontrolled components [later in the docs](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag).

### Handling Multiple Inputs

- When you need to handle multiple controlled `input` elements, you can add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`.

- For example:

```JAVASCRIPT
class Reservation extends React.Components {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input 
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    )
  }
}
```

- Try on [CodePen](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

- Note hwo we used the [ES6 computed propert](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names)y name syntax to update the state key corresponding to the given input name:

```JAVASCRIPT
this.setState({
  [name]: value
});
```

- It is equivalent to this ES5 code:

```JAVASCRIPT
  var partialState = {};
  partialState[name] = value;
  this.setState(partialState);
```

- Also, since `setState()` automatically [merges a partial state into the current state](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged), we only needed to call it with the changed parts.

### Controlled Input Null Value

- Specifying the `value` prop on a controlled component prevents the user from changing the input unless you desire so.
- If you've specified a `value` but the input is still editable, you may have accidentally set `value` to `undefined` or `null`.

- The following code demonstrates this. (The inptu is locked at first but becomes editable after a short delay.)

```JAVASCRIPT
ReactDOM.createRoot(mountNode).render(<input value="hi" />);

setTimeout(function() {
  ReactDOM.createRoot(mountNode.render(<input value={null} />));
}, 1000);)
```

### Alternative to Controlled Components

- It can sometimes be tedious to use controlled components, because you need to write an event handler for every way your data can change and pipe all of the input state through a React component.
- This can become particularly annoying when you are converting a preexisting codebase to react, or integrating a react app with an on-React library.
- In these situations, you may want to check out [uncontrolled components](https://reactjs.org/docs/uncontrolled-components.html), an alternative technique for implementing input forms.

### Fully Fledged Solutions

- If you are looking for a complete solution including validation, keeping track of the visited fields, and handling for submission.
- [Formik](https://formik.org/) is one of the popular choices.
- However, it is built on teh same principles of controlled components and managing state.

## Lifting State Up

- Often, several components need to reflect teh same changing data.
- We recommend lifting the shared state up to their closest common ancestor.

- In this section, we create a temperature calculator that calculates whether the wather would boil at a given temp.

- We start with a component called `BuilingVerdict`.
- It accepts the `celsius` temp as a prop, and prints where it is enough to boil the water:

```JAVASCRIPT
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

- Next, we will create a component called `Calculator`. It renders an `<input>` that lets you enter the temperature, and keeps its value in `this.state.temperature`.

- Additionally, it renders the `BoilingVerdict` for the current input value.

```JAVASCRIPT
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      temperature: ''
    };
  }

    handleChange(e) {
      this.setState({temperature: e.target.value});
    }

    render() {
      const temperature = this.state.temperature;
      return (
        <fieldset>
          <legend>Ender temperature in Celsius:</legend>
          <input 
            value={temperature}
            onChange={this.handleChange}
          />
          <BoilingVerdict 
            celsius={parseFloat(temperature)} />
        </fieldset>
      );
    }
}
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

### Adding a Second Input

- Out new requirement is that, in addition to a Celsius input, we provide a Fahrenheit input, and they are kept in sync.

- We can start by extracting a `TemperatureInput` component from `Calculator`. We will add a new `scale` prop to it that can either be `"c"` or `"f"`.

```JAVASCRIPT
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      temperature: ''
    };
  }

    handleChange(e) {
      this.setState({temperature: e.target.value});
    }

    render() {
      const temperature = this.state.temperature;
      const scale = this.props.scale;

      return (
        <fieldset>
          <legend>Ender temperature in {scaleNames[scale]}:</legend>
          <input 
            value={temperature}
            onChange={this.handleChange}
          />
          <BoilingVerdict 
            celsius={parseFloat(temperature)} />
        </fieldset>
      );
    }
}
```

- We can now change the `Calculator` to render two separate temperature inputs:

```JAVASCRIPT
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    )
  }
}
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

- We have two inputs now, but when you ender the temperature in one of them, the other doesn't update. this contradicts oru requirement: we want to keep them in sync.

- We also can't display the `BoilingVerdict` from `Calculator`.
- The `Calculator` doesn't know the current temperature because it is hidden inside the `TemperatureInput`.

### Writing Conversion Functions

- First, we will write two function to convert the Celsius to Fahrenheit and back:

```JAVASCRIPT
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFehrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

- Thees two functions convert numbers. We wil write another funciton that takes a string `temperature` and a converter function as arguments and returns a string.
- We will use it to calculate the value of one input base don the other input.

- It returns an empty string on an invalid `temperature`, and it keeps th eoutput rounded to the third decimal place:

```JAVASCRIPT
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

- For example, `tryConvert('abc', toCelsius)` returns an empty string and `tryConvert('10.22', toFahrenheit)` returns `'50.396'`.

### Lifting State Up - Temperature

- Currently, both `temperatureInput` components independently keep their values in the local state:

```JAVASCRIPT
class TemperatureInput extends Rect.Components {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
  }
}
```

- Hoever, we want these two inputs to be in sync with each other.
- When we update the Celsius input, the Fahrenheit input should reflect the converted temperature, and vice versa.

- In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it.
- This is called **lifting state up**.
- We will remove the local state from the `TemperatureInput` and move it into the `Calculator` instead.

- If the `Calculator` owns the shared state, it becomes the "source of truth" for the current temperature inboth inputs.
- It can instruct them both to have values that are consistent with each other.
- Since the props of both `TemperatureInput` components are coming from the same parent `Calculator` component, the two inputs will always be in sync.

- Let's see how this works steps by step.

- First, we replace `this.state.temperature` with `this.props.temperature` in the `temperatureInput component.
- For now, let's pretend `this.props.temperature` already exists, although we will need to pass it from the `Calculator` in the future:

```JAVASCRIPT
render() {
  // Before: const temperature = this.state.temperature;
  const temperature = this.props.temperature;
}
```

- We know that props are ready only. When the `temperature` was in the local state, the `TemperatureInput` could just call `this.setState()` to change it.
- However, now that the `temperature` is coming from the parent as a prop, the `TemperatureInput` has no control over it.

- In React, this is usually solved by making a component "controlled".
- Just like the DOM `<input` accepts both a `value` and an `onChange` prop, so can the custom `TemperatureInput` accept both `temperature` and `onTemperatureChange` props from it's parent `Calculator`.

- Now, when the `TemperatureInput` want sto update its termperature, it calls `this.props.onTemperatureChange`:

```JAVASCRIPT
handleChange(e) {
  //Before: this.setState({temperature: e.target.value});
  this.props.onTemperatureChange(e.target.value);
}
```

- NOTE: There is not special meaning to either `temperature` or `onTemperatureChange` prop names in custom components. We could have called them anything else, like name them `value` and `onChange` which is a common convention.

- The `onTemperatureChange` prop will be provided together with the `temperature` prop by the parent `Calculator` component.
- It will handle the change by modifying its own local state, thus re-rendering both inputs with teh new values.
- We will look at the new `Calculator` implementation soon.

- Before diving into the changes int eh `Calculator`, let's recap our changes to the `TemperatureInput` component.
- We have removed the local state from it, and instead of reading `this.state.temperature`, we now read `this.props.temperature`.
- Instead of calling `this.setState()` when we want to make a change, we now call `this.props.onTemperatureChange()`, which will be provided by the `Calculator`:

```JAVASCRIPT
class TemperatureInput extends Rect.Components {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>
          Enter temperature in {scaleNames[scale]};
        </legend>
        <input value={temperature} 
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}
```

- Now let's turn to the `Calculator` component.

- We will store the current input's `temperature` and `scale` in its local state.
- This is the state we "lifted up" from the inputs, and it will serve as the "source of truth" for both of them.
- It is the minimal representation of all the date we need to know in order to render both inputs.

- For example, if we enter 37 into the Celius input, the state of the `Calculator` component will be:

```JAVASCRIPT
{
  temperature: '37',
  scale: 'c'
}
```

- If e later edit the Fahrenheit field to be 212, teh state of the `Calculator` will be:

```JAVASCRIPT
{
  temperature: '37',
  scale: 'c'
}
```

- We could have store dthe value of both inputs but it turns otu the be unnecesary.
- It is enough to store the value fo themost recently changed input, and teh scale that it represents.
- We can then infer the value of the other input based on the current `temperature` and `scale` alone.

- The inputs stay in sync because their values are computer from the same state:

```JAVASCRIPT
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
       <TemperatureInput 
         scale="c"
         temperature={celsius}
         onTemperatureChange={this.handleCelsiusChange} 
       />
       <TemperatureInput 
         scale="f"
         temperature={fahrenheit}
         onTemperatureChange={this.handleFahrenheitChange} 
       />
       <BoilingVerdict 
         celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

- No matter which inptut you edit, `this.state.temperature` and `this.state.scale` in the `Calculator` get updated.
- One of the inputs gets the value as is, so any user input is preserved, and the other input value is always recalculated based on it.

- Let's recap what happens when you edit an input:

  - React calls the function specified as `onChange` on the DOM `<input>`. in our case, this is the `handleChange` method in the `temperatureInput` component.
  - The `handleChange` method in the `TemperatureInput` component calls `this.props.onTemperatureChange()` with the new desired value. Its props, including `onTemperatureChange`, were provided by its parent component, the `Calculator`
  - When it previously rendered, the `Calculator` had specified that `onTemperatureChange` of the Celsius `TemperatureInput` is the `Calculator`'s `handleCelsiusChange` method, and `onTemperatureChange` of the of the Fahrenheit `TemperatureInput` is the `Calculator`'s `handleFahrenheitChange` method.
  - So either of these two `Calculator` methods gets called depending on which input we edited.
  - Inside these methods, the `Calculator` cmoponent asks React to re-render itself by calling `this.setState()` with the new input value and the current scale of the input we just edited.
  - React calls the `Calculator` component's `render` method to learn what the UI should look like. teh values of both inputs are recomputed based on the current temperature and teh active scale. The temperature conversion is performed here.
  - React calls the `render` method of the `BoilingVerdict` component, passing the temperature in Celsius as its props.
  - React DOM updates the DOM with teh boiling verdict and to match teh desired input values. The input we just edited receives its current value, and teh other inptu is updated to the temperature after conversion.

- Every update goes through the same steps so the inputs stay in sync.

### Lessons Learned

- There should be a single "source of truth" for any data that changes in a React application.
- Usually the state is the first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor.
- Instead of trying to sync the state between different components, you should rely on the [top-down data flow](https://reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down).
- Lifting state involves writng more "boilerplate" code than two-way binding approaches, but as a benefit, it takes less wrok to find and isolate bugs.
- Since any state "lives" in some component and that component alone can change it, the surface area for bugs is greatly reduced.
- Additionally, you can implement any custom logic to reject or transform user input.

- If something can be derived from either props or state, it probably shouldn't be in the state.
- For example, instead of storing both `celsiusValue` and `fahrenheitValue`, we store jsut the last edited `temperature` and its `scale`.
- The value of the other input can always be calculated from them int he `render()` method.
- This lets us clear or apply rounding to the other field without losing any precision in teh user input.

- When you see something wrong in teh UI, you can use [React Dev Tools](https://github.com/facebook/react/tree/main/packages/react-devtools) to inspect the props and move up the tree until you find the component responsible for updating the state.
- This lets you trace teh bugs to their source.

## Composition vs Inheritance

- React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

- In this section, we will consider a few problems where developers new to React often reach for inheritance, and show show we can solve them in composition.

### Containment

- Some components don't know their children ahead of time. This is especially common for components like `Sidebar` or `Dialog` that represent generic "boxes".

- We recommend that such components use the special `children` prop to pass children elements directly to their output:

```JAVASCRIPT
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

- This lets other components pass arbitrary children to them by nesting the JSX:

```JAVASCRIPT
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting oru spacecraft!
      </p>
    </FancyBorder>
  )
}
```

- Try it on [CodePen](https://reactjs.org/docs/composition-vs-inheritance.html)

- Anything inside the `<FancyBorder>` JSX tag get passed into a `FancyBorder` component as a `children` props.
- Since `FancyBorder` renders `{props.children}` inside a `<div>, the passed elements appear in the final output.

- While this is less common, sometimes you might need multiple "holes" in a component. In such cases you may come up with your own convention instead of using `children`:

```JAVASCRIPT
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane 
      left={<Contacts />}
      right={<Chat />}
    />
  );
}
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/gweOJp?editors=0010)

- React elements like `<Contacts />` and `<Chat />` are just objects, so you can pass them as props like any other data.
- This approach may remind you of "slots" in other libraries but there are no limitations on what you can pass as props in React.

### Specialization

- Sometimes we think about components as being "special cases" of other components. For example, we might say that a `WelcomeDialog` is a special case of `Dialog`.

- In React, this is also achieved by composition, where a more "specific" component renders a more "generic" on and configures it with props:

```JAVASCRIPT
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog 
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
    />
  );
}
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/ZpxEgr?editors=0010)

- Composition works equally well for components defined as classes:

```JAVASCRIPT
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

render() {
  return (
    <Dialog title="Mars Exploration Program"
            message="How shoudl we refer to you?">
      <input value={this.state.login} 
             onChange={this.handleChange} />
      <button onClick={this.handleSignUp}>
        Sign Me Up!
      </button>
    </Dialog>
  );
}

handleChange(e) {
  this.setState({login: e.target.value});
}

handleSignUp() {
  alert(`Welcome aboard, ${this.state.login}!`);
}

}
```

- Try it on [CodePen](https://codepen.io/gaearon/pen/gwebYa?editors=0010)

### So what about Inheritance?

- At Facebook, we use React in thousand of components, and we havne't found any use cases where we would recommend creating component inheritance hierarchies.

- Props and composition give you al teh flexibility you need to customize a components look and behavior in an explicit and safe way.
- Remember that components may accept arbitrary props, including primitive values, React elements or functions.

- If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JS module.
- The components may import it and use that function, object, or class, without extending it.

## Thinking in React

- One of the many great parts of React is how it makes you think about apps as you build them. In this section, will walk you through the thought process of building a searchable product data table using React.

### Start with a Mock

- Imagine you already have a JSON API and a mock from our designer. [The mock looks like this](https://reactjs.org/docs/thinking-in-react.html#start-with-a-mock):

- Our JSON API returns some data that looks like this:

```JAVASCRIPT
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

### Step 1: Break the UI into a component hierarchy

- The first thing you will want to do is to draw boxes around every component (and sub-component) in the mock and give them all names.
- If you are working with a designer, they may have already done this, so go talk to them!
- Their Photoshop, Figma or Sketch layer names may end up being the names of your Rect components!

- But how do you know what should be its own component?
- use the same techniques for deciding if you should create a new function or object.
- One such technique is the [single responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle), that is, a component should ideally only do one thing.
- If it ends up growing, it should be decomposed into smaller sub-components.

- Since you're often displaying a JSON data model to a use, you will find that if your model was built correctly, your UI (and therefore your component structure) will map nicely.
- That's because the UI and data models tend to adhere to the same information architecture.
- Separate your UI into components, where each component matches one piece of your data model.

- You'l see here that we have five components in our app. We've italicized the data each component represents. The [numbers in the image](https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy) correspond to the numbers below.

1. FilterableProductTable (orange): contains the entirely of the example
2. SearchBar (blue): receives all *user input*
3. ProductTable (green): displays and filters the *data collection* based on *user input*
4. ProductCategoryRow (turquoise): displays a heading for each *category*
5. ProductRow (red): displays a row for each *product*

- If you look at `ProductTable` you will see taht the table header (containing the "Name" and "Price" labels) isn't its own component.
- This is a matter of preference, and there's an argument to be made eitehr way.
- For this example, we left it as part of `ProductTable` because it is part fo rendering teh date collection which is `ProductTable`'s responsibility.
- Hoever, if this header grows to be complex (if we were to add affordances for sorting), it would certainly make sense to make this its own `ProductTableHeader` component.

- Now that we have identified the components in our mock, let's arrange them into a heirarchy.
- `FitlerableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`

### Step 2: Build a static version in React

```JAVASCRIPT
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name : 
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
   );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lasCategory = null;

    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} 
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {''}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<FilterableProductTable products={PRODUCTS} />);
```

- View on [CodePen](https://codepen.io/gaearon/pen/BwWzwm)

- Now that you have your component hierarchy, it's time to implement your app.
- The easiest way to build a verion that takes your data model and renders teh UI but has no interactivity.
- It's best to decouple these processes because building a static version requires a lot of typing and not thinking, and adding interactivity requires a lot of thinking and not a lot of typing. We'll see why.

- To build a static version fo your app that renders your data model, you'll want to buidl components that reuse other components and pass data using *props*.
- *props* are a way of passing data from parent to child.
- If you're familiar with the concept of sate, **don't use state at all** to build this static version
- State is reserved only for interactivity, that is, data that changes over time.
- Since this is a static version of the app, you don't need it.

- You can build top-down or bottom-up.
- hat is, you can either start with building the components higher up in the hierarchy (starting wtih (`FilterableProductTable`) or with the ones lower in it (`ProductRow`).
- In simper examples, it's usually easier to go top-down, and on larger projects, it's easier to go bottom up and write tests as you build.

- At the end of this steop, you'll have a library of reusable components that render your data model.
- The components will only have `render()` methods since this is a static version of your app.
- The component at the top of the hierarchy (`FitlerableProductTable`) will take your date model as a prop.
- If you make a change to your underlying data model and call `rootrender()` agian, the UI will be updated.
- You can see how your UI is updated and where to make changes.
- React's one way data flow (also called one-way binding) keeps everything modular and fast.

Refer to the [React docs](https://reactjs.org/docs/getting-started.html) if you need help executing this step.

### A brief interlude: Props vs State

- There are two types of "model" data in Rect: props and state.
- It's important to understand the distinction between the two;
- Refer to the [official React docs](https://reactjs.org/docs/state-and-lifecycle.html) if you are not sure wat the difference is.
- See also FAQ: [what is the difference between state and props?](https://reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props)

## Step 3: Identify the Minimal (but complete) Representation of UI State

- To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with state.

- To build your app correctly, you first need to think of the minimal set of mutable state that your app needs.
- The key here is DRY: [Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).
- Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand.
- For example, if you are building a TODO list, keep an array of teh TODO items around, don't keep a separate state variable for the count.
- Instead, when you want to render the TOD count, take the length of the TODO items array.

- Think of all pieces of data in our example application. We have:
  - The original list of products
  - The search text the user has entered
  - The value of the checkbox
  - The filtered list of products

- Let's go through each one and figure out which one is state. Ask three questions about each piece of data:

1. Is it passed in from a parent via props? If so, it probably isn't state.
2. Does it remain unchanged over time? If so, it probably isn't state.
3. Can you compute it based on any other state or props in your component? If so, it isn't state.

- The original list of products is passed in as props, so that's not state.
- The search text and the checkbox seem to be state since they change over time and can't be computed from anything.
- And finally, the filtered list of products isn't state because it can be computed by combining the original list of products with the search text and value of the checkbox.

- So finally, our state is:
  - The search text teh user has entered
  - The value of the checkbox

## Step 4: Identify where your state should live

- OK, so we've identified what the minimal set of app state is.
- Next, we need to identify which component mutates, or owns, this state.

- Remember, React is all about one-way data flow down teh component hierarchy.
- It may not be immediately clear which component should own what state.
- **This is often the most challenging part for newcomers to understand.**
- So follow these steps to figure it out:

- For each piece of state in your application:
  - Identify every component that renders something based on that state.
  - Find a common owner component (a single component above all the components that need the state in the hierarchy).
  - Either the common owner of another component higher up in the hierarchy should own the state.
  - If you can't find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

- Let's run through this strategy for our application:
  - `ProductTable` need to filter the product list based on state and `SearchBar` needs to display the search text adn checked state.
  - The common owner component is `FitlerableTable`.
  - It conceptually makes sense for the filter text and checked value to live in `FilterableProductTable`

- Cool, so we have decided that our state lives in `FilterableProductTable`.
- First, add an instance property `this.state = {filterText: '', inStockOnly: false}` to `FilterProductTable`'s `constructor` to reflect the initial state of your application.
- Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as a prop.
- Finally, use these props to filter the rows in `ProductTable` and set the values of the form fields in `SearchBar`.

- You can start to seeing how your application wil behave: set `filterText` to `"ball"` and refresh your app. You'll see the date table is updated correctly.

## Step 5: Add Inverse Data Flow

- So far, we'v built an app that renders correctly as a function of props and state flowing down the hierarchy.
- Now its' time to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

- React makes this data flow explicit to help you understand how your programs works, but it does require a little more typing than a traditional two way data binding.

- If you try to type of check the box in the previous version of the example (step 4), you'll see that React ignores your input.
- This is intentional, as we've st ehte `value` prop of the `input` to always eb equal to teh `state` passed in from `FilterableProductTable`.

- Let's think about what we want to happen.
- We want to make sure that whenever the user changes the form, we update the state to reflect teh user input.
- Since components should only update their own state, `FileterableProductTable` will pass callbacks to `SearchBar` that will fire whenever the state should eb updated.
- We can use the `onChange` event on the input to be notified fo it.
- The callbacks passed by `FilterableProductTable` will call `setState()`, adn teh app will eb updated.

## And That's it

- Hopefully, this give you an idea of how to think about building components and applications with React.
- While it may be a little more typing that you're used to, remember that code is read far more than it's written, and it's less difficult to read this modular, explicit code.
- As you start to build large libraries of components, you'll appreciate this explicitness and modularity, and with code reuse, your lines of code will start to shrink :)

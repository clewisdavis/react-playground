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

-

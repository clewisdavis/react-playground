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

-

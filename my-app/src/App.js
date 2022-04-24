import logo from './logo.svg';
import './App.css';

function Welcome(props) {
  return <h1>Hello, my name is {props.name}</h1>;
}

function buttonPress() {
  console.log('button pressed');
  alert('Chris here');
}

function UserGreeting(props) {
  return (
    <h2>Welcome Back!</h2>
  )
}

function App() {
  return (
    <div className="App">
      <Welcome name="Chris" />
      <UserGreeting />
      <p>This is a description</p>
      <button onClick={buttonPress}>
        Press Me
      </button>
    </div>
  );
}

export default App;

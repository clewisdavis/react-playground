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
    <h2>Welcome Back! {props.userName}</h2>
  )
}

function GuestGreeting(props) {
  return (
    <h2>Please sign up.</h2>
  )
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  const userName = props.userName;
  if (isLoggedIn) {
    return <UserGreeting userName={userName} />;
  }
  return <GuestGreeting />
}

function App() {
  return (
    <div className="App">
      <Welcome name="Ralph" />
      <Greeting isLoggedIn={true} userName="Chris"/>
      <p>This is a description</p>
      <button onClick={buttonPress}>
        Press Me
      </button>
    </div>
  );
}

export default App;

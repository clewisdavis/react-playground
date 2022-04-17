import logo from './logo.svg';
import './App.css';

function Welcome(props) {
  return <h1>Hello, my name is {props.name}</h1>;
}

function App() {
  return (
    <div className="App">
    <Welcome name="Chris" />
    <Welcome name="Oatie" />
    </div>
  );
}

export default App;

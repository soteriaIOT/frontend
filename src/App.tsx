import logo from "./assets/logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="splash">
        <img src={logo}></img>
        <button className="authButton" type="button">
          Log In
        </button>
      </div>
      {/* <div className="buttonWrapper">
      </div> */}
    </div>
  );
}

export default App;

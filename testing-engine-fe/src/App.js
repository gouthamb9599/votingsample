import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from './pages/login_signup/signup/signup'
import Login from './pages/login_signup/login/login'

function App() {
  return (
    <div className="App">
      <Router >
        <Switch>
          <Route path="/" exact component={Login} />
          {/* <Route path="/Homepage" component={Homepage} /> */}
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

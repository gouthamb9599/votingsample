import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Homepage from './pages/homepage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Login} ></Route>
            <Route path='/home' component={Homepage} ></Route>
            <Route path='/signup' component={Signup}></Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;

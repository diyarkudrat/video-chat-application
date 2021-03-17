import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:8000";
const socket = io(ENDPOINT);


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

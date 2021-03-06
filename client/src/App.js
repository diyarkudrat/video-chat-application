import React, { Fragment } from 'react';
import './App.scss';
import Home from './components/Home';
import Display from './components/Display';
import Chat from './components/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:8000";
const socket = io(ENDPOINT);


function MainChat(props) {
  return (
    <Fragment>
      <div className="right">
        <Chat 
          username={props.match.params.username} 
          room={props.match.params.room} 
          socket={socket} 
        />
      </div>
      <div className="left">
        <Display />
      </div>
    </Fragment>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
          <Route
            path='/chat/:room/:username'
            component={MainChat}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

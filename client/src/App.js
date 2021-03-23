import React, { Fragment } from 'react';
import './App.css';
import Home from './components/Home';
import Chat from './components/Chat';
import Video from './components/Video';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:8000";
const socket = io(ENDPOINT);


function MainChat(props) {
  return (
    <Fragment>
      <div className="right">
        <Chat 
          userId={props.match.params.userId}
          username={props.match.params.username} 
          room={props.match.params.room} 
          socket={socket} 
        />
      </div>
      <div className="left">
        {/* <Video 
          username={props.match.params.username} 
          room={props.match.params.room} 
          socket={socket}
        /> */}
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

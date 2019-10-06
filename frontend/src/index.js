import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import * as serviceWorker from './serviceWorker';

import HomePage from './pages/Home';
import LobbyPage from './pages/Lobby';
import LobbiesPage from './pages/Lobbies';

ReactDOM.render(

  <BrowserRouter>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/lobbies" component={LobbiesPage} />
    <Route path="/lobbies/:id" component={LobbyPage} />
  </BrowserRouter>,

  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

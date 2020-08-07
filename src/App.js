import React from 'react';
import {Route, Switch } from "react-router-dom";
import Landing from './Landing';
import User from './User';
import './App.css';

function App() {
  return (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/user/:id' component={User} />
    </Switch>
  );
}

export default App;

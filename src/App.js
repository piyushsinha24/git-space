import React from 'react';
import {Route, Switch } from "react-router-dom";
import Landing from './Landing';
import User from './User';
import './App.css';

function App() {
  return (
    <Switch>
        <Route exact path='/' exact component={Landing} />
        <Route exact path='/user/:id' render={(props)=>(<User {...props}/>)} />
    </Switch>
  );
}

export default App;

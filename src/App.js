import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect} from "react-router-dom";
import logo from './logo.svg';
import Collection from "./components/Collection";
import Search from "./components/Search";
import './App.css';

function App() {
  return (
  <div id='root'>
   <Router>
    <Route exact path="/" component = {Search} /> 
    <Route exact path="/" component = {Collection} /> 
   </Router>
  </div>
  );
}

export default App;

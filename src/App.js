import React from 'react';
import './App.css';
import AppBar from "./components/AppBar";
import { Route } from 'react-router';
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  return (
    <div className="App">
      <AppBar />

      <Route exact path = "/" component = {Projects} />
      <Route path = "/:id" component = {ProjectDetails} />
    </div>
  );
}

export default App;

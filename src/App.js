import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom"
import logo from './logo.svg';



//import files for router
import NavBar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <div>
       <header className="App-header">
        <img style={{width: '100%', height: '400px', objectFit: "cover"}} src={"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"} />
      </header>
    <Router>
      <div className="container">
        <NavBar></NavBar>
        <br/>
        <Route path="/" exact component={ExercisesList}/>
        <Route path="/edit/:id"  component={EditExercise}/>
        <Route path="/create" exact component={CreateExercise}/>
        <Route path="/user" exact component={CreateUser}/> 
      </div>
    </Router>
    </div>
  );
}

export default App;

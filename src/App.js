
   
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExerciseList from "./components/exercise_list.component";
import EditExercise from "./components/edit_exercise.component";
import CreateExercise from "./components/create_exercise.component";
import CreateUser from "./components/create_user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" exact element={<ExerciseList/>}/>
          <Route path="/edit/:id" element={<EditExercise/>}/>
          <Route path="/create" element={<CreateExercise/>}/>
          <Route path="/user" element={<CreateUser/>}/> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

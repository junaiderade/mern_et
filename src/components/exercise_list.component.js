import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Exercise = props =>( //this is a functional react component (using arrow func), there are no state and lifecyle methods
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
        <Link to={"/edit/"+props.exercise._id//route is in app.js
        } 
        >
        edit</Link> | 
        <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

export default class ExerciseList extends Component{ //this is a class component
    constructor(props){
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                this.setState({exercises: res.data});
            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log("Error-components/exercise_list:" + err);
            })

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)//after we delete from db, we also need to delete from what is being displayed to user
            //_id is what is in mongo db database!
        });
    }

    exerciseList(){
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} 
            deleteExercise={this.deleteExercise} key={currentexercise._id}/>
        })
    }

    render(){
        return(
            <div>
                <h1>Logged Exercises</h1>
                <table className = 'table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()//returns rows of table
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
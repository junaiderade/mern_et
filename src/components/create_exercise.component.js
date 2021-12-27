import React, {Component, useReducer} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component{
 
    constructor(props){ 
        super(props);//in js classes, you need to always call super when defining the constructor of a subclass

        //we bind "this" to each method so that the word this will be refering to the right thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {//how you create class variables in react
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    //this isa react lifecycle method and will automatically be called right before anything displays on the page
    componentDidMount(){
        axios.get('http://localhost:5000/users')
            .then(res => {
                if(res.data.length>0){
                    this.setState({
                        users: res.data.map(user => user.username),//for every user in the array you get the username
                        username: res.data[0].username //starting value
                    })
                }
            })
            .catch((err) =>
            {
                console.log(err);
            })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value//this function ONLY updates the username element
        })
    }


    onChangeDescription(e){
        this.setState({
            description: e.target.value//this function ONLY updates the username element
        })
    }


    onChangeDuration(e){
        this.setState({
            duration: e.target.value//this function ONLY updates the username element
        })
    }


    onChangeDate(date){//will come from a calendar on screen
        this.setState({
            date: date//this function ONLY updates the username element
        })
    }

    onSubmit(e){
        e.preventDefault();//this will prevent default html form submit behavior from taking place
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercises/add',exercise)
            .then(res => console.log(res.data))//shows exercise added

        //window.location = '/'//take person back to our homepage aka list of exercises
    }

    render(){
        return(
            <div>
                <h1>Create New Exercise Log</h1>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className='form-control'
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user){//we get the options right from our users array
                                        return <option key={user} value={user}>
                                            {user}
                                        </option>
                                    })
                                }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input type = "text" required className='form-control'
                        value={this.state.description} onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Duration (minutes): </label>
                        <input type = "text" required className='form-control'
                        value={this.state.duration} onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} 
                            onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <input type = "submit" value="Create Exercise Log" className='btn btn-primary'/>
                    </div>
                </form>
                <p>You are on the Create Exercise component!</p>
            </div>
        )
    }
}
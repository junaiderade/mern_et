import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component{
    constructor(props){ 
        super(props);//in js classes, you need to always call super when defining the constructor of a subclass

        //we bind "this" to each method so that the word this will be refering to the right thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {//how you create class variables in react
            username: ''
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value//this function ONLY updates the username element
        })
    }

    onSubmit(e){
        e.preventDefault();//this will prevent default html form submit behavior from taking place
        const user = {
            username: this.state.username,
        }

        //send user data to backend
        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data))//shows user added

        this.setState({
            username:''
        })
    }

    render(){
        return(
            <div>
                <h1>Create New User</h1>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <input type="text" required className='form-control' value={this.state.username} onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className='form-group'>
                        <input type="submit" value = 'Create User' className = "btn btn-primary"/>
                    </div>
                </form>
        
                <p>You are on the Create User component!</p>
            </div>
        )
    }
}
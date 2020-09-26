import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import React, { Component } from 'react';
import token from '../../Helpers/token';
// import { 
//     BrowserRouter as Router, 
//     Route,
//     Link
// } from 'react-router-dom'
const defaultState = {
    id: token().id,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    suburb: '',
    postcode: ''
};

class AccountMan extends Component {
    constructor(props) {
        super(props);
        this.state = {...defaultState, password: ''}
    }

    componentDidMount(){
        Axios.get('/api/users/' + this.state.id)
            .then(res => {
                this.setState({ ...res.data});
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    onChangeFirstName = e =>{
        this.setState({
            firstName : e.target.value
        })
    }
    onChangeLastName = e =>{
        this.setState({
            lastName : e.target.value
        })
    }
    onChangeEmail = e =>{
        this.setState({
            email : e.target.value
        })
    }
    onChangePhoneNumber = e =>{
        this.setState({
            phoneNumber : e.target.value
        })
    }
    onChangeSuburb = e =>{
        this.setState({
            suburb : e.target.value
        })
    }
    onChangePostcode = e =>{
        this.setState({
            postcode : e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const updateUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            suburb: this.state.suburb,
            postcode: this.state.postcode
        }

        console.log(updateUser);
        Axios.put('/api/users/' + this.state.id, updateUser)
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error.message);
            })
    }
    
    onSubmit2 = e => {
        e.preventDefault();
        
        const deleteUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            suburb: this.state.suburb,
            postcode: this.state.postcode
        }
        
        console.log(deleteUser);
        Axios.delete('/api/users/' + this.state.id, deleteUser)
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    render(){
        return(
            <div className="updatingUser">
                <h1>Edit User Details</h1>
                <h1>{this.state.id}</h1>
                <form onSubmit={this.onSubmit}>
                    <TextField required id="firstName" label="firstName" value={this.state.firstName} onChange={this.onChangeFirstName}/>
                    <TextField required id="lastName" label="lastName" value={this.state.lastName} onChange={this.onChangeLastName}/>
                    <TextField required id="email" label="email" value={this.state.email} onChange={this.onChangeEmail}/>
                    <TextField required id="phoneNumber" label="phoneNumber" value={this.state.phoneNumber} onChange={this.onChangePhoneNumber}/>
                    <TextField required id="suburb" label="suburb" value={this.state.suburb} onChange={this.onChangeSuburb}/>
                    <TextField required id="postcode" label="postcode" value={this.state.postcode} onChange={this.onChangePostcode}/>
                    <div className="form-submit">
                        <input type="submit" value="Update User Details" />
                    </div>
                </form>
                <form onSubmit2={this.onSubmit2}>
                    <div className="form-submit">
                        <input type="submit" value="Delete User" />
                    </div>
                </form>
            </div>
        )
    }

}

export default AccountMan;
//delete button
//styling
//password change confirm old password change current password
//make perty
//report
//commenting
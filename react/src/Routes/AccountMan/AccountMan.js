import { Box, Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import React, { Component } from 'react';
import token from '../../Helpers/token';
import bcrypt from 'bcryptjs'
// import { 
//     BrowserRouter as Router, 
//     Route,
//     Link
// } from 'react-router-dom'
const defaultState = {
    id: '', //token().id Need to figure out way to remove this
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    suburb: '',
    postcode: '',
    errors: {},
    password: '',
    currentPassword: '',
    newPassword: '',
    newPassword2: ''
    
};

class AccountMan extends Component {
    constructor(props) {
        super(props);
        this.state = {...defaultState, id: token().id}//password: ''
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
    onChangeCurrentPassword = e =>{
        this.setState({
            currentPassword : e.target.value
        })
    }
    onChangeNewPassword = e =>{
        this.setState({
            newPassword : e.target.value
        })
    }
    onChangeNewPassword2 = e =>{
        this.setState({
            newPassword2 : e.target.value
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

        if(this.handleValidation()){
            alert("Form Submitted")
        } else {
            alert("Form has errors")
            return(0)
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
    
    onSubmitDelete = e => {
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
    
    onSubmitPassword = e => {
        e.preventDefault();

        let errors = {};
        let formIsValid = true;
        const checkPass = bcrypt.compareSync(this.state.currentPassword, this.state.password);
        if (!checkPass){
            errors["password"] = "Incorrect Password";
            formIsValid = false;
        }

        if(this.state.newPassword!=this.state.newPassword2){
            errors["passwords"] = "Passwords do not match";
            formIsValid = false;
        }
        this.setState({errors: errors});
        if(formIsValid == false){
            return(0)
        }
        const salt = bcrypt.genSaltSync(parseInt(process.env.PASS_SALT_ROUNDS));
        const hash = bcrypt.hashSync(this.state.newPassword, salt);
        this.setState({password: hash}, ()=> {
            const passes = {
                password: this.state.password
            }
            Axios.put('/api/users/' + this.state.id, passes)
            .then(res => {
                alert("Password Changed")
            })
            .catch((error) => {
                console.log(error.message);
            })
        });

        


    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        //first name validation
        if(!(this.state.firstName.match(/^[a-zA-Z]+$/))){
            formIsValid=false;
            errors["firstName"] = "Only Letters";
        }
        //lastName validation
        if(!(this.state.lastName.match(/^[a-zA-Z]+$/))){
             formIsValid=false;
             errors["lastName"] = "Only Letters";
        }
        //email validation
        //digust need change and fix
        if(!(this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))){
            formIsValid=false;
            errors["email"] = "Email is not valid";
       }
        //phoneNumber validation
        if(!((this.state.phoneNumber.match(/^[0-9]+$/)) && this.state.phoneNumber.length == 10)){
            formIsValid=false;
            errors["phoneNumber"] = "Only Numbers";
        }
        //suburb
        if(!(this.state.suburb.match(/^[0-9a-zA-Z\s]+$/))){
            formIsValid=false;
            errors["suburb"] = "No Special Characters";
       }
        //postcode validation
        if(!((this.state.postcode.match(/^[0-9]+$/)) && this.state.postcode.length == 4)){
            formIsValid=false;
            errors["postcode"] = "Only 4 Numbers";
        }

        this.setState({errors: errors});
        return formIsValid;

    }

    render(){
        return(
            <div className="updatingUser">
                <h1 align="center">Edit User Details</h1>
                <form onSubmit={this.onSubmit}>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} ><TextField required style={{width: "500px"}} variant="outlined" id="firstName" label="firstName" value={this.state.firstName} onChange={this.onChangeFirstName}/></Box>
                    <span style={{color: "red", display: "flex", margin: "1vw", justifyContent:"center"}}>{this.state.errors["firstName"]}</span>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} ><TextField required style={{width: "500px"}} variant="outlined" id="lastName" label="lastName" value={this.state.lastName} onChange={this.onChangeLastName}/></Box>
                    <span style={{color: "red", display: "flex", margin: "1vw", justifyContent:"center"}}>{this.state.errors["lastName"]}</span>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} ><TextField required style={{width: "500px"}} variant="outlined" id="email" label="email" value={this.state.email} onChange={this.onChangeEmail}/></Box>
                    <span style={{color: "red", display: "flex", margin: "1vw", justifyContent:"center"}}>{this.state.errors["email"]}</span>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} ><TextField required style={{width: "500px" }} variant="outlined" id="phoneNumber" label="phoneNumber" value={this.state.phoneNumber} onChange={this.onChangePhoneNumber}/></Box>
                    <span style={{color: "red", display: "flex", margin: "1vw", justifyContent:"center"}}>{this.state.errors["phoneNumber"]}</span>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} ><TextField required style={{width: "500px"}} variant="outlined" id="suburb" label="suburb" value={this.state.suburb} onChange={this.onChangeSuburb}/></Box>
                    <span style={{color: "red", display: "flex", margin: "1vw", justifyContent:"center"}}>{this.state.errors["suburb"]}</span>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} ><TextField required style={{width: "500px"}} variant="outlined" id="postcode" label="postcode" value={this.state.postcode} onChange={this.onChangePostcode}/></Box>
                    <span style={{color: "red", display: "flex", margin: "1vw", justifyContent:"center"}}>{this.state.errors["postcode"]}</span>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} >
                        <Button color="primary" variant="contained" type="submit">
                            Update User Details
                        </Button>
                    </Box>
                </form>
                <form onSubmit={this.onSubmitDelete}>
                <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} >
                        <Button color="secondary" variant="contained" type="submit">
                            Delete User
                        </Button>
                    </Box>
                </form>
                <h4 align="center">Change Password</h4>
                <form onSubmit={this.onSubmitPassword}>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} ><TextField required type="password" style={{width: "500px"}} variant="outlined" id="CurrentPassword" label="Current Password" value={this.state.currentPassword} onChange={this.onChangeCurrentPassword}/></Box>
                    <span style={{color: "red", display: "flex", margin: "1vw", justifyContent:"center"}}>{this.state.errors["password"]}</span>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} ><TextField required type="password" style={{width: "500px"}} variant="outlined" id="New Password" label="New Password" value={this.state.newPassword} onChange={this.onChangeNewPassword}/></Box>
                    <span style={{color: "red", display: "flex", margin: "1vw", justifyContent:"center"}}>{this.state.errors["passwords"]}</span>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} ><TextField required type="password" style={{width: "500px"}} variant="outlined" id="Repeat Password" label="Repeat New Password" value={this.state.newPassword2} onChange={this.onChangeNewPassword2}/></Box>
                    <span style={{color: "red", display: "flex", margin: "1vw", justifyContent:"center"}}>{this.state.errors["passwords"]}</span>
                    <Box style={{display: "flex", margin: "1vw", justifyContent:"center"}} >
                            <Button color="primary" variant="contained" type="submit">
                                Change Password
                            </Button>
                    </Box>
                </form>
            </div>
        )
    }

}

export default AccountMan;
//delete button --> done
//styling --> done
//fix register -->d one
//password change confirm old password change current password--> done
//input validation--> done for updat, need do for Register and Login
//make perty--> done
//report --> 1pm
//commenting--> done some, others
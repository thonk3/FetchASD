import React, { Component } from 'react';
import axios from "axios";
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
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
    }
    componentDidMount = async () => {
        const { id } = this.state
        axios.get(`/api/users/${id}`)    // get user by id
        .then(res => {
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                phoneNumber: res.data.phoneNumber,
                suburb: res.data.suburb,
                postcode: res.data.postcode,
            });
        })
        .catch((error) => {
            console.log(error);
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
        axios.put('/api/users/' + this.state.id, updateUser)
            .then(res => {
                console.log(res.data);
                window.location = '/admin/' + this.state.id;
            })
            .catch((error) => {
                console.log(error.message);
            })
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
        if(!(this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))){
            formIsValid=false;
            errors["email"] = "Email is not valid";
       }
        //phoneNumber validation
        if(!((this.state.phoneNumber.match(/^[0-9]+$/)) && this.state.phoneNumber.length === 10)){
            formIsValid=false;
            errors["phoneNumber"] = "Only Numbers";
        }
        //suburb
        if(!(this.state.suburb.match(/^[0-9a-zA-Z\s]+$/))){
            formIsValid=false;
            errors["suburb"] = "No Special Characters";
       }
        //postcode validation
        if(!((this.state.postcode.match(/^[0-9]+$/)) && this.state.postcode.length === 4)){
            formIsValid=false;
            errors["postcode"] = "Only 4 Numbers";
        }

        this.setState({errors: errors});
        return formIsValid;
        

    }
 
    render() {
        return (

            <div>  

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
           </div>  

        )
    } 
}                                                                                                                          

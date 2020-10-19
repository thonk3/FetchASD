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
        };
    }
    componentDidMount = async () => {
        const { id } = this.state
        axios.get(`/api/users/${id}`)
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

    onSubmit = e => {
        e.preventDefault();

        const updateUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            suburb: this.state.suburb,
            postcode: this.state.postcode
        }


        console.log(updateUser);
        alert("Note: fix update");
        // axios.put('/api/users/' + this.state.id, updateUser)
        //     .then(res => {
        //         console.log(res.data);
        //         window.location = '/admin/' + this.state.id;
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //     });
    }

    onSubmitDelete = e => {
        e.preventDefault();

        alert("note: fix delete");
        
        // axios.delete('/api/users/' + this.state.id)
        //     .then(res => {
        //         console.log(res.data)
        //         window.location = '/admin/user_man';
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //     })
    }

    // ick

    render() {
        return (
            <div>  
                <p>work in progress</p>
            </div>  

        )
    } 
}                                                                                                                          

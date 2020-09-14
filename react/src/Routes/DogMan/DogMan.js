import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import axios from "axios";
import { Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import coolDogImage from '../../assets/cool.jpg';

// Basic styling for pictures in CardMedia
const styles =
{
    media: {
        height: "150px",
        marginTop: '5'
    }
};

// This is the default state
// I have hardcoded userEmail as we don't have
// functionality to pass around the _id through
// the app
const defaultState = {
    dogs: [],
    userEmail: 'rbabcock0@dyndns.org',
    Name: '',
    Age: '',
    Breed: '',
    Suburb: '',
    Postcode: '',
    Gender: '',
    isVaccinated: false,
    isDesexed: false,
    Bio: ''
};

class DogMan extends Component {
    constructor(props) {
        super(props);
        // sets the default state using a spread
        // operator :)
        this.state = {...defaultState};
    }

    // Special function that onLoad
    componentDidMount() {
        // Hardcoded get request the "logged in" user's dogs
        axios.get('http://localhost:5000/api/users/5f57036e927d194baceedf7a/dogs')
            .then(res => {
                // add the dog objects in the dogs state array
                this.setState({
                    dogs: res.data,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Using anonymous function arrow syntax!
    // We can set the state and don't have to include the binding
    // statements. Anonymous arrow functions keeps the 
    // context of where it is assigned so "this" always
    // refers to DogMan and not something else
    // https://alligator.io/js/this-keyword/
    onChangeName = e => {
        this.setState({
            Name: e.target.value
        })
    }

    onChangeAge = e => {
        this.setState({
            Age: e.target.value
        })
    }

    onChangeBreed = e => {
        this.setState({
            Breed: e.target.value
        })
    }

    onChangeSuburb = e => {
        this.setState({
            Suburb: e.target.value
        })
    }

    onChangePostcode = e => {
        this.setState({
            Postcode: e.target.value
        })
    }

    onChangeGender = e => {
        this.setState({
            Gender: e.target.value
        })
    }
    // this is a checkbox so we have to set the state according to 
    // whether it is checked
    onChangeIsVaccinated = e => {
        this.setState({
            isVaccinated: e.target.checked
        })
    }

    onChangeIsDesexed = e => {
        this.setState({
            isDesexed: e.target.checked
        })
    }

    onChangeBio = e => {
        this.setState({
            Bio: e.target.value
        })
    }
    // function that will run when press the submit button at the bottom
    // of the form
    onSubmit = e => {
        // Method cancels the event if it is cancelable
        e.preventDefault();
        // New Dog Object setting via state
        const newDog = {
            userEmail: this.state.userEmail,
            Name: this.state.Name,
            Age: this.state.Age,
            Breed: this.state.Breed,
            Suburb: this.state.Suburb,
            Postcode: this.state.Postcode,
            Gender: this.state.Gender,
            isVaccinated: this.state.isVaccinated,
            isDesexed: this.state.isDesexed,
            Bio: this.state.Bio
        }

        // For debugging purposes delete later
        console.log(newDog);

        // Send a post request with the newDog object
        axios.post('http://localhost:5000/api/canines/add', newDog)
            .then(res => {
                // For debugging purposes delete later
                console.log(res.data)
                // Adds the new dog object to the state so we don't
                // need to refresh. Also we use spread operator magic
                // to merge the two objects together as the bottom object
                // overwrites the pervious one so we don't lose the user's
                // dogs. https://www.javascripttutorial.net/object/javascript-merge-objects/
                this.setState({
                    ...defaultState,
                    dogs: [
                        ...this.state.dogs,
                        newDog
                    ]
                })
            })
            // if error display in console
            .catch((error) => {
                console.log(error);
            });
    }

    
    render() {
        return (
            <div className="dog-management">
                <h1>Dog Management</h1>
                <h2>Create New Dog</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label> Age: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Age}
                            onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <label> Breed: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Breed}
                            onChange={this.onChangeBreed}
                        />
                    </div>
                    <div className="form-group">
                        <label> Suburb: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Suburb}
                            onChange={this.onChangeSuburb}
                        />
                    </div>
                    <div className="form-group">
                        <label> Postcode: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Postcode}
                            onChange={this.onChangePostcode}
                        />
                    </div>
                    <div className="form-group">
                        <label> Gender: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Gender}
                            onChange={this.onChangeGender}
                        />
                    </div>
                    <div className="form-group">
                        <label> Vaccinated: </label>
                        <input type="checkbox"
                            className="form-control"
                            value={this.state.isVaccinated}
                            onChange={this.onChangeIsVaccinated}
                        />
                    </div>
                    <div className="form-group">
                        <label> Desexed: </label>
                        <input type="checkbox"
                            className="form-control"
                            value={this.state.isDesexed}
                            onChange={this.onChangeIsDesexed}
                        />
                    </div>
                    <div className="form-group">
                        <label> Bio: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Bio}
                            onChange={this.onChangeBio}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Dog" />
                    </div>
                </form>
                <h2>Your Dogs</h2>
                <Grid container spacing={2} style={{ marginLeft: 5 }}>
                    {this.state.dogs.map(dog => <DogCard obj={dog} />)}
                </Grid>
            </div >
        );
    }
}

{/*This is a component for each dog that the particular
user has registered. It makes the amount of dogs 
dynamically based on the amount of dogs a user has 
registered*/}
class DogCard extends Component {
    render() {
        return (
            <div style={{ marginTop: 5, padding: 5 }}>
                <Grid>
                    <Card class="dog" style={{ padding: 5, height: 400 }}>
                        <CardContent>
                            <CardMedia component="img" alt="cool dog img" image={coolDogImage} title="Cool Dog" style={styles.media} />
                            <h3>{this.props.obj.Name}, {this.props.obj.Age}</h3>
                            <p>{this.props.obj.Breed}</p>
                            <p>{this.props.obj.Suburb}, {this.props.obj.Postcode}</p>
                            <Button variant="contained" color="primary">Edit Dog </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    }
}

export default DogMan;
import React, { Component } from 'react';
import axios from "axios";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import token from '../../Helpers/token';


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
    id: '',
    UserId: token().id,
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

class UpdateDog extends Component {
    constructor(props) {
        super(props);
        // sets the default state using a spread
        // operator :)
        this.state = { ...defaultState, id: this.props.match.params.id};
    }

    // Special function that onLoad
    componentDidMount() {
        // Hardcoded get request the "logged in" user's dogs
        axios.get('/api/dogs/' + this.state.id + '')
            .then(res => {
                // add the dog objects in the dogs state array
                this.setState({ ...res.data });
                console.log('Desexed: ' + res.data.isDesexed)
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
        const updatedDog = {
            UserId: this.state.UserId,
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
        console.log(updatedDog);

        // Send a post request with the newDog object
        axios.post('/api/dogs/' + this.state.id +'/edit', updatedDog)
            .then(res => {
                // For debugging purposes delete later
                console.log(res.data)
                // Adds the new dog object to the state so we don't
                // need to refresh. Also we use spread operator magic
                // to merge the two objects together as the bottom object
                // overwrites the pervious one so we don't lose the user's
                // dogs. https://www.javascripttutorial.net/object/javascript-merge-objects/
            })
            // if error display in console
            .catch((error) => {
                console.log(error.response.data);
            });
    }


    render() {
        return (
            <div className="update-dog">
                <h1>Dog Management</h1>
                <h2>Edit Dog</h2>
                <h3>Vacincatted = {String(this.state.isVaccinated)}</h3>
                <h3>Desexed = {String(this.state.isDesexed)}</h3>
                <form onSubmit={this.onSubmit}>
                    <InputBox label="Name: " required value={this.state.Name} onChange={this.onChangeName} />
                    <InputBox label="Age: " required value={this.state.Age} onChange={this.onChangeAge} />
                    <InputBox label="Breed: " required value={this.state.Breed} onChange={this.onChangeBreed} />
                    <InputBox label="Suburb: " required value={this.state.Suburb} onChange={this.onChangeSuburb} />
                    <InputBox label="Postcode: " required value={this.state.Postcode} onChange={this.onChangePostcode} />
                    <div className="form-group">
                        <label> Gender: </label>
                        <select required className="form-control" value={this.state.Gender} onChange={this.onChangeGender}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={this.state.isVaccinated} onChange={this.onChangeIsVaccinated} />}
                        label="Vaccination:"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={this.state.isDesexed} onChange={this.onChangeIsDesexed} />}
                        label="Desexed:"
                        labelPlacement="start"
                    />
                    <InputBox label="Bio: " required value={this.state.Bio} onChange={this.onChangeBio} />
                    <div className="form-group">
                        <input type="submit" value="Update Dog" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete Dog" />
                    </div>
                </form>
            </div >
        );
    }
}

//This is a component for each dog that the particular
//user has registered. It makes the amount of dogs 
//dynamically based on the amount of dogs a user has 
//Sregistered

class InputBox extends Component {
    render() {
        const { label, value, onChange, inputType, required } = this.props;

        const type = inputType || "text";

        return (

            <div className="form-group">
                <label> {this.props.label}</label>
                <input type={type}
                    required={this.props.required}
                    className="form-control"
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}

export default UpdateDog;
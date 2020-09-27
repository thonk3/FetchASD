import React, { Component } from 'react';
import token from '../../Helpers/token'
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBox from './Components/InputBox';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Default State object
const defaultState = {
    UserId: token().id,
    Name: '',
    Age: '',
    Breed: '',
    Suburb: '',
    Postcode: '',
    Gender: 'Male',
    isVaccinated: false,
    isDesexed: false,
    Bio: ''
};

// Component for CreateDog
class CreateDog extends Component {
    constructor(props) {
        super(props);
        // sets the default state using a spread
        // operator :)
        this.state = { ...defaultState };
    }

    onChangeName = e => { this.setState({ Name: e.target.value }) };
    onChangeAge = e => { this.setState({ Age: e.target.value }) };
    onChangeBreed = e => { this.setState({ Breed: e.target.value }) };
    onChangeSuburb = e => { this.setState({ Suburb: e.target.value }) };
    onChangePostcode = e => { this.setState({ Postcode: e.target.value }) };
    onChangeGender = e => { this.setState({ Gender: e.target.value }) };
    // this is a checkbox so we have to set the state according to 
    // whether it is checked
    onChangeIsVaccinated = e => { this.setState({ isVaccinated: e.target.checked }) };
    onChangeIsDesexed = e => { this.setState({ isDesexed: e.target.checked }) };
    onChangeBio = e => { this.setState({ Bio: e.target.value }) };
    // function that will run when press the submit button at the bottom
    // of the form
    onSubmit = e => {
        // Method cancels the event if it is cancelable
        e.preventDefault();
        // New Dog Object setting via state
        const newDog = {
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

        // Send a post request with the newDog object
        axios.post('/api/dogs/add', newDog)
            .then(res => {
                // Reset the form after adding a dog
                this.setState({
                    ...defaultState
                })
                // redirect to main dog management page
                window.location = '/myacc/mypack';
            })
            // if error display in console
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="create-dog">
                <Paper style={{ margin: "10px", padding: "10px" }}>
                    <Typography component="h1" variant="h4" align="center">
                        Create New Dog
                    </Typography>
                    <form onSubmit={this.onSubmit}>
                        <InputBox label="Name" required value={this.state.Name} onChange={this.onChangeName} />
                        <InputBox label="Age" required value={this.state.Age} onChange={this.onChangeAge} />
                        <InputBox label="Breed" required value={this.state.Breed} onChange={this.onChangeBreed} />
                        <InputBox label="Suburb" required value={this.state.Suburb} onChange={this.onChangeSuburb} />
                        <InputBox label="Postcode" required value={this.state.Postcode} onChange={this.onChangePostcode} />
                        <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <FormControl variant="outlined" style={{ width: "500px" }}>
                                <Select
                                    labelId="Gender"
                                    value={this.state.Gender}
                                    onChange={this.onChangeGender}
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <TextField
                                style={{ width: "500px" }}
                                rows="2"
                                multiline
                                required
                                value={this.state.Bio}
                                label="Bio"
                                onChange={this.onChangeBio}
                                variant="outlined"
                            />
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.isVaccinated} onChange={this.onChangeIsVaccinated} />}
                                label="Vaccinated?"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.isDesexed} onChange={this.onChangeIsDesexed} />}
                                label="Desexed?"
                                labelPlacement="start"
                            />
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <Button style={{ width: "300px" }} type="submit" variant="contained" color="primary">Submit</Button>
                        </Box>
                    </form>
                </Paper>
            </div>
        )
    }
}

export default CreateDog;
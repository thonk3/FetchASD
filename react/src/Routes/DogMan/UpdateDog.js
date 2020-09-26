import React, { Component } from 'react';
import axios from "axios";
import token from '../../Helpers/token';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Basic styling for pictures in CardMedia
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
    Bio: '',
    open: false,
    setOpen: false
};


class UpdateDog extends Component {
    constructor(props) {
        super(props);
        // sets the default state using a spread
        // operator :)
        this.state = { ...defaultState, id: this.props.match.params.id };
    }


    // Special function that onLoad
    componentDidMount() {
        // Hardcoded get request the "logged in" user's dogs
        axios.get('/api/dogs/' + this.state.id)
            .then(res => {
                // add the dog objects in the dogs state array
                this.setState({ ...res.data });
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

    onChangeOpen = () => {
        this.setState({
            setOpen: true,
            open: true
        })
    }

    onChangeClose = () => {
        this.setState({
            setOpen: false,
            open: false
        })
    }
    // function that will run when press the submit button at the bottom
    // of the form
    onSubmitUpdate = e => {
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
        axios.post('/api/dogs/' + this.state.id + '/edit', updatedDog)
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
    // function to call when Delete Dog button is called
    onSubmitDelete = e => {
        e.preventDefault();
        this.setState({
            setOpen: false,
            open: false
        })
        console.log("UserId: " + this.state.UserId);
        console.log("DogId: " + this.state.id);
        const deletedDog = {
            UserId: this.state.UserId
        }
        axios.post('/api/dogs/' + this.state.id + '/delete', deletedDog)
            .then(res => {
                console.log(res.data)
            })
            // if error display in console
            .catch((error) => {
                console.log(error.response.data);
            });
    }



    render() {
        return (
            <div className="update-dog">
                <Paper style={{ margin: "10px", padding: "10px" }}>
                    <Typography component="h1" variant="h4" align="center">
                        Edit Dog
                    </Typography>
                    <form onSubmit={this.onSubmitUpdate}>
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
                                label="Vaccination:"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={this.state.isDesexed} onChange={this.onChangeIsDesexed} />}
                                label="Desexed:"
                                labelPlacement="start"
                            />
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                            <Button style={{ width: "300px" }} type="submit" variant="contained" color="primary">Submit</Button>
                        </Box>
                    </form>
                    <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                        <Button style={{ width: "300px" }} type="submit" variant="contained" color="secondary" onClick={this.onChangeOpen}>DELETE DOG</Button>
                    </Box>
                    <Dialog
                        open={this.state.open}
                        onClose={this.onChangeClose}
                    >
                        <DialogTitle>{"Are you sure you want to delete " + this.state.Name + "? 😢"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Performing this action will completely remove your dog from Fetch. This action cannot
                                be undone. Please think wisely before you perform this action!
                                </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onSubmitDelete} color="primary">
                                Yes
                                </Button>
                            <Button onClick={this.onChangeClose} color="primary" autoFocus>
                                No
                                </Button>
                        </DialogActions>
                    </Dialog>

                </Paper>
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
        // const { label, value, onChange, inputType, required } = this.props;

        // const type = inputType || "text";

        return (
            <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                <TextField
                    variant="outlined"
                    style={{ width: "500px" }}
                    required={this.props.required}
                    value={this.props.value}
                    label={this.props.label}
                    onChange={this.props.onChange}
                />
            </Box>
        )
    }
}

export default UpdateDog;
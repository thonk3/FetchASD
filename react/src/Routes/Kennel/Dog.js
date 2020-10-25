import React, { Component } from 'react';
import axios from "axios";
import './Components/kennel.css';
import token from '../../Helpers/token';
import { Button, FormGroup, InputLabel, MenuItem, Select, TextField, Grid, Box, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PickLocationCard from './Components/PickLocationCard'

import NotFound from '../NotFound/NotFound'

export default class Dog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            age: '',
            breed: '',
            suburb: '',
            gender: '',
            rating: '',
            bio: '',
            imageUrl: '',
            dogs: [],
            interestExpressed: false,
            dateOn: null,
            locations: [],
            locationId: '',
            locationAddress: '',
            senderDogID: '',
            open: false,
            setOpen: false,
            searchTerm: '',
            
            wrongPage: false,
        };
        this.handleOpenExpressInterest = this.handleOpenExpressInterest.bind(this);
        this.handleCloseExpressInterest = this.handleCloseExpressInterest.bind(this);
    }

    componentDidMount = async () => {
        const { id } = this.state
        axios.get(`/api/dogs/${id}`)    // get dog by id
            .then(res => {
                this.setState({
                    name: res.data.Name,
                    age: res.data.Age,
                    breed: res.data.Breed,
                    suburb: res.data.Suburb,
                    gender: res.data.Gender,
                    bio: res.data.Bio,
                    imageUrl: res.data.imageUrl,
                    rating: res.data.Score,
                });
            })
            .catch((error) => {
                console.log("redirect to 404");
                this.setState({ wrongPage: true });
            })

        axios.get(`/api/users/${token().id}/dogs`) // get all dogs from user
            .then(res => {
                this.setState({
                    dogs: res.data,
                })
            })
            .catch((error) => { console.log(error); })
        // axios request for the list of locations
        axios.get('/api/locations/')
            .then(res => {
                this.setState({
                    locations: res.data
                });
            })
            .then(() => this.setState({ loading: false }))
            .catch((error) => console.log(error))
    }

    onRequestSubmit() { // create a new date
        const newDate = {
            senderDogID: this.state.senderDogID,
            receiverDogID: this.state.id,
            status: "Requested",
            dateOn: this.state.dateOn,
            location: this.state.locationAddress,
        }
        axios.post('/api/date/add/', newDate)
            .catch((error => {
                console.log("Could not create a new date")
            }))
    }

    handleOpenExpressInterest() {
        this.setState(state => ({ interestExpressed: true, }));
    }

    handleCloseExpressInterest() {
        this.setState(state => ({ interestExpressed: false, }));
    }

    onChangeDateOn(e) {
        this.setState({ dateOn: e })
    }

    onChangeLocationAddress(e) {
        this.setState({ locationAddress: e.target.value });
    }

    onChangeSenderDogID(e) {
        this.setState({ senderDogID: e.target.value });
    }
    // Handlers for when the dialog box opens and closes
    onChangeOpen = () => { this.setState({ setOpen: true, open: true }) };
    onChangeClose = () => { this.setState({ setOpen: false, open: false }) };

    // Handler function whne a location has been choosen in the dialog
    // Dialog closes and location id and address state gets updated
    onPickLocation = (location) => {
        this.setState({
            setOpen: false,
            open: false,
            locationId: location._id,
            locationAddress: location.Address
        });
    }

    // Function to capture the search term placed in the input box
    editSearchTerm = (e) => {
        this.setState({ searchTerm: e.target.value });
    }

    // Helper function that takes a string compares the lower cased version of the value in the string provided
    // to the lowercased version of the search term in the input box
    hasSearchTerm = (value) => {
        return value.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    }

    // Uses the hasSearchTerm helper function to easily filter a location's address or name
    getFilteredLocations = () => {
        return this.state.locations.filter(location => this.hasSearchTerm(location.Address) || this.hasSearchTerm(location.Name));
    }

    render() {
        const { name, age, breed, suburb, gender, rating, bio, imageUrl } = this.state


        if(this.state.wrongPage) return <NotFound />
        
        return (
            <div className="contain-within">
                <div className="float-left">
                    <div>
                        <img src={imageUrl} alt="Dog" className="imgplaceholder"/>
                    </div>
                    <div className="button">
                        <Button onClick={this.handleOpenExpressInterest} variant="contained" color="primary">
                            Request a date
                        </Button>
                        <br /> {/* yes more lines */}
                        <br />
                        <br />
                        <br />
                        {(this.state.interestExpressed) ?
                            <Grid container direction="column" alignItems="left">
                                <form>
                                    <FormGroup>
                                        <InputLabel>Which dog?</InputLabel> 
                                        <Select value={this.state.senderDogID} onChange={this.onChangeSenderDogID.bind(this)}>
                                            {this.state.dogs.map((dog, i) => {
                                                return <MenuItem value={dog._id} key={i}>{dog.Name} </MenuItem>
                                            })}
                                        </Select>
                                        <br />
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <KeyboardDateTimePicker
                                                //autoOk
                                                variant="inline"
                                                label="Time and Date"
                                                disablePast
                                                value={this.state.dateOn}
                                                required
                                                onChange={this.onChangeDateOn.bind(this)}
                                            />                     
                                        </MuiPickersUtilsProvider>
                                        <br />
                                        <TextField
                                            label="Choose your own location"
                                            value={this.state.locationAddress}
                                            onChange={this.onChangeLocationAddress.bind(this)}
                                        />
                                        <br />
                                        <Typography align="center"><strong>OR</strong></Typography>
                                        <br />
                                        {/* // This will open to a full width xl scrolling body dialog box */}
                                        <Button variant="contained" color="primary" onClick={this.onChangeOpen}> Choose an approved location </Button>
                                        <br />
                                        {/* Dialog box that has body scroll has full width and is extra large */}
                                        <Dialog open={this.state.open} onClose={this.onChangeClose} scroll="body" fullWidth={true} maxWidth={"xl"}>
                                            <DialogTitle>{"Pick from one of our approved locations!"}</DialogTitle>
                                            <DialogContent>
                                                <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                                                    <TextField placeholder="Search for location name or address here..." fullWidth variant="outlined" value={this.state.searchTerm} onChange={this.editSearchTerm} />
                                                </Box>
                                                {/* This will create a location cards inside the appearing dialog box */}
                                                <Grid container spacing={2} style={{ justifyContent: "center", marginBottom: "1vw" }}>
                                                    {/* If getFilteredLocations returns an array of objects if there are objects in the array
                                                    it returns the Location cards according to the filter. Otherwise, no objects are in the array meaning 
                                                    no objects match the search filter, produce a no location found string */}
                                                    {
                                                        this.getFilteredLocations().length 
                                                            ? 
                                                                this.getFilteredLocations().map(location => <PickLocationCard obj={location} onChange={(e) => this.onPickLocation(location)}/>) 
                                                            : 
                                                                <Typography component="h1" variant="h4" style={{margin: "1vw"}}>{" No Location Found 😢"}</Typography> 
                                                    }
                                                </Grid>
                                            </DialogContent>
                                        </Dialog>
                                        <Box display="flex" justifyContent="space-between">
                                            <Button style={{ width: '49%' }} onClick={this.handleCloseExpressInterest} variant="contained" color="default"> Cancel </Button>
                                            <Button style={{ width: '49%' }} type="submit" onClick={() => this.onRequestSubmit()} variant="contained" color="primary"> Send</Button>
                                        </Box>
                                    </FormGroup>
                                </form>
                            </Grid>
                            : ''}
                    </div>
                </div>
                <div>
                    <h1>{name}, {age}</h1>
                    <h3> Breed: {breed} </h3>
                    <h3> Suburb: {suburb} </h3>
                    <h3> Gender: {gender} </h3>
                    <h3> Rating: {rating} </h3>
                    <h3> Bio: {bio} </h3>
                </div>
            </div>
        )
    }
}                                                                                                                          

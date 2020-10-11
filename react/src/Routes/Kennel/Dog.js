import React, { Component } from 'react';
import axios from "axios";
import './Components/kennel.css';
import token from '../../Helpers/token';
import { Button, FormGroup, InputLabel, MenuItem, Select, TextField, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PickLocationCard from './Components/PickLocationCard'

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
            dateOn: '',
            locations: [],
            locationId: '',
            locationAddress: '',
            senderDogID: '',
            open: false,
            setOpen: false
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
                    imageUrl: res.data.imageUrl
                    // rating: res.data.Rating,
                });
            })
            .catch((error) => {
                console.log(error);
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
            .then(() => this.setState({loading: false}))
            .catch((error) => console.log(error))
    }

    onRequestSubmit() { // create a new date
        const newDate = {
            senderDogID: this.state.senderDogID,
            receiverDogID: this.state.id,
            status: "Requested",
            dateOn: this.state.dateOn,
            location: this.state.locationId,
        }
        axios.post('/api/date/add/', newDate)
            .catch((error => {
                console.log("Could not create a new date")
            }))
    }

    handleOpenExpressInterest() {
        this.setState(state => ({
            interestExpressed: true,
        }))
    }

    handleCloseExpressInterest() {
        this.setState(state => ({
            interestExpressed: false,
        }))
    }

    onChangeDateOn(e) {
        this.setState({
            dateOn: e.target.value
        })
    }

    onChangeLocationAddress(e) {
        this.setState({
            locationAddress: e.target.value
        })
    }

    onChangeSenderDogID(e) {
        this.setState({
            senderDogID: e.target.value
        })
    }
    // Handlers for when the dialog box opens and closes
    onChangeOpen = () => {this.setState({setOpen: true,open: true})};
    onChangeClose = () => {this.setState({setOpen: false,open: false})};

    onPickLocation = (location) => {
        this.setState({
          setOpen: false,
          open: false,
          locationId: location._id,
          locationAddress: location.Address
        });
        //DEBUG DELETE LATER
        console.log(location);
        console.log(this.state.locationId);
        console.log(this.state.locationAddress);
      }

    render() {
        const { name, age, breed, suburb, gender, rating, bio, imageUrl } = this.state
        return (
            <div className="contain-within">
                <div className="float-left">
                    <div className="imgplaceholder">
                        <img src={imageUrl} alt="Dog"/>
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
                            <Grid container direction="column" spacing={1} alignItems="center">
                                <form>
                                    <FormGroup>
                                        <InputLabel>Which dog?</InputLabel>
                                        <Select value={this.state.senderDogID} onChange={this.onChangeSenderDogID.bind(this)}>
                                            {this.state.dogs.map((dog, i) => {
                                                return <MenuItem value={dog._id} key={i}>{dog.Name} </MenuItem>
                                            })}
                                        </Select>
                                        <br />
                                        <TextField
                                            label="Time and Date"
                                            type="datetime-local"
                                            InputLabelProps={{ shrink: true }}
                                            value={this.state.dateOn}
                                            onChange={this.onChangeDateOn.bind(this)}
                                        />
                                        <TextField
                                            label="Location"
                                            value={this.state.locationAddress}
                                            onChange={this.onChangeLocationAddress.bind(this)}
                                        />
                                        {/* // This will open to a full width xl scrolling body dialog box */}
                                        <Button variant="contained" color="primary" onClick={this.onChangeOpen}> Choose an approved location </Button>
                                        <br />
                                        <Dialog
                                            open={this.state.open}
                                            onClose={this.onChangeClose}
                                            scroll="body"
                                            fullWidth={true}
                                            maxWidth={"xl"}
                                        >
                                            <DialogTitle>{"Pick from one of our approved locations!"}</DialogTitle>
                                            <DialogContent>
                                            {/* This will createa location cards inside the appearing dialog box */}
                                            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                                                {this.state.locations.map(location => <PickLocationCard obj={location} onChange={(e) => this.onPickLocation(location)}/>)}
                                            </Grid>
                                            </DialogContent>
                                        </Dialog>
                                        <Button onClick={this.handleCloseExpressInterest} variant="contained" color="default"> Cancel </Button>
                                        <br />
                                        <Button type="submit" onClick={() => this.onRequestSubmit()} variant="contained" color="primary"> Send Request </Button>
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

import React, { Component } from 'react';
import axios from "axios";
import './Components/kennel.css';
import token from '../../Helpers/token';
import { Button, FormGroup, InputLabel, MenuItem, Select, TextField, Grid }from '@material-ui/core';

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
            dogs: [],
            interestExpressed: false,
            dateOn: '',
            location: '',
            senderDogID: '',
        };
        this.handleOpenExpressInterest = this.handleOpenExpressInterest.bind(this);
        this.handleCloseExpressInterest = this.handleCloseExpressInterest.bind(this);
    }
     componentDidMount = async () => {
         const { id } = this.state
         axios.get(`/api/dogs/${id}`)
         .then(res => {
             this.setState({
                name: res.data.Name,
                age: res.data.Age,
                breed: res.data.Breed,
                suburb: res.data.Suburb,
                gender: res.data.Gender,
                rating: res.data.Rating,
             });
         })
         .catch((error) => {
            console.log(error);
        })
        axios.get(`/api/users/${token().id}/dogs`)
            .then(res => {
                this.setState({
                    dogs: res.data,
                })
            })
            .catch((error) => {
                console.log(error);
            })
     }

    onRequestSubmit() {
        const newDate = {
            senderDogID: this.state.senderDogID,
            receiverDogID: this.state.id,
            status: "Requested",
            dateOn: this.state.dateOn,
            location: this.state.location,
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

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        })
    }

    onChangeSenderDogID(e) {
        this.setState({
            senderDogID: e.target.value
        })
    }

    render() {
        const{name, age, breed, suburb, gender, rating} = this.state
        return (
            <div className = "contain-within">
                <div className="float-left">
                <div className="imgplaceholder">
                    image here
                </div>
                <div className="button">
                    <Button onClick={this.handleOpenExpressInterest} variant="contained" color="primary">
                        Request a date
                    </Button>         
                    <br/>
                    <br/>
                    <br/>       
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
                                <br/>                                                          
                                <TextField
                                    label="Time and Date"
                                    type="datetime-local"
                                    InputLabelProps={{ shrink: true }}
                                    value={this.state.dateOn}
                                    onChange={this.onChangeDateOn.bind(this)}
                                />
                                <TextField 
                                    label="Location"
                                    value={this.state.location}
                                    onChange={this.onChangeLocation.bind(this)}
                                />
                                <br/>
                                <Button onClick={this.handleCloseExpressInterest} variant="contained" color="default"> Cancel </Button>
                                <br/>
                                <Button type="submit"  onClick={() => this.onRequestSubmit()} variant="contained" color="primary"> Send Request </Button>
                            </FormGroup>
                        </form>
                    </Grid>
                    : ''}
                </div>
            </div>
            <div>  
                <h1>{name}, {age}</h1>
                <h3>
                    Breed: {breed}
                <br/>
                    Suburb: {suburb}
                <br/>
                    Gender: {gender}
                <br/>
                    Rating: {rating}
                <br/>
                    Bio: 
                </h3>
            </div>  
            </div>
        )
    } 
}                                                                                                                          

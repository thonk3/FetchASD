import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../kennel/kennel.css';
import token from '../../utils/tokenUtils';
import { Button, FormGroup, InputLabel, MenuItem, Select, TextField, Grid, Box, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker, useStaticState } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PickLocationCard from '../kennel/PickLocationCard'

import NotFound from '../notFound/NotFound'

const Dog = (props) => {
    const [dogProfile, setDogProfile] = useState({
        id: props.match.params.id,
        name: "",
        age: 0,
        breed: "",
        suburb: "",
        gender: "",
        bio: "",
        imgUrl: "",
        rating: 0,
    });
    // date request
    const [senderDog, setSenderDog] = useState("");
    const [dateTime, setDateTime] = useState(null);
    const [dateLocation, setDateLocation] = useState("");
    // date dialoge data
    const [dateRequest, setDateRequest] = useState(false);
    const [locationSelect, setLocationSelect] = useState(false);
    const [myDogs, setMyDogs] = useState([]);
    const [locationsList, setLocationsList] = useState([]);
    // miscs
    const [wrongPage, setWrongPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // set up profile on start
    const loadDogProfile = () => {
        axios.get(`/api/dogs/${dogProfile.id}`)
            .then(res =>
                setDogProfile({
                    ...dogProfile,
                    name: res.data.Name,
                    age: res.data.Age,
                    breed: res.data.Breed,
                    suburb: res.data.Suburb,
                    gender: res.data.Gender,
                    bio: res.data.Bio,
                    imgUrl: res.data.imageUrl,
                    rating: res.data.Score || 0,
                })
            )
            .catch(err => setWrongPage(true));
    }

    // get current user dog list to set date request
    const getMyDogs = () => {
        axios.get(`/api/users/${token.getToken()}/dogs`) // get all dogs from user
            .then(res => setMyDogs([...res.data]))
            .catch((error) => console.log("loading dog list err.", error));
    }

    // get location list to set date request
    const getLocationList = () => {
        console.log("hello");
        axios.get('/api/locations/')
            .then(res => {
                setLocationsList([...res.data]);
                setIsLoading(false);
                setFilteredLocation([...res.data]);
            })
            .catch((error) => console.log("loading locations err", error));
    }

    // load api on mount
    useEffect(() => {
        loadDogProfile();
        getMyDogs();
        getLocationList();
    }, []);

    // --------------------------------------------------------------------------------
    // creating new date
    const onRequestSubmit = () => {
        // const newDate = {
        //     senderDogID: senderDog,
        //     receiverDogID: dogProfile.id,
        //     status: "Requested",
        //     dateOn: moment(dateTime).toISOString(),
        //     location: dateLocation(),
        // }
        console.log("newDate")
        // axios.post('/api/date/add', newDate)
        //     .catch(error => console.log("err creating new date"));
    }

    // express interest toggle
    const toggleRequestDate = () => setDateRequest(!dateRequest);
    // test set date
    const changeDateTime = (e) => setDateTime(e);
    // set date location
    const changeLocation = (e) => setDateLocation(e.target.value);
    const changeDateSender = (e) => setSenderDog(e.target.value);

    // wtf is this
    // const [op, setOp] = useState(false);
    const [locationId, setLocationId] = useState("");
    const [locationAddr, setLocationAddr] = useState("");
    // toggle location selector
    const toggleLocationSelect = () => setLocationSelect(!locationSelect);

    const closeLocationSelect = () => setLocationSelect(false);


    const pickLocation = (e) => {
        toggleLocationSelect();
        setLocationId(e._id);
        setLocationAddr(e.Address);
    }

    // filter location
    const [filterTerm, setFilterTerm] = useState("");
    const [filteredLocation, setFilteredLocation] = useState([...locationsList]);
    const filterTaste = (val) => val.toLowerCase().includes(filterTerm.toLowerCase());
    const filterLocations = (e) => {
        setFilterTerm(e.target.value);
        setFilteredLocation(
            locationsList.filter(loc => filterTaste(loc.Address) || filterTaste(loc.Name))
        )
    }

    // --------------------------------------------------------------------------------
    // for incorrect id
    if (wrongPage) return <NotFound />


    return (
        <div className="contain-within">
            <div className="float-left">
                <div> <img src={dogProfile.imgUrl} alt="Dog" className="imgplaceholder" /> </div>
                <div className="button">
                    <Button onClick={toggleRequestDate} variant="contained" color="primary">
                        Request a date
                    </Button>
                    <br /> {/* yes more lines */}
                    <br />
                    <br />
                    <br />

                    {(dateRequest) ?
                        <Grid container direction="column" alignItems="left">
                            <form>
                                <FormGroup>
                                    {/* dog to date selector */}
                                    <InputLabel>Which dog?</InputLabel>
                                    <Select value={senderDog} onChange={changeDateSender}> {/* AAA */}
                                        {myDogs.map((dog, i) => <MenuItem value={dog._id} key={i}>{dog.Name} </MenuItem>)}
                                    </Select>
                                    <br />
                                    {/* date time selector */}
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <KeyboardDateTimePicker
                                            //autoOk
                                            variant="inline"
                                            label="Time and Date"
                                            disablePast
                                            value={dateTime}
                                            required
                                            onChange={changeDateTime}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <br />
                                    {/* location dialogue */}
                                    <TextField
                                        label="Choose your own location"
                                        value={locationAddr}
                                        onChange={e => setLocationAddr(e.target.value)}
                                    />
                                    <br />
                                    <Typography align="center"><strong>OR</strong></Typography>
                                    <br />
                                    {/* // This will open to a full width xl scrolling body dialog box */}
                                    <Button variant="contained" color="primary" onClick={toggleLocationSelect}>
                                        Choose an approved location
                                    </Button>

                                    <br />
                                    {/* Dialog box that has body scroll has full width and is extra large */}
                                    <Dialog open={locationSelect} onClose={closeLocationSelect} scroll="body" fullWidth={true} maxWidth={"xl"}>
                                        <DialogTitle>{"Pick from one of our approved locations!"}</DialogTitle>
                                        <DialogContent>
                                            <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                                                <TextField placeholder="Search for location name or address here..."
                                                    fullWidth variant="outlined" value={filterTerm}
                                                    onChange={filterLocations} />
                                            </Box>
                                            {/* This will create a location cards inside the appearing dialog box */}
                                            <Grid container spacing={2} style={{ justifyContent: "center", marginBottom: "1vw" }}>
                                                {/* If getFilteredLocations returns an array of objects if there are objects in the array
                                                    it returns the Location cards according to the filter. Otherwise, no objects are in the array meaning 
                                                    no objects match the search filter, produce a no location found string */}
                                                {
                                                    filteredLocation.length
                                                        ?
                                                        filteredLocation.map(location => <PickLocationCard obj={location} onChange={(e) => this.onPickLocation(location)} />)
                                                        :
                                                        <Typography component="h1" variant="h4" style={{ margin: "1vw" }}>{" No Location Found 😢"}</Typography>
                                                }
                                            </Grid>
                                        </DialogContent>
                                    </Dialog>

                                    {/* date request button */}
                                    <Box display="flex" justifyContent="space-between">
                                        <Button style={{ width: '49%' }} onClick={toggleRequestDate} variant="contained" color="default"> Cancel </Button>
                                        <Button style={{ width: '49%' }} type="submit" onClick={onRequestSubmit} variant="contained" color="primary">
                                            Send
                                        </Button>
                                    </Box>
                                </FormGroup>
                            </form>
                        </Grid>
                        : ''}
                </div>
            </div>
            <div>
                <h1>{dogProfile.name}, {dogProfile.age}</h1>
                <h3> Breed: {dogProfile.breed} </h3>
                <h3> Suburb: {dogProfile.suburb} </h3>
                <h3> Gender: {dogProfile.gender} </h3>
                <h3> Rating: {dogProfile.rating} </h3>
                <h3> Bio: {dogProfile.bio} </h3>
            </div>
        </div>
    );
}


export default Dog;
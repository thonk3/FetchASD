/* this be the form where user can send messages */

/* should be reusable for both annonymous and loggedin */

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Box, Typography, Button, Paper, TextField, Dialog, DialogTitle, DialogContent, Grid } from '@material-ui/core';
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import Spinner from '../../../Common/Spinner/Spinner'
import PickLocationCard from '../../Kennel/Components/PickLocationCard'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers'

const CreateEvent = () => {
    const [ loading, setLoading ] = useState(false);
    
    const [ locations, setLocations ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ open, setOpen ] = useState(false);

    const [ eventName, setEventname ] = useState("");
    const [ eventLocation, setEventLocation ] = useState("");
    const [ eventDescription, setEventDescription ] = useState("");
    const [ eventDate, setEventDate ] = useState(null);

    const [ error, setError ] = useState([]);
    const [ errorState, setErrorState ] = useState();

    useEffect(() => {
        axios.get('/api/locations/')
            .then(res => {
                setLocations(res.data)
            })
            .catch((error) => console.log(error))
            .then(() => setLoading(false))

    }, [])

    const submitNewEvent = e => {
        e.preventDefault();
        setError(false)

        const newEvent = {
            name: eventName,
            dateAndTime: moment(eventDate).toISOString(),
            status: "Upcoming",
            location: eventLocation,
            description: eventDescription
        }
        setLoading(true)
        axios.post('/api/event/', newEvent)
            .then(res => {
                if(res.status === 200)
                    window.location = '/events'
            })
            .catch(error => {
                setError(error.response.data.error)
                setErrorState(true)
            })
            .then(
                setLoading(false)
            )
    }

    const onPickLocation = (location) => {
        setOpen(false)
        setEventLocation(location.Address)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const hasSearchTerm = (value) => {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const getFilteredLocations = () => {
        return locations.filter(location => hasSearchTerm(location.Address) || hasSearchTerm(location.Name));
    }

    if (loading)
        return <Spinner />

    return (
        <Container maxWidth="md" style={{ marginTop: 20 }}>
            <Paper style={{ padding: 20 }}>
                <Typography variant="h2" style={{ margin: 20 }}>Create new event</Typography>
                { 
                    (errorState && !loading) ? (typeof error === "string") ?
                        <Typography> {error} </Typography>
                        :
                        <ul>
                            {error.map((err, i) => <li key={i}><b>{err.param}: </b> {err.msg}</li>)}
                        </ul>
                    : "" }
                    
                <form onSubmit={submitNewEvent}>
                    <Box style={{ margin: 20 }}>
                        <TextField 
                            label="Event name"
                            variant="outlined"
                            value={eventName}
                            onChange={(e) => setEventname(e.target.value)}
                            placeholder={""}
                            style={{ width: '100%' }}
                            required
                        />
                    </Box>
                    <Box display='flex' justifyContent='space-between' style={{ margin: 20 }}>
                        <Button onClick={handleClickOpen} variant="contained" color="primary">Choose Location</Button>
                        { open ? (
                            <Dialog open={open} onClose={handleClose} scroll="body" fullWidth={true} maxWidth={"xl"}>
                                <DialogTitle>"Pick from one of our approved locations!"</DialogTitle>
                                <DialogContent>
                                    <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                                        <TextField placeholder="Search for location name or address here..." fullWidth variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                    </Box>
                                    <Grid container spacing={2} style={{ justifyContent: "center", marginBottom: "1vw" }}>
                                        { getFilteredLocations().length ? 
                                            getFilteredLocations().map((location, i) => <PickLocationCard key={i} obj={location} onChange={(e) => onPickLocation(location)}/>) 
                                            : <Typography component="h1" variant="h4" style={{ margin: "1vw" }}>{" No Location Found 😢"}</Typography> 
                                        }
                                    </Grid>
                                </DialogContent>
                            </Dialog> ) : ""}
                        <TextField 
                            label="Location"
                            variant="outlined"
                            value={eventLocation}
                            disabled
                            onChange={(e) => setEventLocation(e.target.value)}
                            required
                            style={{ width: '45%'}}
                        />
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDateTimePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label="Date and Time"
                                disablePast
                                value={eventDate}
                                required
                                onChange={date => setEventDate(date)}
                                style={{ width: '35%' }}
                            />                     
                        </MuiPickersUtilsProvider>
                    </Box>
                    <Box style={{ margin: 20 }}>
                        <TextField 
                            label="Description"
                            variant="outlined"
                            style={{ width: '100%' }}   
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}                         
                            required
                            multiline
                            rows={10}
                        />
                    </Box>
                    <Box display='flex' justifyContent='center' style={{ margin: 20 }}>
                        <Button style={{ width: '20%', marginRight: 5 }} variant="contained" color="secondary" onClick={() => window.location = '/events'}>Cancel</Button>
                        <Button style={{ width: '20%', marginLeft: 5 }} variant="contained" color="primary" type="submit">Submit</Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
}

export default CreateEvent;
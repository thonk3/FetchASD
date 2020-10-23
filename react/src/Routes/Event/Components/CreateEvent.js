import React, { useState } from 'react';
import axios from 'axios'
import { Container, Box, Typography, Button, Paper, TextField } from '@material-ui/core';
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import Spinner from '../../../Common/Spinner/Spinner'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers'

const CreateEvent = () => {
    const [ loading, setloading ] = useState(false);
    const [ eventName, setEventname ] = useState("");
    const [ eventLocation, setEventLocation ] = useState("");
    const [ eventDescription, setEventDescription ] = useState("");
    const [ eventDate, setEventDate ] = useState(null);
    const [ error, setError ] = useState([]);
    const [ errorState, setErrorState ] = useState();

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
        setloading(true)
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
                setloading(false)
            )
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
                        <TextField 
                            label="Location"
                            variant="outlined"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            required
                            style={{ width: '64%'}}
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
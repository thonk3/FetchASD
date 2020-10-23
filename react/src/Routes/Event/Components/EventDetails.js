import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../Common/Spinner/Spinner'
import axios from 'axios'
import { Container, Box, Typography, Button, Paper, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core';
import getToken from '../../../Helpers/token'

const EventDetails = (props) => {
    const [ eventDetails, setEventDetails ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ completedState, setCompletedState ] = useState(false);
    //const [ deletedState, setDeletedState ] = useState(false);

    useEffect(() => {
        const retrieveEventDetails = async() => {
            const result = await axios.get(`/api/event/${props.match.params.id}`)
            setEventDetails(result.data.events)
            setLoading(false)
        };
        retrieveEventDetails();
    }, [props.match.params.id]);


    const markCompleted = (e) => {
        e.preventDefault();
        
        const payload = {
            eventID: props.match.params.id
        }
        setLoading(true);
        axios.put('/api/event/complete', payload)
            .then(res => {
                if (res.status === 200)
                    window.location = '/events'
            })
            .catch (error => console.log(error))
            .then(
                setLoading(false)
            )
    }

    if (completedState) {
        return (
            <Container>
                <Dialog open={completedState} onClose={() => setCompletedState(false)}>
                    <DialogTitle>Mark Completed</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Warning: Marking this event as completed cannot be undone</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCompletedState(false)}>No</Button>
                        <Button onClick={markCompleted} >Yes</Button>
                    </DialogActions>
                </Dialog>
            </Container>
            )
    }

    if(loading)
        return <Spinner />

    return (
        <Container maxWidth="md">
            <Paper style={{ padding: 20, margin: 20 }}>
                <Box>
                    <Typography variant="h3">{eventDetails.name}</Typography>
                </Box>
                <hr></hr>
                <Box>
                    <Typography variant="h5">{new Intl.DateTimeFormat("en-AU", { 
                                year: "numeric",
                                month: "long",
                                day: "2-digit"
                            }).format(new Date(eventDetails.dateAndTime))}</Typography>
                </Box>
                <Box>
                    <Typography variant="h5">{eventDetails.location}</Typography>
                </Box>
                <Box>
                    <Typography variant="body1">{eventDetails.description}</Typography>
                </Box>
                <Box style={{ marginTop: 5 }} display="flex" justifyContent="space-between">
                    <Box>
                        <Link to='/events' Component={Event} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary">Back</Button>
                        </Link>
                    </Box>
                    { getToken().staff ?
                    <Box>
                        <Link to='/events' Component={Event} style={{ textDecoration: 'none', marginRight: 10 }}>
                            <Button variant="contained" color="secondary">Edit Event</Button>
                        </Link>
                        <Button onClick={() => setCompletedState(true)} variant="contained" color="secondary" style={{ marginRight: 10 }}>Mark Completed</Button>
                        <Link to='/events' Component={Event} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary">Delete Event</Button>
                        </Link>
                    </Box>
                    : "" }
                </Box>
                
            </Paper>
        </Container>
    )
}

export default EventDetails;
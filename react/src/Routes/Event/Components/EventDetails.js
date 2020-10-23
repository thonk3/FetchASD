import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../Common/Spinner/Spinner'
import axios from 'axios'
import { Container, Box, Typography, Button, Paper } from '@material-ui/core';
import getToken from '../../../Helpers/token'

const EventDetails = (props) => {
    const [ eventDetails, setEventDetails ] = useState();
    const [ loading, setLoading ] = useState(true);

    // const retrieveEventDetails = async() => {
    //     return await axios.get(`/api/event/${props.match.params.id}`)
    //         .then(res => {
    //             setEventDetails(res.data.events)
    //             setLoading(false)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    useEffect(() => {
        const retrieveEventDetails = async() => {
            const result = await axios.get(`/api/event/${props.match.params.id}`)
            setEventDetails(result.data.events)
            setLoading(false)
        };
        retrieveEventDetails();
    }, [props.match.params.id]);

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
                <Box display="flex" justifyContent="space-between">
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
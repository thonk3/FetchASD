import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../Common/Spinner/Spinner'
import axios from 'axios'
import { Container, Box, Typography, Button } from '@material-ui/core';

const EventDetails = (props) => {
    const [ eventDetails, setEventDetails ] = useState();
    const [ loading, setLoading ] = useState(true);

    const retrieveEventDetails = async() => {
        return await axios.get(`/api/event/${props.match.params.id}`)
            .then(res => {
                setEventDetails(res.data.events)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        retrieveEventDetails();
    }, []);

    if(loading)
        return <Spinner />

    return (
        <Container maxWidth="md">
            <Box>
                <Typography variant="h3">{eventDetails.name}</Typography>
            </Box>
            <Box>
                <Typography variant="h4">{new Intl.DateTimeFormat("en-AU", { 
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        }).format(new Date(eventDetails.dateAndTime))}</Typography>
            </Box>
            <Box>
                <Typography variant="h4">{eventDetails.location}</Typography>
            </Box>
            <Box>
                <Typography variant="body1">{eventDetails.description}</Typography>
            </Box>
            <Link to='/events' Component={Event}>
                <Button variant="contained" color="primary">Back</Button>
            </Link>
        </Container>
    )
}

export default EventDetails;
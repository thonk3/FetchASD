import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Card, CardContent, Button } from '@material-ui/core';
import EventDetails from './EventDetails';

const EventList = ({eventList=[]}) => {

    return (
    <>
        { eventList.map((data, i) => {
            if (data) {
            return (
                <Card style={{ margin: 20 }} raised variant="outlined" key={i}>
                    <CardContent>
                        <Typography variant='h4'>{data.name}</Typography>
                        <Typography variant="h5">{new Intl.DateTimeFormat("en-AU", { 
                                year: "numeric",
                                month: "long",
                                day: "2-digit"
                            }).format(new Date(data.dateAndTime))} at {new Intl.DateTimeFormat("en-AU", { 
                                hour: "numeric",
                                minute: "numeric",
                                timeZone: "Australia/Sydney",
                                timeZoneName: "short"
                            }).format(new Date(data.dateAndTime))}</Typography>
                        <Typography variant="h5">{data.location}</Typography>
                        <Box style={{ marginTop: 5 }}>
                            <Link to={{
                                pathname: '/event/' + data._id,
                                state: {
                                    id: data._id,
                                }
                            }} Component={EventDetails} style={{ textDecoration: 'none'}}>
                                <Button variant="contained" color="primary">Read More</Button>
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
                )
            }
            return (
                <Container>
                    <Box>
                        <Typography variant="h1">There are no events</Typography>
                    </Box>
                </Container>
            )
        })}
    </>
    )
}

export default EventList
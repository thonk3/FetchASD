import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Tab, Tabs } from '@material-ui/core';
import EventList from './Components/EventList'
import Spinner from '../../Common/Spinner/Spinner'

const Event = (props) => {
    const [ upcomingEventList, setUpcomingEventList] = useState();
    const [ completedEventList, setCompletedEventList ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ tabValue, setTabValue] = useState(0);

    const retrieveEvents = async() => {
        return await axios.get('/api/event/')
            .then(res => {
                setUpcomingEventList(res.data.upcoming)
                setCompletedEventList(res.data.completed)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        retrieveEvents();
    }, []);

    const handleTabChange = (event, tabValue) => {
        setTabValue(tabValue);
      };

    if (loading)
        return <Spinner />

    return (
    <>
        <Paper>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                >
                    <Tab label="Upcoming" />
                    <Tab label="Completed" />
            </Tabs>
        </Paper>
        <TabPanel value={tabValue} index={0}>
            <EventList eventList={upcomingEventList}/>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
            <EventList eventList={completedEventList}/>
        </TabPanel>
    </>
    )

    function TabPanel(props) {
        const { children, value, index } = props;
        return (
            value === index && <Container maxWidth="md">{children}</Container>
        )
    }
}

export default Event;
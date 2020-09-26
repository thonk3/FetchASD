import React from 'react';
import axios from 'axios';
import token from '../../Helpers/token';
import { Button, Container, Grid } from '@material-ui/core'

class Dates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: [],
            upcoming: [],
            completed: [],
            requestList: true,
            upcomingList: false,
            completedList: false,
        };
        this.handleRequested = this.handleRequested.bind(this);
        this.handleCompleted = this.handleCompleted.bind(this);
        this.handleUpcoming = this.handleUpcoming.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/date/${token().id}/`)
            .then(res => {
                this.setState({
                    requestList: true,
                    requested: res.data.requested,
                    upcoming: res.data.upcoming,
                    completed: res.data.completed
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleAccept(id, dogID) {
        axios.post(`/api/date/accept/${id}`)
            .catch(function (error) {
                console.log(error);
            })
        axios.get(`/api/date/${token().id}/`)
        .then(res => {
            this.setState({
                requestList: true,
                requested: res.data.requested,
                upcoming: res.data.upcoming,
                completed: res.data.completed
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    handleDecline(id) {
        axios.post(`/api/date/decline/${id}`)
            .catch(function (error) {
                console.log(error);
            })
        axios.get(`/api/date/${token().id}/`)
        .then(res => {
            this.setState({
                requestList: true,
                requested: res.data.requested,
                upcoming: res.data.upcoming,
                completed: res.data.completed
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    renderRequested(list) {
        return (
            list.map((data, i) => {
                return <Grid container direction="row" spacing={1} alignItems="center">
                            <Grid container item xs={10} sm={8}>{data.senderDogID} is requesting a date with {data.receiverDogID}</Grid>
                            <Grid container item xs={10} sm={2}>
                                    <Button type="submit" onClick={() => this.handleAccept(data._id)} variant="contained">Accept</Button>                    
                                    <Button type="submit" onClick={() => this.handleDecline(data._id)} variant="contained" color="primary">Decline</Button>
                            </Grid>
                        </Grid>
            })
        );
    }

    renderUpcoming(list) {
        return (
            list.map((data, i) => {
                return <Grid container direction="row" spacing={1} alignItems="center">
                            <Grid container item xs={10} sm={8}>{data.senderDogID} will be going on a date with {data.receiverDogID}</Grid>
                        </Grid>
            })
        );
    }

    renderCompleted(list) {
        return (
            list.map((data, i) => {
                return <Grid container direction="row" spacing={1} alignItems="center">
                            <Grid container item xs={10} sm={8}>{data.senderDogID} went on a date with {data.receiverDogID}</Grid>
                        </Grid>
            })
        );
    }

    handleRequested() {
        this.setState(state => ({ 
            requestList: true, 
            upcomingList: false, 
            completedList: false 
        }));
    }

    handleUpcoming() {
        this.setState(state => ({ 
            requestList: false, 
            upcomingList: true, 
            completedList: false 
        }));
    }

    handleCompleted() {
        this.setState(state => ({ 
            requestList: false, 
            upcomingList: false, 
            completedList: true 
        }));
    }    

    render() {
        return (
            <Container fluid>
                <h2>My Dates</h2>
                <Grid container justify="space-between" direction="row" alignItems="center">
                    <Grid item><Button variant="contained" color={this.state.requestList ? "primary" : "default"} onClick={this.handleRequested}>Requested</Button></Grid>
                    <Grid item><Button variant="contained" color={this.state.upcomingList ? "primary" : "default"} onClick={this.handleUpcoming}>Upcoming</Button></Grid>
                    <Grid item><Button variant="contained" color={this.state.completedList ? "primary" : "default"} onClick={this.handleCompleted}>Completed</Button></Grid>
                </Grid>
                <br/>
                <Grid>
                    {(this.state.requestList) ? this.renderRequested(this.state.requested) : ''}
                    
                    {(this.state.upcomingList) ? this.renderUpcoming(this.state.upcoming) : ''}

                    {(this.state.completedList) ? this.renderCompleted(this.state.completed) : ''}
                </Grid>
            </Container>
        )
    }
}

export default Dates;
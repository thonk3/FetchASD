import React from 'react';
import axios from 'axios';
import token from '../../Helpers/token';
import { Button, Container, Grid } from '@material-ui/core'
import RequestedDialog from './Components/RequestedDialog';
import UpcomingDialog from './Components/UpcomingDialog';
import CompletedDialog from './Components/CompletedDialog';

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

    requestedDates(list) {	    
        return list.map((data, i) => {	      
            return <RequestedDialog obj={data} key={i} />;	        
        });
    }

    upcomingDates(list) {	    
        return list.map((data, i) => {	      
            return <UpcomingDialog obj={data} key={i} />;	        
        });
    }

    completedDates(list) {	    
        return list.map((data, i) => {	      
            return <CompletedDialog obj={data} key={i} />;	        
        });
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
                    {(this.state.requestList) ? this.requestedDates(this.state.requested) : ''}
                    
                    {(this.state.upcomingList) ? this.upcomingDates(this.state.upcoming) : ''}

                    {(this.state.completedList) ? this.completedDates(this.state.completed) : ''}
                </Grid>
            </Container>
        )
    }
}

export default Dates;
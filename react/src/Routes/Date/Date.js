import React from 'react';
import axios from 'axios';
import DateItem from './Components/date-item';
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
    }

    componentDidMount() {
        axios.get('api/date/5f6df2cbbceb0d1fd024c19d/')
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

    dateItem(list) {
        return list.map((data, i) => {
            return <DateItem obj={data} key={i} />;
        });
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
        console.log("Upcoming")
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
                <div className='form-container'>
                    {(this.state.requestList) ? this.dateItem(this.state.requested) : ''}
                    
                    {(this.state.upcomingList) ? this.dateItem(this.state.upcoming) : ''}

                    {(this.state.completedList) ? this.dateItem(this.state.completed) : ''}
                </div>
            </Container>
        )
    }
}

export default Dates;
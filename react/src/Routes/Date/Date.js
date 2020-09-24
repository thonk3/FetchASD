import React from 'react';
import axios from 'axios';
import DateItem from './Components/date-item';
import { Button, Container, Grid } from '@material-ui/core'

class Dates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            requestList: true,
            upcomingList: false,
            completedList: false,
        };
        this.handleRequested = this.handleRequested.bind(this);
        this.handleCompleted = this.handleCompleted.bind(this);
        this.handleUpcoming = this.handleUpcoming.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/date/sent/5f5850017fb19a1420425abb')
            .then(res => {
                this.setState({
                    dates: res.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dateItem() {
        return this.state.dates.map((data, i) => {
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
                    <Grid item><Button onClick={this.handleRequested}>Requested</Button></Grid>
                    <Grid item><Button onClick={this.handleUpcoming}>Upcoming</Button></Grid>
                    <Grid item><Button onClick={this.handleCompleted}>Completed</Button></Grid>
                </Grid>
                <div className='form-container'>
                    {(this.state.requestList) ?
                    this.dateItem() : ''}
                </div>
                <div className='form-container'>
                    {(this.state.upcomingList) ?
                    this.dateItem() : ''}
                </div>
                <div className='form-container'>
                    {(this.state.completedList) ?
                    this.dateItem() : ''}
                </div>
            </Container>
        )
    }

}
export default Dates;
/* 
    main date page
*/
import React from 'react';
import axios from 'axios';
import token from '../../utils/token';
import { Button, Container, Grid/* , Typography */ } from '@material-ui/core'

import RequestedDateItem from './Components/RequestedDate/RequestedDateItem';
import UpcomingDateItem from './Components/UpcomingDate/UpcomingDateItem';
import CompletedDateItem from './Components/CompletedDate/CompletedDateItem';
import Spinner from '../../components/Spinner/Spinner';

class Dates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: [],
            upcoming: [],
            completed: [],
            requestList: false,
            upcomingList: false,
            completedList: false,
            loading: true,
        };
        this.handleRequested = this.handleRequested.bind(this);
        this.handleCompleted = this.handleCompleted.bind(this);
        this.handleUpcoming = this.handleUpcoming.bind(this);   
    }

    // load the dates on start
    componentDidMount() {
        axios.get(`/api/date/${token().id}/`)
            .then(res => this.setState({
                requestList: true,
                requested: res.data.requested,
                upcoming: res.data.upcoming,
                completed: res.data.completed
            }))
            .then(() => this.setState({ loading: false }))
            .catch(function (error) { console.log(error) });
    }

    // swap which list to display
    resetDisplay() {
        this.setState({ requestList: false, upcomingList: false, completedList: false })
    }
    handleRequested() {
        this.resetDisplay();
        this.setState({requestList: true})
    }

    handleUpcoming() {
        this.resetDisplay();
        this.setState({upcomingList: true})
    }

    handleCompleted() {
        this.resetDisplay();
        this.setState({completedList: true})
    }    

    // each date category
    requestedDates = (list) =>
        list.map((data, i) => <RequestedDateItem obj={data} key={i} />)

    upcomingDates = (list) => 
        list.map((data, i) => <UpcomingDateItem obj={data} key={i} />)

    completedDates = (list) => 
        list.map((data, i) => <CompletedDateItem obj={data} key={i} />)

    render() {
        return (
            <Container fluid>
                <h2>My Dates</h2> <br />

                <Grid container justify="space-between" direction="row" alignItems="center">
                    <DateCategoriesButton 
                        label="Requested" onClick={this.handleRequested} 
                        loading={this.state.loading} activeState={this.state.requestList} />
                    <DateCategoriesButton 
                        label="Upcoming" onClick={this.handleUpcoming} 
                        loading={this.state.loading} activeState={this.state.upcomingList} />
                    <DateCategoriesButton 
                        label="Completed" onClick={this.handleCompleted} 
                        loading={this.state.loading} activeState={this.state.completedList} />
                </Grid>

                {
                    this.state.loading ?
                    <Spinner />
                    :
                    <>  {/* loaded content */}
                        <br/>
                        {/* items */}
                        <Grid>
                            {(this.state.requestList) ? this.requestedDates(this.state.requested) : ''}
                            {(this.state.upcomingList) ? this.upcomingDates(this.state.upcoming) : ''}
                            {(this.state.completedList) ? this.completedDates(this.state.completed) : ''}
                        </Grid>
                </>
                    }
            </Container>
        )
    }
}

const DateCategoriesButton = props => {
    const { label, activeState, onClick, loading } = props;

    return (
        <Grid item>
            <Button 
                variant="contained" 
                color={activeState ? "primary" : "default"} 
                onClick={onClick}
                disabled={loading}
            > {label} </Button>
        </Grid>
    )
}

export default Dates;
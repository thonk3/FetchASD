import React from 'react';
import axios from 'axios';
import token from '../../Helpers/token';
import { Button, Container, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core'
import RequestedDialog from './Components/RequestedDialog';
import UpcomingDialog from './Components/UpcomingDialog';

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
            viewRequestDetails: false,
            viewUpcomingDetails: false,
            viewUpdate: false,
            viewDelete: false,
            dateOn: '',
            location: '',
        };
        this.handleRequested = this.handleRequested.bind(this);
        this.handleCompleted = this.handleCompleted.bind(this);
        this.handleUpcoming = this.handleUpcoming.bind(this);

        this.handleAccept = this.handleAccept.bind(this);
        this.handleDecline = this.handleDecline.bind(this);

        this.handleOpenViewRequestDetails = this.handleOpenViewRequestDetails.bind(this);
        this.handleCloseViewRequestDetails = this.handleCloseViewRequestDetails.bind(this);

        this.handleOpenViewUpcomingDetails = this.handleOpenViewUpcomingDetails.bind(this);
        this.handleCloseViewUpcomingDetails = this.handleCloseViewUpcomingDetails.bind(this);

        this.handleOpenViewUpdate = this.handleOpenViewUpdate.bind(this);
        this.handleCloseViewUpdate = this.handleCloseViewUpdate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.handleOpenViewDelete = this.handleOpenViewDelete.bind(this);
        this.handleCloseViewDelete = this.handleCloseViewDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleAccept(id, dogID) {
        axios.post(`/api/date/accept/${id}`)
            .catch(function (error) {
                console.log(error);
            })
        axios.get(`/api/date/${token().id}/`)
        .then(res => {
            this.setState({
                requestList: true,
                upcomingList: false, 
                completedList: false, 
                requested: res.data.requested,
                upcoming: res.data.upcoming,
                completed: res.data.completed,
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        this.handleCloseViewRequestDetails();
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
                upcomingList: false, 
                completedList: false,
                requested: res.data.requested,
                upcoming: res.data.upcoming,
                completed: res.data.completed,
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        this.handleCloseViewRequestDetails();
    }

    handleDelete(id) {
        axios.post(`/api/date/decline/${id}`)
            .catch(function (error) {
                console.log(error);
            })
        axios.get(`/api/date/${token().id}/`)
        .then(res => {
            this.setState({
                requestList: false,
                upcomingList: true, 
                completedList: false,
                requested: res.data.requested,
                upcoming: res.data.upcoming,
                completed: res.data.completed,
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        this.handleCloseViewUpcomingDetails();
        this.handleCloseViewDelete();
    }

    handleUpdate(data) {
        const updatedDate = {
            senderDogID: data.senderDogID,
            receiverDogID: data.receiverDogID,
            status: data.status,
            dateOn: this.state.dateOn,
            location: this.state.location
        }
        axios.post(`/api/date/update/${data._id}`, updatedDate)
        .then(res => {
            this.setState({
                requested: [],
                upcoming: [],
                completed: [],
                requestList: true,
                upcomingList: false,
                completedList: false,
                viewRequestDetails: false,
                viewUpcomingDetails: false,
                viewUpdate: false,
                viewDelete: false,
            })
        })
        .catch(function (error) {
            console.log(error);
        })
        axios.get(`/api/date/${token().id}/`)
        .then(res => {
            this.setState({
                requestList: false,
                upcomingList: true, 
                completedList: false,
                requested: res.data.requested,
                upcoming: res.data.upcoming,
                completed: res.data.completed,
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        this.handleCloseViewUpcomingDetails();
        this.handleCloseViewUpdate();
    }

    onChangeDateOn(e) {
        this.setState({
            dateOn: e.target.value
        })
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        })
    }

    handleOpenViewRequestDetails() {
        this.setState(state => ({
            viewRequestDetails: true,
        }))
    }

    handleCloseViewRequestDetails() {
        this.setState(state => ({
            viewRequestDetails: false,
        }))
    }

    handleOpenViewUpcomingDetails() {
        this.setState(state => ({
            viewUpcomingDetails: true,
        }))
    }

    handleCloseViewUpcomingDetails() {
        this.setState(state => ({
            viewUpcomingDetails: false,
        }))
    }

    handleOpenViewDelete() {
        this.setState(state => ({
            viewDelete: true,
        }))
    }

    handleCloseViewDelete() {
        this.setState(state => ({
            viewDelete: false,
        }))
    }

    handleOpenViewUpdate() {
        this.setState(state => ({
            viewUpdate: true,
        }))
    }

    handleCloseViewUpdate() {
        this.setState(state => ({
            viewUpdate: false,
        }))
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

    renderRequested(list) {
        return (
            list.map((data, i) => {
                return <Grid container direction="row" spacing={1} alignItems="center">
                            <Grid container item xs={10} sm={8}>{data.senderDogID} is requesting a date with {data.receiverDogID}</Grid>
                            <Grid container item xs={10} sm={2}>
                            <Button onClick={this.handleOpenViewRequestDetails} variant="contained">View Details</Button>  
                                    {(this.state.viewRequestDetails) ? 
                                    <Dialog open={this.state.viewRequestDetails} onClose={this.handleCloseViewRequestDetails} aria-labelledby="alert-dialog-title">
                                        <DialogTitle id="form-dialog-title"><h3>Date Request</h3></DialogTitle>
                                        <DialogContent>
                                        <DialogContentText>
                                            <h3>Details</h3>
                                        </DialogContentText>
                                        <p>{data.receiverDogID} wants to go out with {data.senderDogID}</p>
                                        <p>Proposed date and time: {new Date(Date.parse(data.dateOn)).toLocaleString()}</p>
                                        <p>Proposed Location: {data.location}</p>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleCloseViewRequestDetails} color="default">Close</Button>
                                            <Button type="submit" onClick={() => this.handleAccept(data._id)} variant="contained">Accept</Button>                    
                                            <Button type="submit" onClick={() => this.handleDecline(data._id)} variant="contained" color="primary">Decline</Button>
                                        </DialogActions>
                                    </Dialog>
                                    : ''}                  
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
                            <Grid container item xs={10} sm={2}>
                                    <Button onClick={this.handleOpenViewUpcomingDetails} variant="contained">View Details</Button>  
                                    {(this.state.viewUpcomingDetails) ? 
                                    <Dialog open={this.state.viewUpcomingDetails} onClose={this.handleCloseViewUpcomingDetails} aria-labelledby="alert-dialog-title">
                                        <DialogTitle id="form-dialog-title"><h3>Your upcoming date</h3></DialogTitle>
                                        <DialogContent>
                                        <DialogContentText>
                                            <h3>Your date details!</h3>
                                        </DialogContentText>
                                        <p>{data.receiverDogID} is going out with {data.senderDogID}</p>
                                        <p>When: {new Date(Date.parse(data.dateOn)).toLocaleString()}</p>
                                        <p>Where: {data.location}</p>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={this.handleCloseViewUpcomingDetails} color="primary">Close</Button>
                                        <Button onClick={this.handleOpenViewUpdate} color="primary">Update</Button>
                                            {(this.state.viewUpdate) ? 
                                            <Dialog open={this.state.viewUpdate} onClose={this.handleCloseViewUpdate} aria-labelledby="alert-dialog-title">
                                                <DialogTitle id="form-dialog-title"><h3>Upcoming date details</h3></DialogTitle>
                                                <DialogContent>
                                                    <p>{data.receiverDogID} is going out with {data.senderDogID}</p>
                                                    <TextField
                                                        label="Your date will be on"
                                                        type="datetime-local"
                                                        InputLabelProps={{ shrink: true }}
                                                        value={this.state.dateOn}
                                                        defaultValue={(data.dateOn).substring(0, 16)}
                                                        onChange={this.onChangeDateOn.bind(this)}
                                                    />
                                                    <br/>
                                                    <br/>
                                                    <TextField
                                                        label="Location"
                                                        value={this.state.location}
                                                        defaultValue={data.location}
                                                        onChange={this.onChangeLocation.bind(this)}

                                                    />
                                                    <p>If you update these details, the other party must accept the date request again!</p>
                                                </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleCloseViewUpdate} color="primary">
                                                    Close
                                                </Button>
                                                <Button type="submit" onClick={() => this.handleUpdate(data)} color="primary">
                                                    Update
                                                </Button>
                                            </DialogActions>
                                            </Dialog> : ''}
                                        <Button onClick={this.handleOpenViewDelete} color="primary">Delete</Button>
                                        {(this.state.viewDelete) ? 
                                            <Dialog open={this.state.viewDelete} onClose={this.handleCloseViewDelete} aria-labelledby="alert-dialog-title">
                                                <DialogContent>Are you sure you want to delete this date?</DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleCloseViewDelete} color="primary">
                                                    No
                                                </Button>
                                                <Button type="submit" onClick={() => this.handleDelete(data._id)} color="primary">
                                                    Yes
                                                </Button>
                                            </DialogActions>
                                            </Dialog> : ''}
                                        </DialogActions>
                                    </Dialog>
                                    : ''}                  
                            </Grid>
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

                    {(this.state.completedList) ? this.renderCompleted(this.state.completed) : ''}
                </Grid>
            </Container>
        )
    }
}

export default Dates;
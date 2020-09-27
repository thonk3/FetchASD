import React,{ Component } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import axios from 'axios';

class RequestedDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDecline = this.handleDecline.bind(this);
    }

    handleHide() {
        this.setState({ 
            show: false 
        });
    }

    handleShow() {
        this.setState({ 
            show: true 
        });
    }

    handleAccept(id) {
        axios.post(`/api/date/accept/${id}`)
            .then (
                window.location = '/date'
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    handleDecline(id) {
        axios.post(`/api/date/decline/${id}`)
            .then (
                window.location = '/date'
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
            return(
                <Grid container direction="row" spacing={1} alignItems="center">
                    <Grid container item xs={10} sm={8}>{this.props.obj.senderDogID} is requesting a date with {this.props.obj.receiverDogID}</Grid>
                    <Grid container item xs={10} sm={2}>
                            <Button onClick={this.handleShow} variant="contained">View Details</Button> 
                            {(this.state.show) ?                    
                            <Dialog open={this.state.show} onClose={this.handleHide} aria-labelledby="alert-dialog-title">
                                <DialogTitle id="form-dialog-title"><h3>Date Request</h3></DialogTitle>
                                <DialogContent>
                                    <DialogContentText><h3>Details</h3></DialogContentText>
                                        <p>{this.props.obj.senderDogID} wants to go out with {this.props.obj.receiverDogID}</p>
                                        <p>Proposed date and time: {new Date(Date.parse(this.props.obj.dateOn)).toLocaleString()}</p>
                                        <p>Proposed Location: {this.props.obj.location}</p>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleHide} color="default">Close</Button>
                                    <Button type="submit" onClick={() => this.handleAccept(this.props.obj._id)} variant="contained">Accept</Button>                    
                                    <Button type="submit" onClick={() => this.handleDecline(this.props.obj._id)} variant="contained" color="primary">Decline</Button>
                                </DialogActions>
                            </Dialog> : ''}
                    </Grid>
                </Grid>
            );
    }
}

export default RequestedDialog;
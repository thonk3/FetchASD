import React,{ Component } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import axios from 'axios';

import RequestedDialog from './RequestedDialog'

class RequestedDateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }

        this.toggleShow = this.toggleShow.bind(this);
        // this.handleAccept = this.handleAccept.bind(this);
        // this.handleDecline = this.handleDecline.bind(this);
    }

    toggleShow() {
        console.log('requested ', this.state.show)
        this.setState({ show: !this.state.show });
    }

    // probably pass in the list and remove the designated
    // to save loading time
    // handleAccept(id) {
    //     axios.post(`/api/date/accept/${id}`)
    //         .then(() => window.location('/date'))
    //         .catch((error) => console.log(error));
    // }

    // handleDecline(id) {
    //     axios.post(`/api/date/decline/${id}`)
    //         .then(() => window.location('/date'))
    //         .catch((error) => console.log(error));
    // }

    render() {
        return(
            <Grid container direction="row" spacing={1} alignItems="center">
                <Grid container item xs={10} sm={8}>
                    {this.props.obj.senderDog.name} is requesting a date with {this.props.obj.receiverDog.name}
                </Grid>

                <Grid container item xs={2} sm={4}>
                    <Button onClick={this.toggleShow} variant="contained">View Details</Button> 
                </Grid>

                {/* <RequestedDialog /> */}
                <RequestedDialog date={this.props.obj}
                    activeState={this.state.show} toggleDialog={this.toggleShow} />
            </Grid>
        );
    }
}

export default RequestedDateItem;
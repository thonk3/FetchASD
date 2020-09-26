import React,{ Component } from 'react';
import { Grid, Button } from '@material-ui/core';

class DateItem extends Component {
    render() {
        return (
            <Grid container direction="row" spacing={1} alignItems="center">
                <Grid container item xs={10} sm={8}>{this.props.obj.senderDogID} is requesting a date with {this.props.obj.receiverDogID}</Grid>
                <Grid container item xs={10} sm={2}>
                        <Button variant="contained">Accept</Button>                    
                        <Button variant="contained" color="primary">Decline</Button>
                </Grid>
            </Grid>
        );
    }
}

export default DateItem;
